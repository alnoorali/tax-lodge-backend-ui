import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FormControl, Button, Snackbar, Alert, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

import 'react-quill/dist/quill.snow.css';

const TermsConditions = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [value, setValue] = useState('');
    const [ReactQuill, setReactQuill] = useState(null);

    // State for Snackbar (success message)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State for loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage form fields
    const [formData, setFormData] = useState({
        content: ""
    });

    // State for validation
    const [isContentValid, setIsContentValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('Content is required'),
    });

    useEffect(() => {
        import('react-quill').then((module) => {
            setReactQuill(() => module.default);
        });
    }, []);

    useEffect(() => {
        if (!userData) {
            navigate('/');
        }
    }, [userData, navigate]);

    // Fetch customer data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/terms-conditions/getTermsConditions');
                if (response.data) {
                    setFormData({
                        content: response.data.content || "",
                    });
                    setValue(response.data.content || ""); // Set the editor value
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validate the editor content
            if (!value || value.trim() === "") {
                setIsContentValid(false); // Set validation state to false
                setErrorMessage('Content is required'); // Set error message
                return;
            }

            // If content is valid, reset validation state
            setIsContentValid(true);
            setErrorMessage('');

            // Update formData with the editor's value
            const updatedFormData = {
                ...formData,
                content: value, // Include the editor's value
            };

            // Validate the form data
            await validationSchema.validate(updatedFormData, { abortEarly: false });

            console.log("Updated Service Data:", updatedFormData);

            // Send the update request to the server
            const response = await axios.post('http://localhost:3000/api/terms-conditions/update', updatedFormData);
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

    if (!ReactQuill) {
        return <div>Loading editor...</div>; // Fallback while loading
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
                            <FormControl fullWidth error={!isContentValid}>
                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue); // Update the editor's value
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            content: newValue, // Update formData
                                        }));

                                        // Reset validation state when the user starts typing
                                        if (!isContentValid) {
                                            setIsContentValid(true);
                                            setErrorMessage('');
                                        }
                                    }}
                                />
                                {!isContentValid && (
                                    <FormHelperText>{errorMessage}</FormHelperText>
                                )}
                            </FormControl>
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

export default TermsConditions;