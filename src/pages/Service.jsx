import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Grid, FormControl, TextField, Button, Snackbar, Alert, Input, Typography } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const Service = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [mainImageError, setMainImageError] = useState(false);
    const [mainImageErrorMessage, setMainImageErrorMessage] = useState('');
    const [mainHeadingError, setMainHeadingError] = useState(false);
    const [mainHeadingErrorMessage, setMainHeadingErrorMessage] = useState('');
    const [mainHeadingContentError, setMainHeadingContentError] = useState(false);
    const [mainHeadingContentErrorMessage, setMainHeadingContentErrorMessage] = useState('');
    const [serviceBoxHeading1Error, setServiceBoxHeading1Error] = useState(false);
    const [serviceBoxHeading1ErrorMessage, setServiceBoxHeading1ErrorMessage] = useState('');
    const [serviceBoxContent1Error, setServiceBoxContent1Error] = useState(false);
    const [serviceBoxContent1ErrorMessage, setServiceBoxContent1ErrorMessage] = useState('');
    const [serviceBoxHeading2Error, setServiceBoxHeading2Error] = useState(false);
    const [serviceBoxHeading2ErrorMessage, setServiceBoxHeading2ErrorMessage] = useState('');
    const [serviceBoxContent2Error, setServiceBoxContent2Error] = useState(false);
    const [serviceBoxContent2ErrorMessage, setServiceBoxContent2ErrorMessage] = useState('');
    const [serviceBoxHeading3Error, setServiceBoxHeading3Error] = useState(false);
    const [serviceBoxHeading3ErrorMessage, setServiceBoxHeading3ErrorMessage] = useState('');
    const [serviceBoxContent3Error, setServiceBoxContent3Error] = useState(false);
    const [serviceBoxContent3ErrorMessage, setServiceBoxContent3ErrorMessage] = useState('');
    const [serviceBoxHeading4Error, setServiceBoxHeading4Error] = useState(false);
    const [serviceBoxHeading4ErrorMessage, setServiceBoxHeading4ErrorMessage] = useState('');
    const [serviceBoxContent4Error, setServiceBoxContent4Error] = useState(false);
    const [serviceBoxContent4ErrorMessage, setServiceBoxContent4ErrorMessage] = useState('');
    const [mainHeading2Error, setMainHeading2Error] = useState(false);
    const [mainHeading2ErrorMessage, setMainHeading2ErrorMessage] = useState('');
    const [mainHeadingContent2Error, setMainHeadingContent2Error] = useState(false);
    const [mainHeadingContent2ErrorMessage, setMainHeadingContent2ErrorMessage] = useState('');
    const [mainHeading3Error, setMainHeading3Error] = useState(false);
    const [mainHeading3ErrorMessage, setMainHeading3ErrorMessage] = useState('');
    const [mainHeadingContent3Error, setMainHeadingContent3Error] = useState(false);
    const [mainHeadingContent3ErrorMessage, setMainHeadingContent3ErrorMessage] = useState('');
    const [mainHeading3ImageError, setMainHeading3ImageError] = useState(false);
    const [mainHeading3ImageErrorMessage, setMainHeading3ImageErrorMessage] = useState('');
    const [mainHeading3Point1Error, setMainHeading3Point1Error] = useState(false);
    const [mainHeading3Point1ErrorMessage, setMainHeading3Point1ErrorMessage] = useState('');
    const [mainHeading3Point2Error, setMainHeading3Point2Error] = useState(false);
    const [mainHeading3Point2ErrorMessage, setMainHeading3Point2ErrorMessage] = useState('');
    const [mainHeading3Point3Error, setMainHeading3Point3Error] = useState(false);
    const [mainHeading3Point3ErrorMessage, setMainHeading3Point3ErrorMessage] = useState('');
    const [mainHeading3Point4Error, setMainHeading3Point4Error] = useState(false);
    const [mainHeading3Point4ErrorMessage, setMainHeading3Point4ErrorMessage] = useState('');
    const [mainHeading4Error, setMainHeading4Error] = useState(false);
    const [mainHeading4ErrorMessage, setMainHeading4ErrorMessage] = useState('');
    const [mainHeadingContent4Error, setMainHeadingContent4Error] = useState(false);
    const [mainHeadingContent4ErrorMessage, setMainHeadingContent4ErrorMessage] = useState('');

    // State for Snackbar (success message)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State for loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage form fields
    const [formData, setFormData] = useState({
      main_image: "",
      main_heading: "",
      main_heading_content: "",
      service_box_heading_1: "",
      service_box_content_1: "",
      service_box_heading_2: "",
      service_box_content_2: "",
      service_box_heading_3: "",
      service_box_content_3: "",
      service_box_heading_4: "",
      service_box_content_4: "",
      main_heading_2: "",
      main_heading_content_2: "",
      main_heading_3: "",
      main_heading_content_3: "",
      main_heading_3_image: "",
      main_heading_3_point_1: "",
      main_heading_3_point_2: "",
      main_heading_3_point_3: "",
      main_heading_3_point_4: "",
      main_heading_4: "",
      main_heading_content_4: ""
    });

    const validationSchema = Yup.object().shape({
      main_image: Yup.string().required('Main Image is required'),
      main_heading: Yup.string().required('Main Heading is required'),
      main_heading_content: Yup.string().required('Main Heading Content is required'),
      service_box_heading_1: Yup.string().required('Service Key Feature Heading 1 is required'),
      service_box_content_1: Yup.string().required('Service Key Feature Content 1 is required'),
      service_box_heading_2: Yup.string().required('Service Key Feature Heading 2 is required'),
      service_box_content_2: Yup.string().required('Service Key Feature Content 2 is required'),
      service_box_heading_3: Yup.string().required('Service Key Feature Heading 3 is required'),
      service_box_content_3: Yup.string().required('Service Key Feature Content 3 is required'),
      service_box_heading_4: Yup.string().required('Service Key Feature Heading 4 is required'),
      service_box_content_4: Yup.string().required('Service Key Feature Content 4 is required'),
      main_heading_2: Yup.string().required('Main Heading 2 is required'),
      main_heading_content_2: Yup.string().required('Main Heading Content 2 is required'),
      main_heading_3: Yup.string().required('Main Heading 3 is required'),
      main_heading_content_3: Yup.string().required('Main Heading Content 3 is required'),
      main_heading_3_image: Yup.string().required('Main Heading 3 Image is required'),
      main_heading_3_point_1: Yup.string().required('Main Heading 3 Point 1 is required'),
      main_heading_3_point_2: Yup.string().required('Main Heading 3 Point 2 is required'),
      main_heading_3_point_3: Yup.string().required('Main Heading 3 Point 3 is required'),
      main_heading_3_point_4: Yup.string().required('Main Heading 3 Point 4 is required'),
      main_heading_4: Yup.string().required('Main Heading 4 is required'),
      main_heading_content_4: Yup.string().required('Main Heading Content 4 is required')
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
          const response = await axios.get('http://localhost:3000/api/service/getService');
          if (response.data) {
            setFormData({
              main_image: response.data.main_image || "",
              main_heading: response.data.main_heading || "",
              main_heading_content: response.data.main_heading_content || "",
              service_box_heading_1: response.data.service_box_heading_1 || "",
              service_box_content_1: response.data.service_box_content_1 || "",
              service_box_heading_2: response.data.service_box_heading_2 || "",
              service_box_content_2: response.data.service_box_content_2 || "",
              service_box_heading_3: response.data.service_box_heading_3 || "",
              service_box_content_3: response.data.service_box_content_3 || "",
              service_box_heading_4: response.data.service_box_heading_4 || "",
              service_box_content_4: response.data.service_box_content_4 || "",
              main_heading_2: response.data.main_heading_2 || "",
              main_heading_content_2: response.data.main_heading_content_2 || "",
              main_heading_3: response.data.main_heading_3 || "",
              main_heading_content_3: response.data.main_heading_content_3 || "",
              main_heading_3_image: response.data.main_heading_3_image || "",
              main_heading_3_point_1: response.data.main_heading_3_point_1 || "",
              main_heading_3_point_2: response.data.main_heading_3_point_2 || "",
              main_heading_3_point_3: response.data.main_heading_3_point_3 || "",
              main_heading_3_point_4: response.data.main_heading_3_point_4 || "",
              main_heading_4: response.data.main_heading_4 || "",
              main_heading_content_4: response.data.main_heading_content_4 || ""
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

    // Handle file input change
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setFormData({
              ...formData,
              main_image: file,
          });
          setMainImageError(false);
          setMainImageErrorMessage('');
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data
        await validationSchema.validate(formData, { abortEarly: false });

        console.log("Updated Service Data:", formData);

        // Send the update request to the server
        const response = await axios.post('http://localhost:3000/api/service/update', formData);
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

        setMainImageError(!!errors.main_image);
        setMainImageErrorMessage(errors.main_image || '');
        setMainHeadingError(!!errors.main_heading);
        setMainHeadingErrorMessage(errors.main_heading || '');
        setMainHeadingContentError(!!errors.main_heading_content);
        setMainHeadingContentErrorMessage(errors.main_heading_content || '');
        setServiceBoxHeading1Error(!!errors.service_box_heading_1);
        setServiceBoxHeading1ErrorMessage(errors.service_box_heading_1 || '');
        setServiceBoxContent1Error(!!errors.service_box_content_1);
        setServiceBoxContent1ErrorMessage(errors.service_box_content_1 || '');
        setServiceBoxHeading2Error(!!errors.service_box_heading_2);
        setServiceBoxHeading2ErrorMessage(errors.service_box_heading_2 || '');
        setServiceBoxContent2Error(!!errors.service_box_content_2);
        setServiceBoxContent2ErrorMessage(errors.service_box_content_2 || '');
        setServiceBoxHeading3Error(!!errors.service_box_heading_3);
        setServiceBoxHeading3ErrorMessage(errors.service_box_heading_3 || '');
        setServiceBoxContent3Error(!!errors.service_box_content_3);
        setServiceBoxContent3ErrorMessage(errors.service_box_content_3 || '');
        setServiceBoxHeading4Error(!!errors.service_box_heading_4);
        setServiceBoxHeading4ErrorMessage(errors.service_box_heading_4 || '');
        setServiceBoxContent4Error(!!errors.service_box_content_4);
        setServiceBoxContent4ErrorMessage(errors.service_box_content_4 || '');
        setMainHeading2Error(!!errors.main_heading_2);
        setMainHeading2ErrorMessage(errors.main_heading_2 || '');
        setMainHeadingContent2Error(!!errors.main_heading_content_2);
        setMainHeadingContent2ErrorMessage(errors.main_heading_content_2 || '');
        setMainHeading3Error(!!errors.main_heading_3);
        setMainHeading3ErrorMessage(errors.main_heading_3 || '');
        setMainHeadingContent3Error(!!errors.main_heading_content_3);
        setMainHeadingContent3ErrorMessage(errors.main_heading_content_3 || '');
        setMainHeading3ImageError(!!errors.main_heading_3_image);
        setMainHeading3ImageErrorMessage(errors.main_heading_3_image || '');
        setMainHeading3Point1Error(!!errors.main_heading_3_point_1);
        setMainHeading3Point1ErrorMessage(errors.main_heading_3_point_1 || '');
        setMainHeading3Point2Error(!!errors.main_heading_3_point_2);
        setMainHeading3Point2ErrorMessage(errors.main_heading_3_point_2 || '');
        setMainHeading3Point3Error(!!errors.main_heading_3_point_3);
        setMainHeading3Point3ErrorMessage(errors.main_heading_3_point_3 || '');
        setMainHeading3Point4Error(!!errors.main_heading_3_point_4);
        setMainHeading3Point4ErrorMessage(errors.main_heading_3_point_4 || '');
        setMainHeading4Error(!!errors.main_heading_4);
        setMainHeading4ErrorMessage(errors.main_heading_4 || '');
        setMainHeadingContent4Error(!!errors.main_heading_content_4);
        setMainHeadingContent4ErrorMessage(errors.main_heading_content_4 || '');
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
              <h5>Content Section 1</h5>
              <Grid container spacing={2}>
                {/* File Input for Main Image */}
                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Input
                      type="file"
                      id="main_image"
                      name="main_image"
                      onChange={handleFileChange}
                      inputProps={{ accept: 'image/*' }} // Accept only image files
                      error={mainImageError}
                      fullWidth
                    />
                    {mainImageError && (
                      <Typography variant="caption" color="error">
                          {mainImageErrorMessage}
                      </Typography>
                    )}
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeadingError}
                      helperText={mainHeadingErrorMessage}
                      id="main_heading"
                      name="main_heading"
                      label="Heading"
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
                      error={mainHeadingContentError}
                      helperText={mainHeadingContentErrorMessage}
                      id="main_heading_content"
                      name="main_heading_content"
                      label="Content"
                      variant="filled"
                      value={formData.main_heading_content}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeadingContentError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <h5 className="section-heading">Service Key Features</h5>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxHeading1Error}
                      helperText={serviceBoxHeading1ErrorMessage}
                      id="service_box_heading_1"
                      name="service_box_heading_1"
                      label="Heading"
                      variant="filled"
                      value={formData.service_box_heading_1}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxHeading1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxContent1Error}
                      helperText={serviceBoxContent1ErrorMessage}
                      id="service_box_content_1"
                      name="service_box_content_1"
                      label="Content"
                      variant="filled"
                      value={formData.service_box_content_1}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxContent1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxHeading2Error}
                      helperText={serviceBoxHeading2ErrorMessage}
                      id="service_box_heading_2"
                      name="service_box_heading_2"
                      label="Heading"
                      variant="filled"
                      value={formData.service_box_heading_2}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxHeading2Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxContent2Error}
                      helperText={serviceBoxContent2ErrorMessage}
                      id="service_box_content_2"
                      name="service_box_content_2"
                      label="Content"
                      variant="filled"
                      value={formData.service_box_content_2}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxContent2Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxHeading3Error}
                      helperText={serviceBoxHeading3ErrorMessage}
                      id="service_box_heading_3"
                      name="service_box_heading_3"
                      label="Heading"
                      variant="filled"
                      value={formData.service_box_heading_3}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxHeading3Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxContent3Error}
                      helperText={serviceBoxContent3ErrorMessage}
                      id="service_box_content_3"
                      name="service_box_content_3"
                      label="Content"
                      variant="filled"
                      value={formData.service_box_content_3}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxContent3Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxHeading4Error}
                      helperText={serviceBoxHeading4ErrorMessage}
                      id="service_box_heading_4"
                      name="service_box_heading_4"
                      label="Heading"
                      variant="filled"
                      value={formData.service_box_heading_4}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxHeading4Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={serviceBoxContent4Error}
                      helperText={serviceBoxContent4ErrorMessage}
                      id="service_box_content_4"
                      name="service_box_content_4"
                      label="Content"
                      variant="filled"
                      value={formData.service_box_content_4}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={serviceBoxContent4Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <h5 className="section-heading">Content Section 2</h5>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeading2Error}
                      helperText={mainHeading2ErrorMessage}
                      id="main_heading_2"
                      name="main_heading_2"
                      label="Heading"
                      variant="filled"
                      value={formData.main_heading_2}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeading2Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeadingContent2Error}
                      helperText={mainHeadingContent2ErrorMessage}
                      id="main_heading_content_2"
                      name="main_heading_content_2"
                      label="Content"
                      variant="filled"
                      value={formData.main_heading_content_2}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeadingContent2Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <h5 className="section-heading">Content Section 3</h5>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeading3Error}
                      helperText={mainHeading3ErrorMessage}
                      id="main_heading_3"
                      name="main_heading_3"
                      label="Heading"
                      variant="filled"
                      value={formData.main_heading_3}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeading3Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeadingContent3Error}
                      helperText={mainHeadingContent3ErrorMessage}
                      id="main_heading_content_3"
                      name="main_heading_content_3"
                      label="Content"
                      variant="filled"
                      value={formData.main_heading_content_3}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeadingContent3Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeading3Point1Error}
                      helperText={mainHeading3Point1ErrorMessage}
                      id="main_heading_3_point_1"
                      name="main_heading_3_point_1"
                      label="Point 1"
                      variant="filled"
                      value={formData.main_heading_3_point_1}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeading3Point1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeading3Point2Error}
                      helperText={mainHeading3Point2ErrorMessage}
                      id="main_heading_3_point_2"
                      name="main_heading_3_point_2"
                      label="Point 2"
                      variant="filled"
                      value={formData.main_heading_3_point_2}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeading3Point2Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeading3Point3Error}
                      helperText={mainHeading3Point3ErrorMessage}
                      id="main_heading_3_point_3"
                      name="main_heading_3_point_3"
                      label="Point 3"
                      variant="filled"
                      value={formData.main_heading_3_point_3}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeading3Point3Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeading3Point4Error}
                      helperText={mainHeading3Point4ErrorMessage}
                      id="main_heading_3_point_4"
                      name="main_heading_3_point_4"
                      label="Point 4"
                      variant="filled"
                      value={formData.main_heading_3_point_4}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeading3Point4Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <h5 className="section-heading">Content Section 4</h5>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeading4Error}
                      helperText={mainHeading4ErrorMessage}
                      id="main_heading_4"
                      name="main_heading_4"
                      label="Heading"
                      variant="filled"
                      value={formData.main_heading_4}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeading4Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={mainHeadingContent4Error}
                      helperText={mainHeadingContent4ErrorMessage}
                      id="main_heading_content_4"
                      name="main_heading_content_4"
                      label="Content"
                      variant="filled"
                      value={formData.main_heading_content_4}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={mainHeadingContent4Error ? 'error' : 'primary'}
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

export default Service;