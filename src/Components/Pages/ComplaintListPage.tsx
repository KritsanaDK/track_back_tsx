import React, { useEffect, useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as randomstring from "randomstring";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { useLocalStorage } from "../../Data/useLocalStorage";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { CgMoreVerticalO } from "react-icons/cg";
import Menu from '@mui/material/Menu';
import { BsList } from "react-icons/bs";
import LogInPage from "./LogInPage";
import dayjs from "dayjs";

function getUserInfo() {
    const tokenString = sessionStorage.getItem('json');
    const userToken = JSON.parse(tokenString!);
    return userToken
}

function ComplaintListPage() {

    const getUser = getUserInfo();
    if (!getUser) {
        window.location.href = 'Login';
    }


    // const [getUser, setUserInfo] = useState({});

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#616161",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const [listCompaint, setListCompaint] = useState<complaint_record_info_Type[]>([]);


    interface complaint_record_info_Type {

        complaint_code: string;
        ins_no: string;
        prd_lot: string;
        part_name: string;
        k_serial: string;
        prd_date: string;
        qcs_no: string;
        kla: string;
        kla_name: string;
        klb: string;
        klb_name: string;
        klc: string;
        klc_name: string;
        k_mode: string;
        method_id: string;
        method_value: string;
        emp_code: string;
        last_update: string;
    }








    async function complaint_record_info_select() {
        const url = process.env.REACT_APP_NODEJS + "complaint_record_info_select";

        const options = {
            params: {
                key: getUser[0].department_key
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListCompaint(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }



    useEffect(() => {
        console.log("useEffect");

        complaint_record_info_select();



    }, []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: 1,
                }}
            >
                <Grid xl={6} md={6}>
                    <Typography variant="h3" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                        Complaint Record List
                    </Typography>
                </Grid>

                {/* <Grid xl={6} md={6}>


                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Typography variant="h3" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                            <BsList />
                        </Typography>
                    </Button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Register Complaint mode</MenuItem>
                        <MenuItem onClick={handleClose}>Register Data item</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Grid> */}

            </Box >



            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: 1,
                    marginTop: '2rem',
                }}
            >

                <Grid xl={6} md={6}>
                    <Typography variant="h4" style={{ color: '#FFF', letterSpacing: '0rem', fontWeight: 'bold', marginTop: '1rem' }}>
                        Draft Report list
                    </Typography>
                </Grid>

                <Grid>
                    <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {
                        sessionStorage.setItem("key", '[{ "key":"' + randomstring.generate(100).toUpperCase() + '" }]');
                        window.location.href = 'NewRec?Mode=New';

                    }} style={{ background: '#E4E4E4', color: '#000', fontWeight: 'bold', paddingLeft: '3rem', paddingRight: '3rem', marginTop: '1rem' }}>New Record</Button>
                </Grid>

            </Box >

            <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    alignItems="left"
                >
                    <Grid justifyContent="left" lg={24} xs={24}>

                        <Grid>


                            <Paper sx={{ overflow: 'hidden' }}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">#</StyledTableCell>
                                                <StyledTableCell align="center">Inspection</StyledTableCell>
                                                <StyledTableCell align="center">PRD Lot</StyledTableCell>
                                                <StyledTableCell align="center">Part Name</StyledTableCell>
                                                <StyledTableCell align="center">PRD Date</StyledTableCell>
                                                <StyledTableCell align="center">QCS No</StyledTableCell>
                                                <StyledTableCell align="center">Complaint type</StyledTableCell>
                                                <StyledTableCell align="center">Phenomenon</StyledTableCell>
                                                <StyledTableCell align="center">Symptom</StyledTableCell>
                                                <StyledTableCell align="center">EMP Code</StyledTableCell>
                                                <StyledTableCell align="center">Last Update</StyledTableCell>
                                                <StyledTableCell align="center">Action</StyledTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listCompaint.map((row, index) => (

                                                row.k_mode == "0" && <StyledTableRow key={row.complaint_code}>
                                                    <StyledTableCell align="left">{index + 1 + "."}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.ins_no}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.prd_lot}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.part_name}</StyledTableCell>
                                                    <StyledTableCell align="left">{dayjs(row.prd_date).format('YYYY-MM-DD')}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.qcs_no}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.kla_name}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.klb_name}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.klc_name}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.emp_code}</StyledTableCell>
                                                    <StyledTableCell align="center">{dayjs(row.last_update).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
                                                    <StyledTableCell align="center">

                                                        <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {
                                                            sessionStorage.setItem("key", '[{ "key":"' + row.complaint_code + '" }]');
                                                            window.location.href = 'NewRec?Mode=Edit';

                                                        }} style={{ background: '#0E0E0E', color: '#E4E4E4', fontWeight: 'bold', }}>Edit</Button>

                                                    </StyledTableCell>

                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>


            </Box >


            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: 1,
                    marginTop: '2rem',
                }}
            >

                <Grid xl={6} md={6}>
                    <Typography variant="h4" style={{ color: '#FFF', letterSpacing: '0rem', fontWeight: 'bold', marginTop: '1rem' }}>
                        Completed Report list
                    </Typography>
                </Grid>



            </Box >

            <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    alignItems="left"
                >
                    <Grid justifyContent="left" lg={24} xs={24}>

                        <Grid>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">#</StyledTableCell>
                                            <StyledTableCell align="center">Inspection</StyledTableCell>
                                            <StyledTableCell align="center">PRD Lot</StyledTableCell>
                                            <StyledTableCell align="center">Part Name</StyledTableCell>
                                            <StyledTableCell align="center">PRD Date</StyledTableCell>
                                            <StyledTableCell align="center">QCS No</StyledTableCell>
                                            <StyledTableCell align="center">Complaint type</StyledTableCell>
                                            <StyledTableCell align="center">Phenomenon</StyledTableCell>
                                            <StyledTableCell align="center">Symptom</StyledTableCell>
                                            <StyledTableCell align="center">EMP Code</StyledTableCell>
                                            <StyledTableCell align="center">Last Update</StyledTableCell>
                                            <StyledTableCell align="center">Action</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listCompaint.map((row, index) => (

                                            row.k_mode == "1" && <StyledTableRow key={row.complaint_code}>
                                                <StyledTableCell align="left">{index + 1 + "."}</StyledTableCell>
                                                <StyledTableCell align="left">{row.ins_no}</StyledTableCell>
                                                <StyledTableCell align="left">{row.prd_lot}</StyledTableCell>
                                                <StyledTableCell align="left">{row.part_name}</StyledTableCell>
                                                <StyledTableCell align="left">{dayjs(row.prd_date).format('YYYY-MM-DD')}</StyledTableCell>
                                                <StyledTableCell align="left">{row.qcs_no}</StyledTableCell>
                                                <StyledTableCell align="left">{row.kla_name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.klb_name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.klc_name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.emp_code}</StyledTableCell>
                                                <StyledTableCell align="left">{dayjs(row.last_update).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
                                                <StyledTableCell align="center">

                                                    <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {
                                                        sessionStorage.setItem("key", '[{ "key":"' + row.complaint_code + '" }]');
                                                        window.location.href = 'NewRec?Mode=View';

                                                    }} style={{ background: '#0E0E0E', color: '#E4E4E4', fontWeight: 'bold', }}>View</Button>

                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>


            </Box >


        </>
    )
}

export default ComplaintListPage