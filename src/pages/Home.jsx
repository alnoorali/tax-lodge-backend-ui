import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Grid, FormControl, TextField, Button, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [taglineError, setTaglineError] = useState(false);
    const [taglineErrorMessage, setTaglineErrorMessage] = useState('');
    const [bannerHeadingError, setBannerHeadingError] = useState(false);
    const [bannerHeadingErrorMessage, setBannerHeadingErrorMessage] = useState('');
    const [bannerContentError, setBannerContentError] = useState(false);
    const [bannerContentErrorMessage, setBannerContentErrorMessage] = useState('');
    const [aboutMainHeadingError, setAboutMainHeadingError] = useState(false);
    const [aboutMainHeadingErrorMessage, setAboutMainHeadingErrorMessage] = useState('');
    const [aboutMainHeadingContentError, setAboutMainHeadingContentError] = useState(false);
    const [aboutMainHeadingContentErrorMessage, setAboutMainHeadingContentErrorMessage] = useState('');
    const [aboutSubHeadingError, setAboutSubHeadingError] = useState(false);
    const [aboutSubHeadingErrorMessage, setAboutSubHeadingErrorMessage] = useState('');
    const [aboutSubContentError, setAboutSubContentError] = useState(false);
    const [aboutSubContentErrorMessage, setAboutSubContentErrorMessage] = useState('');
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
    const [whyChooseHeadingError, setWhyChooseHeadingError] = useState(false);
    const [whyChooseHeadingErrorMessage, setWhyChooseHeadingErrorMessage] = useState('');
    const [whyChooseBoxHeading1Error, setWhyChooseBoxHeading1Error] = useState(false);
    const [whyChooseBoxHeading1ErrorMessage, setWhyChooseBoxHeading1ErrorMessage] = useState('');
    const [whyChooseBoxContent1Error, setWhyChooseBoxContent1Error] = useState(false);
    const [whyChooseBoxContent1ErrorMessage, setWhyChooseBoxContent1ErrorMessage] = useState('');
    const [whyChooseBoxHeading2Error, setWhyChooseBoxHeading2Error] = useState(false);
    const [whyChooseBoxHeading2ErrorMessage, setWhyChooseBoxHeading2ErrorMessage] = useState('');
    const [whyChooseBoxContent2Error, setWhyChooseBoxContent2Error] = useState(false);
    const [whyChooseBoxContent2ErrorMessage, setWhyChooseBoxContent2ErrorMessage] = useState('');
    const [whyChooseBoxHeading3Error, setWhyChooseBoxHeading3Error] = useState(false);
    const [whyChooseBoxHeading3ErrorMessage, setWhyChooseBoxHeading3ErrorMessage] = useState('');
    const [whyChooseBoxContent3Error, setWhyChooseBoxContent3Error] = useState(false);
    const [whyChooseBoxContent3ErrorMessage, setWhyChooseBoxContent3ErrorMessage] = useState('');
    const [whyChooseBoxHeading4Error, setWhyChooseBoxHeading4Error] = useState(false);
    const [whyChooseBoxHeading4ErrorMessage, setWhyChooseBoxHeading4ErrorMessage] = useState('');
    const [whyChooseBoxContent4Error, setWhyChooseBoxContent4Error] = useState(false);
    const [whyChooseBoxContent4ErrorMessage, setWhyChooseBoxContent4ErrorMessage] = useState('');
    const [whyChooseBoxHeading5Error, setWhyChooseBoxHeading5Error] = useState(false);
    const [whyChooseBoxHeading5ErrorMessage, setWhyChooseBoxHeading5ErrorMessage] = useState('');
    const [whyChooseBoxContent5Error, setWhyChooseBoxContent5Error] = useState(false);
    const [whyChooseBoxContent5ErrorMessage, setWhyChooseBoxContent5ErrorMessage] = useState('');
    const [whyChooseBoxHeading6Error, setWhyChooseBoxHeading6Error] = useState(false);
    const [whyChooseBoxHeading6ErrorMessage, setWhyChooseBoxHeading6ErrorMessage] = useState('');
    const [whyChooseBoxContent6Error, setWhyChooseBoxContent6Error] = useState(false);
    const [whyChooseBoxContent6ErrorMessage, setWhyChooseBoxContent6ErrorMessage] = useState('');
    const [whyChooseBoxHeading7Error, setWhyChooseBoxHeading7Error] = useState(false);
    const [whyChooseBoxHeading7ErrorMessage, setWhyChooseBoxHeading7ErrorMessage] = useState('');
    const [whyChooseBoxContent7Error, setWhyChooseBoxContent7Error] = useState(false);
    const [whyChooseBoxContent7ErrorMessage, setWhyChooseBoxContent7ErrorMessage] = useState('');
    const [whyChooseBoxHeading8Error, setWhyChooseBoxHeading8Error] = useState(false);
    const [whyChooseBoxHeading8ErrorMessage, setWhyChooseBoxHeading8ErrorMessage] = useState('');
    const [whyChooseBoxContent8Error, setWhyChooseBoxContent8Error] = useState(false);
    const [whyChooseBoxContent8ErrorMessage, setWhyChooseBoxContent8ErrorMessage] = useState('');

    // State for Snackbar (success message)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State for loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage form fields
    const [formData, setFormData] = useState({
        tagline: "",
        banner_heading: "",
        banner_content: "",
        about_main_heading: "",
        about_main_heading_content: "",
        about_sub_heading: "",
        about_sub_heading_content: "",
        work_steps_heading_1: "",
        work_steps_content_1: "",
        work_steps_heading_2: "",
        work_steps_content_2: "",
        work_steps_heading_3: "",
        work_steps_content_3: "",
        why_choose_heading: "",
        why_choose_box_heading_1: "",
        why_choose_box_content_1: "",
        why_choose_box_heading_2: "",
        why_choose_box_content_2: "",
        why_choose_box_heading_3: "",
        why_choose_box_content_3: "",
        why_choose_box_heading_4: "",
        why_choose_box_content_4: "",
        why_choose_box_heading_5: "",
        why_choose_box_content_5: "",
        why_choose_box_heading_6: "",
        why_choose_box_content_6: "",
        why_choose_box_heading_7: "",
        why_choose_box_content_7: "",
        why_choose_box_heading_8: "",
        why_choose_box_content_8: "",
    });

    const validationSchema = Yup.object().shape({
        tagline: Yup.string().required('Tagline is required'),
        banner_heading: Yup.string().required('Banner Heading is required'),
        banner_content: Yup.string().required('Banner Content is required'),
        about_main_heading: Yup.string().required('About Main Heading is required'),
        about_main_heading_content: Yup.string().required('About Main Heading Content is required'),
        about_sub_heading: Yup.string().required('About Sub Heading is required'),
        about_sub_heading_content: Yup.string().required('About Sub Heading Content is required'),
        work_steps_heading_1: Yup.string().required('Work Steps Heading 1 is required'),
        work_steps_content_1: Yup.string().required('Work Steps Content 1 is required'),
        work_steps_heading_2: Yup.string().required('Work Steps Heading 2 is required'),
        work_steps_content_2: Yup.string().required('Work Steps Content 2 is required'),
        work_steps_heading_3: Yup.string().required('Work Steps Heading 3 is required'),
        work_steps_content_3: Yup.string().required('Work Steps Content 3 is required'),
        why_choose_heading: Yup.string().required('Why Choose Heading is required'),
        why_choose_box_heading_1: Yup.string().required('Why Choose Box Heading 1 is required'),
        why_choose_box_content_1: Yup.string().required('Why Choose Box Content 1 is required'),
        why_choose_box_heading_2: Yup.string().required('Why Choose Box Heading 2 is required'),
        why_choose_box_content_2: Yup.string().required('Why Choose Box Content 2 is required'),
        why_choose_box_heading_3: Yup.string().required('Why Choose Box Heading 3 is required'),
        why_choose_box_content_3: Yup.string().required('Why Choose Box Content 3 is required'),
        why_choose_box_heading_4: Yup.string().required('Why Choose Box Heading 4 is required'),
        why_choose_box_content_4: Yup.string().required('Why Choose Box Content 4 is required'),
        why_choose_box_heading_5: Yup.string().required('Why Choose Box Heading 5 is required'),
        why_choose_box_content_5: Yup.string().required('Why Choose Box Content 5 is required'),
        why_choose_box_heading_6: Yup.string().required('Why Choose Box Heading 6 is required'),
        why_choose_box_content_6: Yup.string().required('Why Choose Box Content 6 is required'),
        why_choose_box_heading_7: Yup.string().required('Why Choose Box Heading 7 is required'),
        why_choose_box_content_7: Yup.string().required('Why Choose Box Content 7 is required'),
        why_choose_box_heading_8: Yup.string().required('Why Choose Box Heading 8 is required'),
        why_choose_box_content_8: Yup.string().required('Why Choose Box Content 8 is required'),
    });

    useEffect(() => {
        if (!userData) {
        navigate('/');
        }
    }, [userData, navigate]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/home/getHome');
                if (response.data) {
                    setFormData({
                        tagline: response.data.banner_tagline || "",
                        banner_heading: response.data.banner_heading || "",
                        banner_content: response.data.banner_content || "",
                        about_main_heading: response.data.about_main_heading || "",
                        about_main_heading_content: response.data.about_main_heading_content || "",
                        about_sub_heading: response.data.about_sub_heading || "",
                        about_sub_heading_content: response.data.about_sub_heading_content || "",
                        work_steps_heading_1: response.data.work_steps_heading_1 || "",
                        work_steps_content_1: response.data.work_steps_content_1 || "",
                        work_steps_heading_2: response.data.work_steps_heading_2 || "",
                        work_steps_content_2: response.data.work_steps_content_2 || "",
                        work_steps_heading_3: response.data.work_steps_heading_3 || "",
                        work_steps_content_3: response.data.work_steps_content_3 || "",
                        why_choose_heading: response.data.why_choose_heading || "",
                        why_choose_box_heading_1: response.data.why_choose_box_heading_1 || "",
                        why_choose_box_content_1: response.data.why_choose_box_content_1 || "",
                        why_choose_box_heading_2: response.data.why_choose_box_heading_2 || "",
                        why_choose_box_content_2: response.data.why_choose_box_content_2 || "",
                        why_choose_box_heading_3: response.data.why_choose_box_heading_3 || "",
                        why_choose_box_content_3: response.data.why_choose_box_content_3 || "",
                        why_choose_box_heading_4: response.data.why_choose_box_heading_4 || "",
                        why_choose_box_content_4: response.data.why_choose_box_content_4 || "",
                        why_choose_box_heading_5: response.data.why_choose_box_heading_5 || "",
                        why_choose_box_content_5: response.data.why_choose_box_content_5 || "",
                        why_choose_box_heading_6: response.data.why_choose_box_heading_6 || "",
                        why_choose_box_content_6: response.data.why_choose_box_content_6 || "",
                        why_choose_box_heading_7: response.data.why_choose_box_heading_7 || "",
                        why_choose_box_content_7: response.data.why_choose_box_content_7 || "",
                        why_choose_box_heading_8: response.data.why_choose_box_heading_8 || "",
                        why_choose_box_content_8: response.data.why_choose_box_content_8 || "",
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

        console.log("Updated Home Data:", formData);

        // Send the update request to the server
        const response = await axios.post('http://localhost:3000/api/home/update', formData);
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

            setTaglineError(!!errors.tagline);
            setTaglineErrorMessage(errors.tagline || '');
            setBannerHeadingError(!!errors.banner_heading);
            setBannerHeadingErrorMessage(errors.banner_heading || '');
            setBannerContentError(!!errors.banner_content);
            setBannerContentErrorMessage(errors.banner_content || '');
            setAboutMainHeadingError(!!errors.about_main_heading);
            setAboutMainHeadingErrorMessage(errors.about_main_heading || '');
            setAboutMainHeadingContentError(!!errors.about_main_heading_content);
            setAboutMainHeadingContentErrorMessage(errors.about_main_heading_content || '');
            setAboutSubHeadingError(!!errors.about_sub_heading);
            setAboutSubHeadingErrorMessage(errors.about_sub_heading || '');
            setAboutSubContentError(!!errors.about_sub_heading_content);
            setAboutSubContentErrorMessage(errors.about_sub_heading_content || '');
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
            setWhyChooseHeadingError(!!errors.why_choose_heading);
            setWhyChooseHeadingErrorMessage(errors.why_choose_heading || '');
            setWhyChooseBoxHeading1Error(!!errors.why_choose_box_heading_1);
            setWhyChooseBoxHeading1ErrorMessage(errors.why_choose_box_heading_1 || '');
            setWhyChooseBoxContent1Error(!!errors.why_choose_box_content_1);
            setWhyChooseBoxContent1ErrorMessage(errors.why_choose_box_content_1 || '');
            setWhyChooseBoxHeading2Error(!!errors.why_choose_box_heading_2);
            setWhyChooseBoxHeading2ErrorMessage(errors.why_choose_box_heading_2 || '');
            setWhyChooseBoxContent2Error(!!errors.why_choose_box_content_2);
            setWhyChooseBoxContent2ErrorMessage(errors.why_choose_box_content_2 || '');
            setWhyChooseBoxHeading3Error(!!errors.why_choose_box_heading_3);
            setWhyChooseBoxHeading3ErrorMessage(errors.why_choose_box_heading_3 || '');
            setWhyChooseBoxContent3Error(!!errors.why_choose_box_content_3);
            setWhyChooseBoxContent3ErrorMessage(errors.why_choose_box_content_3 || '');
            setWhyChooseBoxHeading4Error(!!errors.why_choose_box_heading_4);
            setWhyChooseBoxHeading4ErrorMessage(errors.why_choose_box_heading_4 || '');
            setWhyChooseBoxContent4Error(!!errors.why_choose_box_content_4);
            setWhyChooseBoxContent4ErrorMessage(errors.why_choose_box_content_4 || '');
            setWhyChooseBoxHeading5Error(!!errors.why_choose_box_heading_5);
            setWhyChooseBoxHeading5ErrorMessage(errors.why_choose_box_heading_5 || '');
            setWhyChooseBoxContent5Error(!!errors.why_choose_box_content_5);
            setWhyChooseBoxContent5ErrorMessage(errors.why_choose_box_content_5 || '');
            setWhyChooseBoxHeading6Error(!!errors.why_choose_box_heading_6);
            setWhyChooseBoxHeading6ErrorMessage(errors.why_choose_box_heading_6 || '');
            setWhyChooseBoxContent6Error(!!errors.why_choose_box_content_6);
            setWhyChooseBoxContent6ErrorMessage(errors.why_choose_box_content_6 || '');
            setWhyChooseBoxHeading7Error(!!errors.why_choose_box_heading_7);
            setWhyChooseBoxHeading7ErrorMessage(errors.why_choose_box_heading_7 || '');
            setWhyChooseBoxContent7Error(!!errors.why_choose_box_content_7);
            setWhyChooseBoxContent7ErrorMessage(errors.why_choose_box_content_7 || '');
            setWhyChooseBoxHeading8Error(!!errors.why_choose_box_heading_8);
            setWhyChooseBoxHeading8ErrorMessage(errors.why_choose_box_heading_8 || '');
            setWhyChooseBoxContent8Error(!!errors.why_choose_box_content_8);
            setWhyChooseBoxContent8ErrorMessage(errors.why_choose_box_content_8 || '');
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
                <h5>Top Banner</h5>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                error={taglineError}
                                helperText={taglineErrorMessage}
                                id="tagline"
                                name="tagline"
                                label="Tagline"
                                variant="filled"
                                value={formData.tagline}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={taglineError ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                error={bannerHeadingError}
                                helperText={bannerHeadingErrorMessage}
                                id="banner_heading"
                                name="banner_heading"
                                label="Heading"
                                variant="filled"
                                value={formData.banner_heading}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={bannerHeadingError ? 'error' : 'primary'}
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

                <h5 className="section-heading">About Us</h5>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={aboutMainHeadingError}
                                helperText={aboutMainHeadingErrorMessage}
                                id="about_main_heading"
                                name="about_main_heading"
                                label="Heading"
                                variant="filled"
                                value={formData.about_main_heading}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={aboutMainHeadingError ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={aboutMainHeadingContentError}
                                helperText={aboutMainHeadingContentErrorMessage}
                                id="about_main_heading_content"
                                name="about_main_heading_content"
                                label="Content"
                                variant="filled"
                                value={formData.about_main_heading_content}
                                onChange={handleInputChange}
                                required
                                multiline
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={aboutMainHeadingContentError ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={aboutSubHeadingError}
                                helperText={aboutSubHeadingErrorMessage}
                                id="about_sub_heading"
                                name="about_sub_heading"
                                label="Sub Heading"
                                variant="filled"
                                value={formData.about_sub_heading}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={aboutSubHeadingError ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={aboutSubContentError}
                                helperText={aboutSubContentErrorMessage}
                                id="about_sub_heading_content"
                                name="about_sub_heading_content"
                                label="Sub Content"
                                variant="filled"
                                value={formData.about_sub_heading_content}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={aboutSubContentError ? 'error' : 'primary'}
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

                <h5 className="section-heading">Why Choose Us</h5>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseHeadingError}
                                helperText={whyChooseHeadingErrorMessage}
                                id="why_choose_heading"
                                name="why_choose_heading"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_heading}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseHeadingError ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 1</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading1Error}
                                helperText={whyChooseBoxHeading1ErrorMessage}
                                id="why_choose_box_heading_1"
                                name="why_choose_box_heading_1"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_1}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading1Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent1Error}
                                helperText={whyChooseBoxContent1ErrorMessage}
                                id="why_choose_box_content_1"
                                name="why_choose_box_content_1"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_1}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent1Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 2</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading2Error}
                                helperText={whyChooseBoxHeading2ErrorMessage}
                                id="why_choose_box_heading_2"
                                name="why_choose_box_heading_2"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_2}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading2Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent2Error}
                                helperText={whyChooseBoxContent2ErrorMessage}
                                id="why_choose_box_content_2"
                                name="why_choose_box_content_2"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_2}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent2Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 3</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading3Error}
                                helperText={whyChooseBoxHeading3ErrorMessage}
                                id="why_choose_box_heading_3"
                                name="why_choose_box_heading_3"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_3}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading3Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent3Error}
                                helperText={whyChooseBoxContent3ErrorMessage}
                                id="why_choose_box_content_3"
                                name="why_choose_box_content_3"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_3}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent3Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 4</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading4Error}
                                helperText={whyChooseBoxHeading4ErrorMessage}
                                id="why_choose_box_heading_4"
                                name="why_choose_box_heading_4"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_4}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading4Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent4Error}
                                helperText={whyChooseBoxContent4ErrorMessage}
                                id="why_choose_box_content_4"
                                name="why_choose_box_content_4"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_4}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent4Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 5</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading5Error}
                                helperText={whyChooseBoxHeading5ErrorMessage}
                                id="why_choose_box_heading_5"
                                name="why_choose_box_heading_5"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_5}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading5Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent5Error}
                                helperText={whyChooseBoxContent5ErrorMessage}
                                id="why_choose_box_content_5"
                                name="why_choose_box_content_5"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_5}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent5Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 6</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading6Error}
                                helperText={whyChooseBoxHeading6ErrorMessage}
                                id="why_choose_box_heading_6"
                                name="why_choose_box_heading_6"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_6}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading6Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent6Error}
                                helperText={whyChooseBoxContent6ErrorMessage}
                                id="why_choose_box_content_6"
                                name="why_choose_box_content_6"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_6}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent6Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 7</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading7Error}
                                helperText={whyChooseBoxHeading7ErrorMessage}
                                id="why_choose_box_heading_7"
                                name="why_choose_box_heading_7"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_7}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading7Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent7Error}
                                helperText={whyChooseBoxContent7ErrorMessage}
                                id="why_choose_box_content_7"
                                name="why_choose_box_content_7"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_7}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent7Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h6 className="section-sub-heading">Box 8</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxHeading8Error}
                                helperText={whyChooseBoxHeading8ErrorMessage}
                                id="why_choose_box_heading_8"
                                name="why_choose_box_heading_8"
                                label="Heading"
                                variant="filled"
                                value={formData.why_choose_box_heading_8}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxHeading8Error ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={whyChooseBoxContent8Error}
                                helperText={whyChooseBoxContent8ErrorMessage}
                                id="why_choose_box_content_8"
                                name="why_choose_box_content_8"
                                label="Content"
                                variant="filled"
                                value={formData.why_choose_box_content_8}
                                onChange={handleInputChange}
                                multiline
                                required
                                rows={3}
                                size="small"
                                margin="none"
                                style={{ padding: 0 }}
                                color={whyChooseBoxContent8Error ? 'error' : 'primary'}
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

export default Home;