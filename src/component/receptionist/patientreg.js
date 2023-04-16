import React, { useState } from 'react';
import openIndexedDB from '../../db';
import ReceptionMenu from './reception_menu';

const PatientForm = () => {
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    address: '',
    phoneNo: '',
    email: '',
    maritalStatus: '',
    occupation: '',
    bloodGroup: '',
    genotype: '',
    nextOfKin: '',
    facilityID: ''
    // add more fields as needed
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = await openIndexedDB();
    const tx = db.transaction('patients', 'readwrite');
    const store = tx.objectStore('patients');
    await store.add(patient);
    await tx.complete;
    setPatient({ firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    address: '',
    phoneNo: '',
    email: '',
    maritalStatus: '',
    occupation: '',
    bloodGroup: '',
    genotype: '',
    nextOfKin: '',
    facilityID: '' /* reset other fields */ });
  };

    return (
      <div>
        <ReceptionMenu />
      <form style={{textAlign: 'center', paddingTop: '10%'}} onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={patient.firstName}
          placeholder="First Name"
          onChange={(event) =>
            setPatient({ ...patient, firstName: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <input
          type="text"
          value={patient.lastName}
          placeholder="Last Name"
          onChange={(event) =>
            setPatient({ ...patient, lastName: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <select
          value={patient.gender}
          onChange={(event) =>
            setPatient({ ...patient, gender: event.target.value })
          }
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <label>
        <input
          type="date"
          value={patient.dob}
          placeholder="Date of Birth"
          onChange={(event) =>
            setPatient({ ...patient, dob: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <input
          type="text"
          value={patient.address}
          placeholder="Address"
          onChange={(event) =>
            setPatient({ ...patient, address: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <input
          type="tel"
          value={patient.phoneNo}
          placeholder="Phone Number"
          onChange={(event) =>
            setPatient({ ...patient, phoneNo: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <input
          type="email"
          value={patient.email}
          placeholder="Email"
          onChange={(event) =>
            setPatient({ ...patient, email: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <select
          value={patient.maritalStatus}
          onChange={(event) =>
            setPatient({ ...patient, maritalStatus: event.target.value })
          }
        >
          <option value="">Select Marital Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </label>
      <br />
      <label>
        <input
          type="text"
          value={patient.occupation}
          placeholder="Occupation"
          onChange={(event) =>
            setPatient({ ...patient, occupation: event.target.value })
          }
        />
        </label>
        <br />
      <label>
        <input
          type="text"
          value={patient.bloodGroup}
          placeholder="Blood Group"
          onChange={(event) =>
            setPatient({ ...patient, bloodGroup: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <input
          type="text"
          value={patient.genotype}
          placeholder="Genotype"
          onChange={(event) =>
            setPatient({ ...patient, genotype: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <input
          type="text"
          value={patient.nextOfKin}
          placeholder="Next of Kin"
          onChange={(event) =>
            setPatient({ ...patient, nextOfKin: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        <input
          type="text"
          value={patient.facilityID}
          placeholder="Facility ID"
          onChange={(event) =>
            setPatient({ ...patient, facilityID: event.target.value })
          }
        />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
    </div>
    );
  };


export default PatientForm;