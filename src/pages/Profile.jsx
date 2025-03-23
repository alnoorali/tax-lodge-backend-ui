import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Grid, FormControl, TextField, Button, Snackbar, Alert, Box, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // State for Snackbar (success message)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage form fields
  const [formData, setFormData] = useState({
    id: userData.data.id,
    name: "",
    email: "",
    phone: "",
    address: "",
    loginid: userData.data.id,
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits')
      .required('Phone is required'),
    // address: Yup.string()
    //   .required('Address is required')
    //   .max(100, 'Address must be less than 100 characters'),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userData) {
        navigate('/');
      } else if (userData.data.logintype === 1) {
        navigate('/dashboard');
      } else {
        setIsCheckingAuth(false); 
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [userData, navigate]);

  // useEffect(() => {
  //   if (!userData) {
  //     navigate('/');
  //   } else if (userData.data.logintype === 1) {
  //     navigate('/dashboard');
  //   }
  // }, [userData, navigate]);

  // Fetch customer data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/customer/${userData.data.id}`);
        if (response.data) {
          setFormData({
            id: response.data.id,
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            address: response.data.address || "",
            loginid: userData.data.id,
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data
        await validationSchema.validate(formData, { abortEarly: false });

        console.log("Updated Profile Data:", formData);

        // Send the update request to the server
        const response = await axios.post('http://localhost:3000/api/customer/update', formData);
        console.log("update response :", response);
        if (response.data.errorCode === "000") {
            // Show success message
            setSnackbarMessage('Profile updated successfully!');
            setOpenSnackbar(true);
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Yup validation errors
            const errors = {};
            err.inner.forEach((error) => {
                errors[error.path] = error.message;
            });

            setNameError(errors.name ? true : false);
            setNameErrorMessage(errors.name || '');
            setEmailError(errors.email ? true : false);
            setEmailErrorMessage(errors.email || '');
            setPhoneError(errors.phone ? true : false);
            setPhoneErrorMessage(errors.phone || '');
        } else {
            // Handle other errors (e.g., network errors)
            console.error('Error in handleSubmit:', err);
            setSnackbarMessage('An error occurred. Please try again.');
            setOpenSnackbar(true);
        }
    }
  };

  // Function to close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (isCheckingAuth) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
          backgroundColor: '#f8f7fa', // Match your background color
        }}
      >
        <CircularProgress size={60} /> {/* MUI Circular Progress Loader */}
      </Box>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Header />
        <div className='mainBodyContainer'>
          <div className='bodyContainer'>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth margin="none">
                    <TextField
                      error={nameError}
                      helperText={nameErrorMessage}
                      id="name"
                      name="name"
                      label="Name"
                      variant="filled"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={nameError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth margin="none">
                    <TextField
                      error={emailError}
                      helperText={emailErrorMessage}
                      id="email"
                      type="email"
                      name="email"
                      label="Email"
                      variant="filled"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={emailError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth margin="none">
                    <TextField
                      error={phoneError}
                      helperText={phoneErrorMessage}
                      id="phone"
                      name="phone"
                      label="Phone"
                      variant="filled"
                      value={formData.phone}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={phoneError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  variant="filled"
                  value={formData.address}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  size="small"
                />
              </FormControl>
              <Button type="submit" variant="contained" color="primary" className="submit-btn" onClick={handleSubmit}>
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </section>
      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Snackbar will close after 6 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the Snackbar
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;