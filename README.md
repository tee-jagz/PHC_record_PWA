# PHC Management System

A progressive web app (PWA) designed for the effective management of hospital operations, including patient registration, appointment scheduling, and doctor consultations. The application is containerized using Docker and can be deployed locally using Docker Compose, which builds and runs both the API and the React PWA simultaneously.

## Features

- Patient registration and management
- Appointment scheduling and management
- Doctor and receptionist roles with role-based access control
- Offline support and data synchronization when the application comes back online
- Responsive and mobile-friendly design
- Secure authentication and data storage
- Docker containerization for easy deployment

## Usage

1. Register a new account or log in as an existing user.
2. Based on the user's role (doctor or admin), they will be redirected to the appropriate dashboard.
3. Admin can register patients, view patient lists, and schedule appointments.
4. Doctors can view active visits, consult with patients, and update patient information.

## Docker Deployment

1. Ensure Docker and Docker Compose are installed on your system.
2. Create a .env file in the pwa directory with the following environment variables:
   ```env
   PORT=3000
   ```
3. Create a .env file in the api directory with the following environment variables:
   ```env
   SQL_CONN_STR=Driver={ODBC Driver 17 for SQL Server};Server=med-pwa-project.database.windows.net;Database=med_app_db;Uid=medapp;Pwd=MED@ppPW1!;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
   ```
4. Build and start the Docker containers using Docker Compose:
   ```
   docker-compose up -d --build
   ```
   This will build and run both the API and the React PWA in Docker containers. The application will be accessible at `http://localhost:3000`.
5. To stop and remove the containers, run:
   ```
   docker-compose down
   ```

## Technologies Used

- React.js
- Ant Design (UI library)
- IndexedDB (client-side storage)
- React Router (client-side routing)
- Workbox (service workers)
- Axios (HTTP client)
- Docker and Docker Compose (containerization)
- Flask
- Flask_Cors
- pyodbc
- dotenv
