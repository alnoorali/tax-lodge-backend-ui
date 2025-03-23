import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import '../assets/css/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faExclamationTriangle,
  faRoute,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import ApexChart from './ApexChart';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) {
            navigate('/');
        }
        else {
            if (userData.data.logintype === 2) {
                navigate('/profile');
            }
        }
    }, [userData, navigate]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];
      
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            <Sidebar />
            <section className="home-section">
                <Header />
                <div className='mainBodyContainer'>
                    <div className='bodyContainer'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <div className='card card-border-shadow h-200'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='me-3'>
                                                <span className="rounded bg-label-primary">
                                                    <FontAwesomeIcon icon={faCar} />
                                                </span>
                                            </div>
                                            <h4 className="mb-2">42</h4>
                                        </div>
                                        <p className="text-body-secondary mb-1">On route vehicles</p>
                                        <p className="mb-0">
                                            <span className="text-heading fw-medium me-2">+18.2%</span>
                                            <small className="text-body-secondary">than last week</small>
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div className='card card-border-shadow h-200'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='me-3'>
                                                <span className="rounded bg-label-warning">
                                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                                </span>
                                            </div>
                                            <h4 className="mb-2">8</h4>
                                        </div>
                                        <p className="text-body-secondary mb-1">Vehicles with errors</p>
                                        <p className="mb-0">
                                            <span className="text-heading fw-medium me-2">-8.7%</span>
                                            <small className="text-body-secondary">than last week</small>
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div className='card card-border-shadow h-200'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='me-3'>
                                                <span className="rounded bg-label-danger">
                                                    <FontAwesomeIcon icon={faRoute} />
                                                </span>
                                            </div>
                                            <h4 className="mb-2">27</h4>
                                        </div>
                                        <p className="text-body-secondary mb-1">Deviated from route</p>
                                        <p className="mb-0">
                                            <span className="text-heading fw-medium me-2">+4.3%</span>
                                            <small className="text-body-secondary">than last week</small>
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div className='card card-border-shadow h-200'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='me-3'>
                                                <span className="rounded bg-label-info">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                            </div>
                                            <h4 className="mb-2">13</h4>
                                        </div>
                                        <p className="text-body-secondary mb-1">Late vehicles</p>
                                        <p className="mb-0">
                                            <span className="text-heading fw-medium me-2">-2.5%</span>
                                            <small className="text-body-secondary">than last week</small>
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='bodyContainer'>
                        <Grid container spacing={3}>
                            <Grid item sm={12}>
                                <div className='card card-border-shadow'>
                                    <div className='card-body'>
                                        <ApexChart />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='bodyContainer'>
                        <Grid container spacing={3}>
                            <Grid item sm={12}>
                                <div className='card card-border-shadow'>
                                    <div className='card-body'>
                                        <h4>Products</h4>
                                        <Paper sx={{ height: 400, width: '100%', marginTop: 2 }}>
                                            <DataGrid
                                                rows={rows}
                                                columns={columns}
                                                initialState={{ pagination: { paginationModel } }}
                                                pageSizeOptions={[5, 10]}
                                                checkboxSelection
                                                sx={{ border: 0 }}
                                            />
                                        </Paper>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </section>
        </>
    );  
};

export default Dashboard;