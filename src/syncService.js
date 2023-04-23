import axios from 'axios';
import openIndexedDB from './db';


async function syncDatabases() {
  console.log('Syncing databases...');
  // src/syncService.js

const apiURL = 'http://localhost:5000';

  try {
    const db = await openIndexedDB();

    if (navigator.onLine) {
      await syncTable(db, 'patients', `${apiURL}/api/patients`);
      await syncTable(db, 'visits', `${apiURL}/api/visits`);
      await syncTable(db, 'medicalConditions', `${apiURL}/api/medicalConditions`);
      await syncTable(db, 'staff', `${apiURL}/api/staff`);
      await syncTable(db, 'facilityStore', `${apiURL}/api/facilities`);
    }
  } catch (error) {
    console.error('Error during synchronization:', error);
  }
}

async function syncTable(db, objectStoreName, apiEndpoint) {
  const recordsToSync = await getUnsyncedRecords(db, objectStoreName);
  console.log(recordsToSync)
  
  if (recordsToSync.length > 0) {
    console.log(`Found ${recordsToSync.length} unsynced records in ${objectStoreName}`)
    console.log(`Sending request to ${apiEndpoint}/sync with records:`, recordsToSync); // Add this log
    const response = await axios.post(apiEndpoint + '/sync', { records: recordsToSync });

    if (response.status === 200) {
      console.log(`Successfully synced ${objectStoreName}`);
      await updateSyncedRecords(db, objectStoreName, recordsToSync);
    } else {
      console.error(`Failed to sync ${objectStoreName}:`, response.status);
    }
  } else {
    console.log(`No unsynced records found for ${objectStoreName}`);
  }
}

async function getUnsyncedRecords(db, objectStoreName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([objectStoreName], 'readonly');
    const objectStore = transaction.objectStore(objectStoreName);

    const unsyncedRecords = [];

    const cursorRequest = objectStore.openCursor();

    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        if (!cursor.value.synced) {
          unsyncedRecords.push(cursor.value);
        }
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
