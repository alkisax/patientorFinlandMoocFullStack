import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  // const [patientInfo, setPatientInfo] = useState<Patient>({
  //     id: '',
  //     name: '',
  //     occupation: '',
  //     gender: Gender.Other,
  //     ssn: '',
  //     dateOfBirth: '',
  //     entries: []
  // });

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />

          <Routes>
            <Route path="/" 
              element={<PatientListPage 
                patients={patients} 
                setPatients={setPatients}
              />} 
            />

            <Route 
              path="/patients/:id"
              element={<PatientDetailPage
              />} 
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
