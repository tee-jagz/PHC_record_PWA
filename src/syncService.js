import axios from 'axios';
import openIndexedDB from './db';

async function syncDatabases() {
  try {
    const db = await openIndexedDB();

    if (navigator.onLine) {
      await syncTable(db, 'patients', '/api/patients');
      await syncTable(db, 'visits', '/api/visits');
      await syncTable(db, 'medicalConditions', '/api/medicalConditions');
      await syncTable(db, 'staff', '/api/staff');
      await syncTable(db, 'facilityStore', '/api/facilities');
    }
  } catch (error) {
    console.error('Error during synchronization:', error);
  }
}

async function syncTable(db, objectStoreName, apiEndpoint) {
  const recordsToSync = await getUnsyncedRecords(db, objectStoreName);

  if (recordsToSync.length > 0) {
    const response = await axios.post(apiEndpoint + '/sync', { records: recordsToSync });

    if (response.status === 200) {
      await updateSyncedRecords(db, objectStoreName, recordsToSync);
    }
  }
}

async function getUnsyncedRecords(db, objectStoreName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([objectStoreName], 'readonly');
    const objectStore = transaction.objectStore(objectStoreName);

    const unsyncedRecords = [];

    const cursorRequest = objectStore.index('synced').openCursor(IDBKeyRange.only(false));

    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        unsyncedRecords.push(cursor.value);
        cursor.continue();
      } else {
        resolve(unsyncedRecords);
      }
    };

    cursorRequest.onerror = () => {
      reject('Error retrieving unsynced records');
    };
  });
}

async function updateSyncedRecords(db, objectStoreName, records) {
  return new Promise(async (resolve, reject) => {
    const transaction = db.transaction([objectStoreName], 'readwrite');
    const objectStore = transaction.objectStore(objectStoreName);

    for (const record of records) {
      record.synced = true;
      const updateRequest = objectStore.put(record);

      updateRequest.onerror = () => {
        reject('Error updating synced records');
      };
    }

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject('Error updating synced records');
    };
  });
}

export default syncDatabases;
