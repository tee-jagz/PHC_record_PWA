import React from 'react';
import {AppRoutes} from './Routes';
import { useSyncDatabases } from './useSyncDatabases';



function App() {
  useSyncDatabases();
  return (
    <div style={{paddingRight: '1rem', paddingLeft: '1rem'}}>
    <AppRoutes />
    </div>
    
  );
}


export default App;
