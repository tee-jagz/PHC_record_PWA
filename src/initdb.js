export async function addInitialData(db) {
    await addInitialFacilityData(db);
    await addInitialStaffData(db);
    await addInitialPatientData(db);
  }
  
  async function addInitialFacilityData(db) {
    const transaction = db.transaction('facility', 'readwrite');
    const facilityStore = transaction.objectStore('facility');
    const facilityCount = await facilityStore.count();

    if (facilityCount.value === 0) {
        const initialFacility = {
        name: 'Example Facility',
        state: 'Example State',
        lga: 'Example LGA',
        street: 'Example Street',
        email: 'example@facility.com'
        };

        facilityStore.add(initialFacility);
        await transaction.done;
    }
  }
  
  async function addInitialStaffData(db) {
    const transaction = db.transaction('staff', 'readwrite');
    const staffStore = transaction.objectStore('staff');
    const staffCount = await staffStore.count();
  
    if (staffCount.value === 0) {
      const initialReceptionist = {
        username: 'admin',
        password: 'admin',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        email: 'admin@example.com',
        role: 'receptionist',
        facilityID: 1
      };

      const initialDoctor = {
        username: 'doctor',
        password: 'doctor',
        firstName: 'Janet',
        lastName: 'Doet',
        gender: 'Female',
        email: 'doc@example.com',
        role: 'doctor',
        facilityID: 1
        };
  
      staffStore.add(initialReceptionist);
      staffStore.add(initialDoctor);
      await transaction.done;
    }
  }
  
  async function addInitialPatientData(db) {
    const transaction = db.transaction('patients', 'readwrite');
    const patientStore = transaction.objectStore('patients');
    const patientCount = await patientStore.count();

    if (patientCount.value === 0) {
        const initialPatient = {
        firstName: 'Jane',
        lastName: 'Doe',
        gender: 'Female',
        dob: '1990-01-01',
        address: '123 Example Street',
        phoneNo: '555-555-5555',
        email: 'jane.doe@example.com',
        maritalStatus: 'Single',
        occupation: 'Software Developer',
        bloodGroup: 'O+',
        genotype: 'AA',
        nextOfKin: 'John Doe',
        facilityID: 1
        };

        patientStore.add(initialPatient);
        await transaction.done;
    }
  }