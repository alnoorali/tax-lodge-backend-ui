import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Grid, FormControl, TextField, Button, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const ContactUs = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [headingError, setHeadingError] = useState(false);
    const [headingErrorMessage, setHeadingErrorMessage] = useState('');
    const [contentError, setContentError] = useState(false);
    const [contentErrorMessage, setContentErrorMessage] = useState('');
    const [contact1Error, setContact1Error] = useState(false);
    const [contact1ErrorMessage, setContact1ErrorMessage] = useState('');
    const [location1Error, setLocation1Error] = useState(false);
    const [location1ErrorMessage, setLocation1ErrorMessage] = useState('');
    const [email1Error, setEmail1Error] = useState(false);
    const [email1ErrorMessage, setEmail1ErrorMessage] = useState('');

    // State for Snackbar (success message)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State for loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage form fields
    const [formData, setFormData] = useState({
        heading_1: "",
        content_1: "",
        contact_1: "",
        contact_2: "",
        location_1: "",
        location_2: "",
        email_1: "",
        email_2: "",
    });

    const validationSchema = Yup.object().shape({
        heading_1: Yup.string().required('Heading is required'),
        content_1: Yup.string().required('Content is required'),
        contact_1: Yup.string().required('Contact 1 is required'),
        location_1: Yup.string().required('Location 1 is required'),
        email_1: Yup.string().required('Email 1 is required'),
    });

    useEffect(() => {
        if (!userData) {
        navigate('/');
        }
    }, [userData, navigate]);

    // Fetch customer data when the component mounts
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/contact-us/getContactUs');
          if (response.data) {
            setFormData({
                heading_1: response.data.heading_1 || "",
                content_1: response.data.content_1 || "",
                contact_1: response.data.contact_1 || "",
                contact_2: response.data.contact_2 || "",
                location_1: response.data.location_1 || "",
                location_2: response.data.location_2 || "",
                email_1: response.data.email_1 || "",
                email_2: response.data.email_2 || "",
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

        console.log("Updated Service Data:", formData);

        // Send the update request to the server
        const response = await axios.post('http://localhost:3000/api/contact-us/update', formData);
        console.log("update response :", response);
        if (response.data.errorCode === "000") {
            // Show success message
            setSnackbarMessage('Record updated successfully!');
            setOpenSnackbar(true);
        }
    } catch (err) {
      if (err.name === 'ValidationError') {
        // Handle Yup validation errors
        const errors = {};
        err.inner.forEach((error) => {
            errors[error.path] = error.message;
        });

        setHeadingError(!!errors.heading_1);
        setHeadingErrorMessage(errors.heading_1 || '');
        setContact1Error(!!errors.content_1);
        setContact1ErrorMessage(errors.content_1 || '');
        setContact1Error(!!errors.contact_1);
        setContact1ErrorMessage(errors.contact_1 || '');
        setLocation1Error(!!errors.location_1);
        setLocation1ErrorMessage(errors.location_1 || '');
        setEmail1Error(!!errors.email_1);
        setEmail1ErrorMessage(errors.email_1 || '');
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
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={headingError}
                      helperText={headingErrorMessage}
                      id="heading_1"
                      name="heading_1"
                      label="Heading"
                      variant="filled"
                      value={formData.heading_1}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={headingError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={contentError}
                      helperText={contentErrorMessage}
                      id="content_1"
                      name="content_1"
                      label="Content"
                      variant="filled"
                      value={formData.content_1}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={contentError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={contact1Error}
                      helperText={contact1ErrorMessage}
                      id="contact_1"
                      name="contact_1"
                      label="Contact 1"
                      variant="filled"
                      value={formData.contact_1}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={contact1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="contact_2"
                      name="contact_2"
                      label="Contact 2"
                      variant="filled"
                      value={formData.contact_2}
                      onChange={handleInputChange}
                      fullWidth
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={location1Error}
                      helperText={location1ErrorMessage}
                      id="location_1"
                      name="location_1"
                      label="Location 1"
                      variant="filled"
                      value={formData.location_1}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={location1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="location_2"
                      name="location_2"
                      label="Location 2"
                      variant="filled"
                      value={formData.location_2}
                      onChange={handleInputChange}
                      fullWidth
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={email1Error}
                      helperText={email1ErrorMessage}
                      id="email_1"
                      name="email_1"
                      label="Email 1"
                      variant="filled"
                      value={formData.email_1}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={email1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="email_2"
                      name="email_2"
                      label="Email 2"
                      variant="filled"
                      value={formData.email_2}
                      onChange={handleInputChange}
                      fullWidth
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              
              <Button type="submit" style={{ marginTop: 20 }} variant="contained" color="primary" className="submit-btn" onClick={handleSubmit}>
                Update Record
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

export default ContactUs;