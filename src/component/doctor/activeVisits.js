import openIndexedDB from './../../db';

async function getActiveVisitsWithPatients() {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const visitsStore = db.transaction('visits', 'readonly').objectStore('visits');
    const activeVisitsIndex = visitsStore.index('status');
    const patientsStore = db.transaction('patients', 'readonly').objectStore('patients');

    const activeVisits = [];

    activeVisitsIndex.openCursor(IDBKeyRange.only('Active')).onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        const visit = cursor.value;
        patientsStore.get(visit.patientId).onsuccess = (event) => {
          const patient = event.target.result;
          visit.patient = patient;
          activeVisits.push(visit);
          cursor.continue();
        };
      } else {
        resolve(activeVisits);
      }
    };

    activeVisitsIndex.onerror = (event) => {
      reject(`Error retrieving active visits: ${event.target.error}`);
    };
  });
}

export default getActiveVisitsWithPatients;