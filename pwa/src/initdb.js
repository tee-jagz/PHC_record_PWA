// db.js
import openIndexedDB from './db';
import axios from 'axios';

/// Modify the addInitialData function
async function addInitialData(db) {
  try {
    const response = await axios.get("http://localhost:5000/api/initial-data");
    const data = response.data;

    for (const [objectStoreName, records] of Object.entries(data)) {
      const transaction = db.transaction([objectStoreName], "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);

      for (const record of records) {
        objectStore.add(record);
      }
    }
  } catch (error) {
    console.error("Error adding initial data:", error);
  }
}


export {addInitialData};
