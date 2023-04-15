import { openDB } from 'idb';
import { addInitialData } from './initdb';
// Create a database connection and return it as a promise  (async) 


function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const dbName = "myDatabase";
    const dbVersion = 1;

    // Open the database
    const request = window.indexedDB.open(dbName, dbVersion);

    // Define the schema
    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create the Patient table
      const patientStore = db.createObjectStore("patients", { keyPath: "patientId", autoIncrement: true });
      patientStore.createIndex("firstName", "firstName", { unique: false });
      patientStore.createIndex("lastName", "lastName", { unique: false });
      patientStore.createIndex("gender", "gender", { unique: false });
      patientStore.createIndex("dob", "dob", { unique: false });
      patientStore.createIndex("address", "address", { unique: false });
      patientStore.createIndex("phoneNo", "phoneNo", { unique: false });
      patientStore.createIndex("email", "email", { unique: false });
      patientStore.createIndex("maritalStatus", "maritalStatus", { unique: false });
      patientStore.createIndex("occupation", "occupation", { unique: false });
      patientStore.createIndex("bloodGroup", "bloodGroup", { unique: false });
      patientStore.createIndex("genotype", "genotype", { unique: false });
      patientStore.createIndex("nextOfKin", "nextOfKin", { unique: false });
      patientStore.createIndex("facilityID", "facilityID", { unique: false });

      // Create the Visit table
      const visitStore = db.createObjectStore("visits", { keyPath: "visitId", autoIncrement: true });
      visitStore.createIndex("patientId", "patientId", { unique: false });
      visitStore.createIndex('doctorId', 'doctorId', { unique: false });
      visitStore.createIndex('facilityId', 'facilityId', { unique: false });
      visitStore.createIndex('appointmentDate', 'appointmentDate', { unique: false });
      visitStore.createIndex('appointmentTime', 'appointmentTime', { unique: false });
      visitStore.createIndex('reason', 'reason', { unique: false });
      visitStore.createIndex('status', 'status', { unique: false });
      visitStore.createIndex('conditionId', 'conditionId', { unique: false });
      visitStore.createIndex('dateOfDiagnosis', 'dateofDiagnosis', { unique: false });
      visitStore.createIndex('dateOfRecovery', 'dateofRecovery', { unique: false });

      //Create the Medical Condition table
      const medicalConditionStore = db.createObjectStore("medicalConditions", { keyPath: "conditionId", autoIncrement: true });
      medicalConditionStore.createIndex("name", "name", { unique: false });
      medicalConditionStore.createIndex("description", "description", { unique: false });
      medicalConditionStore.createIndex("severity", "severity", { unique: false });
      medicalConditionStore.createIndex("treatment", "treatment", { unique: false });


      // Create the Medical History table
      // const medicalHistoryStore = db.createObjectStore("medicalHistories", { keyPath: "id", autoIncrement: true });
      // medicalHistoryStore.createIndex("patientId", "patientId", { unique: false });

      // Create the Doctor table
      // const doctorStore = db.createObjectStore("doctors", { keyPath: "doctorid", autoIncrement: true });
      // doctorStore.createIndex("name", "name", { unique: false });

      // Create the Staff table
      const staffStore = db.createObjectStore("staff", { keyPath: "staffId", autoIncrement: true });
      staffStore.createIndex("username", "username", { unique: true });
      staffStore.createIndex("password", "password", { unique: false });
      staffStore.createIndex("firstName", "firstName", { unique: false });
      staffStore.createIndex("lastName", "lastName", { unique: false });
      staffStore.createIndex("gender", "gender", { unique: false });
      staffStore.createIndex("email", "email", { unique: true });
      staffStore.createIndex("role", "role", { unique: false });
      staffStore.createIndex("facilityID", "facilityID", { unique: false });

      // Create the Facility table
      const facilityStore = db.createObjectStore('facilityStore', { keyPath: 'facilityId' });
      facilityStore.createIndex('Name', 'Name');
      facilityStore.createIndex('State', 'State');
      facilityStore.createIndex('LGA', 'LGA');
      facilityStore.createIndex('Street', 'Street');
      facilityStore.createIndex('Email', 'Email');
    };

    request.onsuccess = async (event) => {
      const db = event.target.result;
      await addInitialData(db);
      resolve(db);
    };

    request.onerror = (event) => {
      reject(`IndexedDB error: ${event.target.error}`);
    };
  });
}



export default openIndexedDB;