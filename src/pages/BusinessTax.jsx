import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Grid, FormControl, TextField, Button, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const BusinessTax = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [heading1Error, setHeading1Error] = useState(false);
    const [heading1ErrorMessage, setHeading1ErrorMessage] = useState('');
    const [bannerContentError, setBannerContentError] = useState(false);
    const [bannerContentErrorMessage, setBannerContentErrorMessage] = useState('');
    const [sectionContent1Error, setSectionContent1Error] = useState(false);
    const [sectionContent1ErrorMessage, setSectionContent1ErrorMessage] = useState('');
    const [sectionContent2Error, setSectionContent2Error] = useState(false);
    const [sectionContent2ErrorMessage, setSectionContent2ErrorMessage] = useState('');
    const [sectionContent3Error, setSectionContent3Error] = useState(false);
    const [sectionContent3ErrorMessage, setSectionContent3ErrorMessage] = useState('');
    const [sectionContent4Error, setSectionContent4Error] = useState(false);
    const [sectionContent4ErrorMessage, setSectionContent4ErrorMessage] = useState('');
    const [workStepsHeading1Error, setWorkStepsHeading1Error] = useState(false);
    const [workStepsHeading1ErrorMessage, setWorkStepsHeading1ErrorMessage] = useState('');
    const [workStepsContent1Error, setWorkStepsContent1Error] = useState(false);
    const [workStepsContent1ErrorMessage, setWorkStepsContent1ErrorMessage] = useState('');
    const [workStepsHeading2Error, setWorkStepsHeading2Error] = useState(false);
    const [workStepsHeading2ErrorMessage, setWorkStepsHeading2ErrorMessage] = useState('');
    const [workStepsContent2Error, setWorkStepsContent2Error] = useState(false);
    const [workStepsContent2ErrorMessage, setWorkStepsContent2ErrorMessage] = useState('');
    const [workStepsHeading3Error, setWorkStepsHeading3Error] = useState(false);
    const [workStepsHeading3ErrorMessage, setWorkStepsHeading3ErrorMessage] = useState('');
    const [workStepsContent3Error, setWorkStepsContent3Error] = useState(false);
    const [workStepsContent3ErrorMessage, setWorkStepsContent3ErrorMessage] = useState('');
    const [heading2Error, setHeading2Error] = useState(false);
    const [heading2ErrorMessage, setHeading2ErrorMessage] = useState('');
    const [content2Error, setContent2Error] = useState(false);
    const [content2ErrorMessage, setContent2ErrorMessage] = useState('');

    // State for Snackbar (success message)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State for loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage form fields
    const [formData, setFormData] = useState({
        heading_1: "",
        banner_content: "",
        content_section_1: "",
        content_section_2: "",
        content_section_3: "",
        content_section_4: "",
        work_steps_heading_1: "",
        work_steps_content_1: "",
        work_steps_heading_2: "",
        work_steps_content_2: "",
        work_steps_heading_3: "",
        work_steps_content_3: "",
        heading_2: "",
        content_2: "",
    });

    const validationSchema = Yup.object().shape({
        heading_1: Yup.string().required('Main Heading is required'),
        banner_content: Yup.string().required('Banner Content is required'),
        content_section_1: Yup.string().required('Section Content 1 is required'),
        content_section_2: Yup.string().required('Section Content 2 is required'),
        content_section_3: Yup.string().required('Section Content 3 is required'),
        content_section_4: Yup.string().required('Section Content 4 is required'),
        work_steps_heading_1: Yup.string().required('Work Steps Heading 1 is required'),
        work_steps_content_1: Yup.string().required('Work Steps Content 1 is required'),
        work_steps_heading_2: Yup.string().required('Work Steps Heading 2 is required'),
        work_steps_content_2: Yup.string().required('Work Steps Content 2 is required'),
        work_steps_heading_3: Yup.string().required('Work Steps Heading 3 is required'),
        work_steps_content_3: Yup.string().required('Work Steps Content 3 is required'),
        heading_2: Yup.string().required('Heading 2 is required'),
        content_2: Yup.string().required('Heading 2 Content is required'),
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
          const response = await axios.get('http://localhost:3000/api/business-tax/getBusinessTax');
          if (response.data) {
            setFormData({
                heading_1: response.data.heading_1 || "",
                banner_content: response.data.banner_content || "",
                content_section_1: response.data.content_section_1 || "",
                content_section_2: response.data.content_section_2 || "",
                content_section_3: response.data.content_section_3 || "",
                content_section_4: response.data.content_section_4 || "",
                work_steps_heading_1: response.data.work_steps_heading_1 || "",
                work_steps_content_1: response.data.work_steps_content_1 || "",
                work_steps_heading_2: response.data.work_steps_heading_2 || "",
                work_steps_content_2: response.data.work_steps_content_2 || "",
                work_steps_heading_3: response.data.work_steps_heading_3 || "",
                work_steps_content_3: response.data.work_steps_content_3 || "",
                heading_2: response.data.heading_2 || "",
                content_2: response.data.content_2 || ""
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
        const response = await axios.post('http://localhost:3000/api/business-tax/update', formData);
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

        setHeading1Error(!!errors.heading_1);
        setHeading1ErrorMessage(errors.heading_1 || '');
        setBannerContentError(!!errors.banner_content);
        setBannerContentErrorMessage(errors.banner_content || '');
        setSectionContent1Error(!!errors.content_section_1);
        setSectionContent1ErrorMessage(errors.content_section_1 || '');
        setSectionContent2Error(!!errors.content_section_2);
        setSectionContent2ErrorMessage(errors.content_section_2 || '');
        setSectionContent3Error(!!errors.content_section_3);
        setSectionContent3ErrorMessage(errors.content_section_3 || '');
        setSectionContent4Error(!!errors.content_section_4);
        setSectionContent4ErrorMessage(errors.content_section_4 || '');
        setWorkStepsHeading1Error(!!errors.work_steps_heading_1);
        setWorkStepsHeading1ErrorMessage(errors.work_steps_heading_1 || '');
        setWorkStepsContent1Error(!!errors.work_steps_content_1);
        setWorkStepsContent1ErrorMessage(errors.work_steps_content_1 || '');
        setWorkStepsHeading2Error(!!errors.work_steps_heading_2);
        setWorkStepsHeading2ErrorMessage(errors.work_steps_heading_2 || '');
        setWorkStepsContent2Error(!!errors.work_steps_content_2);
        setWorkStepsContent2ErrorMessage(errors.work_steps_content_2 || '');
        setWorkStepsHeading3Error(!!errors.work_steps_heading_3);
        setWorkStepsHeading3ErrorMessage(errors.work_steps_heading_3 || '');
        setWorkStepsContent3Error(!!errors.work_steps_content_3);
        setWorkStepsContent3ErrorMessage(errors.work_steps_content_3 || '');
        setHeading2Error(!!errors.heading_2);
        setHeading2ErrorMessage(errors.heading_2 || '');
        setContent2Error(!!errors.content_2);
        setContent2ErrorMessage(errors.content_2 || '');
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
                      error={heading1Error}
                      helperText={heading1ErrorMessage}
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
                      color={heading1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={bannerContentError}
                      helperText={bannerContentErrorMessage}
                      id="banner_content"
                      name="banner_content"
                      label="Content"
                      variant="filled"
                      value={formData.banner_content}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={bannerContentError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <h5 className="section-heading">Content Sections</h5>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={sectionContent1Error}
                      helperText={sectionContent1ErrorMessage}
                      id="content_section_1"
                      name="content_section_1"
                      label="Content 1"
                      variant="filled"
                      value={formData.content_section_1}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={6}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={sectionContent1Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={sectionContent2Error}
                      helperText={sectionContent2ErrorMessage}
                      id="content_section_2"
                      name="content_section_2"
                      label="Content 2"
                      variant="filled"
                      value={formData.content_section_2}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={6}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={sectionContent2Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={sectionContent3Error}
                      helperText={sectionContent3ErrorMessage}
                      id="content_section_3"
                      name="content_section_3"
                      label="Content 3"
                      variant="filled"
                      value={formData.content_section_3}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={6}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={sectionContent3Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={sectionContent4Error}
                      helperText={sectionContent4ErrorMessage}
                      id="content_section_4"
                      name="content_section_4"
                      label="Content 4"
                      variant="filled"
                      value={formData.content_section_4}
                      onChange={handleInputChange}
                      multiline
                      required
                      rows={6}
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={sectionContent4Error ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <h5 className="section-heading">Work Flows</h5>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={workStepsHeading1Error}
                                helperText={workStepsHeading1ErrorMessage}
                                id="work_steps_heading_1"
                                name="work_steps_heading_1"
                                label="Flow Heading 1"
                                variant="filled"
                                value={formData.work_steps_heading_1}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={workStepsHeading1Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={workStepsContent1Error}
                                helperText={workStepsContent1ErrorMessage}
                                id="work_steps_content_1"
                                name="work_steps_content_1"
                                label="Flow Content 1"
                                variant="filled"
                                value={formData.work_steps_content_1}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={workStepsContent1Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={workStepsHeading2Error}
                                helperText={workStepsHeading2ErrorMessage}
                                id="work_steps_heading_2"
                                name="work_steps_heading_2"
                                label="Flow Heading 2"
                                variant="filled"
                                value={formData.work_steps_heading_2}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={workStepsHeading2Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={workStepsContent2Error}
                                helperText={workStepsContent2ErrorMessage}
                                id="work_steps_content_2"
                                name="work_steps_content_2"
                                label="Flow Content 2"
                                variant="filled"
                                value={formData.work_steps_content_2}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={workStepsContent2Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={workStepsHeading3Error}
                                helperText={workStepsHeading3ErrorMessage}
                                id="work_steps_heading_3"
                                name="work_steps_heading_3"
                                label="Flow Heading 3"
                                variant="filled"
                                value={formData.work_steps_heading_3}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={workStepsHeading3Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={workStepsContent3Error}
                                helperText={workStepsContent3ErrorMessage}
                                id="work_steps_content_3"
                                name="work_steps_content_3"
                                label="Flow Content 3"
                                variant="filled"
                                value={formData.work_steps_content_3}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={workStepsContent3Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

              <h5 className="section-heading">Heading 2</h5>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={heading2Error}
                      helperText={heading2ErrorMessage}
                      id="heading_2"
                      name="heading_2"
                      label="Heading"
                      variant="filled"
                      value={formData.heading_2}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="small"
                      margin="none"
                      style={{ padding: 0 }}
                      color={heading2Error ? 'error' : 'primary'}
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
                      label="Content"
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

export default BusinessTax;