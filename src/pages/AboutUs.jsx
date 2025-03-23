import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Grid, FormControl, TextField, Button, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const AboutUs = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [mainHeadingError, setMainHeadingError] = useState(false);
    const [mainHeadingErrorMessage, setMainHeadingErrorMessage] = useState('');
    const [content1Error, setContent1Error] = useState(false);
    const [content1ErrorMessage, setContent1ErrorMessage] = useState('');
    const [content2Error, setContent2Error] = useState(false);
    const [content2ErrorMessage, setContent2ErrorMessage] = useState('');
    const [content3Error, setContent3Error] = useState(false);
    const [content3ErrorMessage, setContent3ErrorMessage] = useState('');
    const [content4Error, setContent4Error] = useState(false);
    const [content4ErrorMessage, setContent4ErrorMessage] = useState('');
    const [contactDesignationError, setContactDesignationError] = useState(false);
    const [contactDesignationErrorMessage, setContactDesignationErrorMessage] = useState('');
    const [contactInfoError, setContactInfoError] = useState(false);
    const [contactInfoErrorMessage, setContactInfoErrorMessage] = useState('');

    // State for Snackbar (success message)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State for loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage form fields
    const [formData, setFormData] = useState({
        main_heading: "",
        content_1: "",
        content_2: "",
        content_3: "",
        content_4: "",
        contact_designation: "",
        contact_info: "",
    });

    const validationSchema = Yup.object().shape({
        main_heading: Yup.string().required('Main Heading is required'),
        content_1: Yup.string().required('Content 1 is required'),
        content_2: Yup.string().required('Content 2 is required'),
        content_3: Yup.string().required('Content 3 is required'),
        content_4: Yup.string().required('Content 4 is required'),
        contact_designation: Yup.string().required('Contact Designation is required'),
        contact_info: Yup.string().required('Contact Info is required'),
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
          const response = await axios.get('http://localhost:3000/api/about-us/getAboutUs');
          if (response.data) {
            setFormData({
                main_heading: response.data.main_heading || "",
                content_1: response.data.content_1 || "",
                content_2: response.data.content_2 || "",
                content_3: response.data.content_3 || "",
                content_4: response.data.content_4 || "",
                contact_designation: response.data.contact_designation || "",
                contact_info: response.data.contact_info || "",
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
        const response = await axios.post('http://localhost:3000/api/about-us/update', formData);
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

        setMainHeadingError(!!errors.main_heading);
        setMainHeadingErrorMessage(errors.main_heading || '');
        setContent1Error(!!errors.content_1);
        setContent1ErrorMessage(errors.content_1 || '');
        setContent2Error(!!errors.content_2);
        setContent2ErrorMessage(errors.content_2 || '');
        setContent3Error(!!errors.content_3);
        setContent3ErrorMessage(errors.content_3 || '');
        setContent4Error(!!errors.content_4);
        setContent4ErrorMessage(errors.content_4 || '');
        setContactDesignationError(!!errors.contact_designation);
        setContactDesignationErrorMessage(errors.contact_designation || '');
        setContactInfoError(!!errors.contact_info);
        setContactInfoErrorMessage(errors.contact_info || '');
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
              <h5>Main Section</h5>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeadingError}
                      helperText={mainHeadingErrorMessage}
                      id="main_heading"
                      name="main_heading"
                      label="Main Heading"
                      variant="filled"
                      value={formData.main_heading}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeadingError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={content1Error}
                      helperText={content1ErrorMessage}
                      id="content_1"
                      name="content_1"
                      label="Content 1"
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
                      color={content1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={content2Error}
                      helperText={content2ErrorMessage}
                      id="content_2"
                      name="content_2"
                      label="Content 2"
                      variant="filled"
                      value={formData.content_2}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={content2Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={content3Error}
                      helperText={content3ErrorMessage}
                      id="content_3"
                      name="content_3"
                      label="Content 3"
                      variant="filled"
                      value={formData.content_3}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={content3Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={content4Error}
                      helperText={content4ErrorMessage}
                      id="content_4"
                      name="content_4"
                      label="Content 4"
                      variant="filled"
                      value={formData.content_4}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={content4Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <h5 className="section-heading">Contact Information</h5>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={contactDesignationError}
                      helperText={contactDesignationErrorMessage}
                      id="contact_designation"
                      name="contact_designation"
                      label="Contact Designation"
                      variant="filled"
                      value={formData.contact_designation}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={contactDesignationError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={contactInfoError}
                      helperText={contactInfoErrorMessage}
                      id="contact_info"
                      name="contact_info"
                      label="Contact Info"
                      variant="filled"
                      value={formData.contact_info}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={contactInfoError ? 'error' : 'primary'}
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

export default AboutUs;