from flask import Flask, request, jsonify
import pyodbc
import json
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Replace the placeholders with your actual Azure SQL database details
conn_str = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=med-pwa-project.database.windows.net;"
    "Database=med_app_db;"
    "Uid=medapp;"
    "Pwd=MED@ppPW1!;"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
    "Connection Timeout=30;"
)
conn = pyodbc.connect(conn_str)


@app.route('/api/patients/sync', methods=['POST'])
def sync_patients():
    data = request.json
    records = data['records']

    with conn.cursor() as cursor:
        for record in records:
            # Check if record exists
            cursor.execute(
                "SELECT * FROM patients WHERE patientId = ?", (record['patientId'],))
            row = cursor.fetchone()

            if row:
                # Update record
                cursor.execute("""
                    UPDATE patients
                    SET firstName=?, lastName=?, gender=?, dob=?, address=?, phoneNo=?, email=?, maritalStatus=?, occupation=?, bloodGroup=?, genotype=?, nextOfKin=?, facilityID=?
                    WHERE patientId=?
                """, (record['firstName'], record['lastName'], record['gender'], record['dob'], record['address'], record['phoneNo'], record['email'], record['maritalStatus'], record['occupation'], record['bloodGroup'], record['genotype'], record['nextOfKin'], record['facilityID'], record['patientId']))
            else:
                # Insert new record
                cursor.execute("""
                    INSERT INTO patients (patientId, firstName, lastName, gender, dob, address, phoneNo, email, maritalStatus, occupation, bloodGroup, genotype, nextOfKin, facilityID)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (record['patientId'], record['firstName'], record['lastName'], record['gender'], record['dob'], record['address'], record['phoneNo'], record['email'], record['maritalStatus'], record['occupation'], record['bloodGroup'], record['genotype'], record['nextOfKin'], record['facilityID']))

        conn.commit()

    return jsonify({'message': 'Successfully synced patients'}), 200


@app.route('/api/visits/sync', methods=['POST'])
def sync_visits():
    data = request.json
    records = data['records']

    with conn.cursor() as cursor:
        for record in records:
            cursor.execute(
                "SELECT * FROM visits WHERE visitId = ?", (record['visitId'],))
            row = cursor.fetchone()

            if row:
                cursor.execute("""
                    UPDATE visits
                    SET patientId=?, doctorId=?, facilityId=?, appointmentDate=?, appointmentTime=?, reason=?, status=?, conditionId=?, dateOfDiagnosis=?, dateOfRecovery=?, visitNotes=?
                    WHERE visitId=?
                """, (record['patientId'], record['doctorId'], record['facilityId'], record['appointmentDate'], record['appointmentTime'], record['reason'], record['status'], record['conditionId'], record.get('dateOfDiagnosis', None), record.get('dateOfRecovery', None), record['visitNotes']))
            else:
                cursor.execute("""
                    INSERT INTO visits (visitId, patientId, doctorId, facilityId, appointmentDate, appointmentTime, reason, status, conditionId, dateOfDiagnosis, dateOfRecovery, visitNotes)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (record['visitId'], record['patientId'], record['doctorId'], record['facilityId'], record['appointmentDate'], record['appointmentTime'], record['reason'], record['status'], record['conditionId'], record.get('dateOfDiagnosis', None), record.get('dateOfRecovery', None), record['visitNotes']))

        conn.commit()

    return jsonify({'message': 'Successfully synced visits'}), 200


@app.route('/api/staff/sync', methods=['POST'])
def sync_staff():
    data = request.json
    records = data['records']

    with conn.cursor() as cursor:
        for record in records:
            cursor.execute(
                "SELECT * FROM staff WHERE staffId = ?", (record['staffId'],))
            row = cursor.fetchone()

            if row:
                cursor.execute("""
                    UPDATE staff
                    SET username=?, password=?, firstName=?, lastName=?, gender=?, email=?, role=?, facilityID=?
                    WHERE staffId=?
                """, (record['username'], record['password'], record['firstName'], record['lastName'], record['gender'], record['email'], record['role'], record['facilityID'], record['staffId']))
            else:
                cursor.execute("""
                    INSERT INTO staff (staffId, username, password, firstName, lastName, gender, email, role, facilityID)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (record['staffId'], record['username'], record['password'], record['firstName'], record['lastName'], record['gender'], record['email'], record['role'], record['facilityID']))

        conn.commit()

    return jsonify({'message': 'Successfully synced staff'}), 200


@app.route('/api/facilities/sync', methods=['POST'])
def sync_facilities():
    data = request.json
    records = data['records']

    with conn.cursor() as cursor:
        for record in records:
            cursor.execute(
                "SELECT * FROM facility WHERE facilityId = ?", (record['facilityId'],))
            row = cursor.fetchone()

            if row:
                cursor.execute("""
                    UPDATE facility
                    SET Name=?, State=?, LGA=?, Street=?, Email=?
                    WHERE facilityId=?
                """, (record['Name'], record['State'], record['LGA'], record['Street'], record['Email'], record['facilityId']))
            else:
                cursor.execute("""
                    INSERT INTO facility (facilityId, Name, State, LGA, Street, Email)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (record['facilityId'], record['Name'], record['State'], record['LGA'], record['Street'], record['Email']))

        conn.commit()

    return jsonify({'message': 'Successfully synced facilities'}), 200


@app.route('/api/medicalConditions/sync', methods=['POST'])
def sync_medical_conditions():
    data = request.json
    records = data['records']

    with conn.cursor() as cursor:
        for record in records:
            cursor.execute(
                "SELECT * FROM medicalConditions WHERE conditionId = ?", (record['conditionId'],))
            row = cursor.fetchone()

            if row:
                cursor.execute("""
                    UPDATE medicalConditions
                    SET name=?, description=?, severity=?, treatment=?
                    WHERE conditionId=?
                """, (record['name'], record['description'], record['severity'], record['treatment'], record['conditionId']))
            else:
                cursor.execute("""
                    INSERT INTO medicalConditions (conditionId, name, description, severity, treatment)
                    VALUES (?, ?, ?, ?, ?)
                """, (record['conditionId'], record['name'], record['description'], record['severity'], record['treatment']))

        conn.commit()

    return jsonify({'message': 'Successfully synced medical conditions'}), 200


if __name__ == '__main__':
    app.run(debug=True)
