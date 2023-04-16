
async function addInitialData(db) {
  const samplePatients = [
    {
      patientId: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      dob: '1990-01-01',
      address: '123 Main St',
      phoneNo: '555-123-4567',
      email: 'john.doe@example.com',
      maritalStatus: 'single',
      occupation: 'software engineer',
      bloodGroup: 'O+',
      genotype: 'AA',
      nextOfKin: 'Jane Doe',
      facilityID: 1,
    },
    // Add more sample patients here

    {
      patientId: 2,
      firstName: 'Janet',
      lastName: 'Doet',
      gender: 'female',
      dob: '1990-01-01',
      address: '123 Main St',
      phoneNo: '555-123-4567',
      email: 'john.doe@exple.com',
      maritalStatus: 'single',
      occupation: 'software engineer',
      bloodGroup: 'O+',
      genotype: 'AA',
      nextOfKin: 'Jane Doe',
      facilityID: 1,
    },
  ];

  const sampleVisits = [
    {
      visitId: 1,
      patientId: 1,
      doctorId: 1,
      facilityId: 1,
      appointmentDate: '2023-04-20',
      appointmentTime: '14:00',
      reason: 'General checkup',
      status: 'Active',
      conditionId: null,
      dateofDiagnosis: null,
      dateofRecovery: null,
      visitNotes: '',
    },
    // Add more sample visits here
    {
      visitId: 2,
      patientId: 2,
      doctorId: 1,
      facilityId: 1,
      appointmentDate: '2023-04-20',
      appointmentTime: '14:00',
      reason: 'General checkup',
      status: 'Active',
      conditionId: null,
      dateofDiagnosis: null,
      dateofRecovery: null,
      visitNotes: '',
    },
  ];

  const sampleMedicalConditions = [
    {
      conditionId: 1,
      name: 'Common cold',
      description: 'A viral infection affecting the nose and throat',
      severity: 'mild',
      treatment: 'Rest, fluids, over-the-counter medications',
    },
    // Add more sample medical conditions here
  ];

  const sampleStaff = [
    {
      staffId: 1,
      username: 'admin',
      password: 'admin',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      email: 'j1ohn.doe@example.com',
      role: 'receptionist',
      facilityID: 1,
    },
    // Add more sample staff members here
    {
      staffId: 2,
      username: 'doctor',
      password: 'doctor',
      firstName: 'Tee',
      lastName: 'Jay',
      gender: 'male',
      email: 'joh2n.doe@example.com',
      role: 'doctor',
      facilityID: 1,
    },
  ];

  const sampleFacilities = [
    {
      facilityId: 1,
      Name: 'Main Clinic',
      State: 'California',
      LGA: 'Los Angeles',
      Street: '123 Main St',
      Email: 'mainclinic@example.com',
    },
    // Add more sample facilities here
  ];

  const transaction = db.transaction(['patients', 'visits', 'medicalConditions', 'staff', 'facilityStore'], 'readwrite');

  const patientStore = transaction.objectStore('patients');
  samplePatients.forEach((patient) => patientStore.add(patient));

  const visitStore = transaction.objectStore('visits');
  sampleVisits.forEach((visit) => visitStore.add(visit));

  const medicalConditionStore = transaction.objectStore('medicalConditions');
  sampleMedicalConditions.forEach((condition) => medicalConditionStore.add(condition));

  const staffStore = transaction.objectStore('staff');
  sampleStaff.forEach((staff) => staffStore.add(staff));

  const facilityStore = transaction.objectStore('facilityStore');
  sampleFacilities.forEach((facility) => facilityStore.add(facility));

  await transaction.done;
}

export { addInitialData };