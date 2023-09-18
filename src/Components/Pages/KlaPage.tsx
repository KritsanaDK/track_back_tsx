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
import dayjs from "dayjs";

function getUserInfo() {
    const tokenString = sessionStorage.getItem('json');
    const userToken = JSON.parse(tokenString!);
    return userToken
}

function KlaPage() {

    const [KlaName, setKlaName] = useState("");
    // const [userInfo] = useLocalStorage("json", []);
    const [listKla, setListKla] = useState<DataType_Type[]>([]);

    const getUser = getUserInfo();
    if (!getUser) {
        window.location.href = 'Login';
    }


    interface DataType_Type {

        kla_code: string;
        kla_name: string;
        dep_code: string;
        emp_code: string;
        last_update: string;
    }


    const btn_inset = () => {
        console.log("btn_inset");
        console.log(KlaName)

        if (KlaName === "") {
            return;
        }

        let emp_code = getUser[0].EmpCode;
        let last_update = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

        setListKla([...listKla, {

            kla_code: randomstring.generate(100).toUpperCase(),
            kla_name: KlaName,
            dep_code: getUser[0].department_key,
            emp_code: emp_code,
            last_update: last_update

        }]);

        console.log(getUser[0].department_key)

        kla_insert(randomstring.generate(100).toUpperCase(), KlaName, getUser[0].department_key, emp_code, last_update)

        setKlaName("")
    }


    async function kla_insert(kla_code: string, kla_name: string, dep_code: string, emp_code: string, last_update: string) {



        const params = {
            kla_code: kla_code,
            kla_name: kla_name,
            dep_code: dep_code,
            emp_code: emp_code,
            last_update: last_update
        };

        axios
            .post(process.env.REACT_APP_NODEJS + "kla_insert", params, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
            })

            .catch((err) => {
                console.log(err);
            });
    }

    async function kla_select() {
        const url = process.env.REACT_APP_NODEJS + "kla_select";

        const options = {
            params: {
                key: getUser[0].department_key
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListKla(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }



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


    // const rows = [
    //     { name: "xxxxx", calories: 5 }
    // ];

    useEffect(() => {
        kla_select();

    }, []);

    return (
        <>
            <Box>
                <Grid xl={12} md={12}>
                    <Typography variant="h3" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                        Register Complaint Mode
                    </Typography>
                </Grid>
            </Box>


            <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"



                >
                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'}>
                        <b>Complaint Type :</b> </Grid>

                    <Grid justifyContent="left" lg={5} xs={12}>

                        <Grid>
                            <Grid xs={24}>
                                <TextField size="small" id="outlined-basic" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} value={KlaName} onChange={(e) => {
                                    setKlaName(e.target.value)
                                }
                                } fullWidth />
                            </Grid>

                        </Grid>

                        <Grid marginTop={'1rem'}>
                            <Grid xs={24}>
                                <Paper sx={{ overflow: 'hidden' }}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">#</StyledTableCell>
                                                    <StyledTableCell align="center">Type</StyledTableCell>
                                                    <StyledTableCell align="center">EMP Code</StyledTableCell>
                                                    <StyledTableCell align="center">Last Update</StyledTableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {listKla.map((row, index) => (
                                                    <StyledTableRow key={row.kla_code}>
                                                        <StyledTableCell>{index + 1 + "."}</StyledTableCell>
                                                        <StyledTableCell>{row.kla_name}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.emp_code}</StyledTableCell>
                                                        <StyledTableCell align="center">{dayjs(row.last_update).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>






                    </Grid>

                    <Grid display="flex" justifyContent="left" alignItems="flex-start" lg={1} xs={6}>
                        <Button size="large" variant="contained" sx={{ borderRadius: 28 }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', }} onClick={btn_inset}>Register</Button>
                    </Grid>
                </Grid >


                <Grid
                    container
                    spacing={2} display="flex" justifyContent="flex-end"
                >
                    <Grid>
                        <Box >

                            <Button fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem' }} onClick={() => {
                                window.location.href = 'Klb'
                            }}>{"Next >>"}</Button>
                        </Box>

                    </Grid>
                </Grid >
            </Box >

        </>
    )
}

export default KlaPage