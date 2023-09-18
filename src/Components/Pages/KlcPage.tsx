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
import dayjs from "dayjs";

function getUserInfo() {
    const tokenString = sessionStorage.getItem('json');
    const userToken = JSON.parse(tokenString!);
    return userToken
}


function KlcPage() {

    const getUser = getUserInfo();
    if (!getUser) {
        window.location.href = 'Login';
    }

    // const [tbKla, setTbKla] = useState("");
    const [KlcName, setKlcName] = useState("");

    // const [userInfo] = useLocalStorage("json", []);
    const [listKla, setListKla] = useState<Kla_Type[]>([]);
    const [listKlb, setListKlb] = useState<Klb_Type[]>([]);
    const [listKlc, setListKlc] = useState<Klc_Type[]>([]);

    const [klaCode, setKlaCode] = React.useState<string>("");
    const [klbCode, setKlbCode] = React.useState<string>("");




    const handleChange_a = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setKlaCode(event.target.value);

        setListKlb([]);
        setListKlc([]);

        klb_select(event.target.value);
    };

    const handleChange_b = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setKlbCode(event.target.value);

        setListKlc([]);

        klc_select(event.target.value);
    };

    interface Kla_Type {

        kla_code: string;
        kla_name: string;
        dep_code: string;
        emp_code: string;
        last_update: string;
    }

    interface Klb_Type {

        klb_code: string;
        klb_name: string;
        dep_code: string;
        kla_code: string;
        emp_code: string;
        last_update: string;
    }

    interface Klc_Type {

        klc_code: string;
        klc_name: string;
        dep_code: string;
        kla_code: string;
        klb_code: string;
        emp_code: string;
        last_update: string;
    }


    const btn_inset = () => {
        console.log("btn_inset");
        console.log(KlcName)

        if (KlcName === "") {
            return;
        }

        let emp_code = getUser[0].EmpCode;
        let last_update = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

        setListKlc([...listKlc, {
            klc_code: randomstring.generate(100).toUpperCase(),
            klc_name: KlcName,
            dep_code: getUser[0].department_key,
            kla_code: klaCode,
            klb_code: klbCode,
            emp_code: emp_code,
            last_update: last_update


        }]);

        // console.log(userInfo[0].department_key)

        klc_insert(randomstring.generate(100).toUpperCase(), KlcName, getUser[0].department_key, klaCode, klbCode, emp_code, last_update);
        setKlcName("")
    }


    async function klc_insert(klc_code: string, klc_name: string, dep_code: string, kla_code: string, klb_code: string, emp_code: string, last_update: string) {



        const params = {
            klc_code: klc_code,
            klc_name: klc_name,
            dep_code: dep_code,
            kla_code: kla_code,
            klb_code: klb_code,
            emp_code: emp_code,
            last_update: last_update
        };


        axios
            .post(process.env.REACT_APP_NODEJS + "klc_insert", params, {
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

    async function klb_select(key: string) {
        const url = process.env.REACT_APP_NODEJS + "klb_select";

        const options = {
            params: {
                key: key
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListKlb(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }

    async function klc_select(key: string) {
        const url = process.env.REACT_APP_NODEJS + "klc_select";

        const options = {
            params: {
                key: key
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListKlc(response.data);

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

    useEffect(() => {
        kla_select();

    }, []);

    return (
        <>


            <Box>
                <Grid xl={24} md={24}>
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

                    <Grid display="flex" justifyContent="flex-end" alignItems="center" lg={1} xs={1}>
                        <b className="fontColor" >Type : </b>
                    </Grid >

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={5} xs={12}>


                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                            <Select size="small"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={klaCode}
                                // label="Age"
                                onChange={handleChange_a}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {listKla.map((data, index) => (
                                    <MenuItem key={data.kla_code} value={data.kla_code}>{data.kla_name}</MenuItem>
                                ))}
                            </Select>

                        </FormControl>


                    </Grid >


                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >
                    <Grid display="flex" justifyContent="flex-end" alignItems="center" lg={1} xs={1}>
                        <b className="fontColor" >Phenomenon : </b>
                    </Grid >

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={5} xs={12}>


                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                            <Select size="small"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={klbCode}
                                // label="Age"
                                onChange={handleChange_b}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {listKlb.map((data, index) => (
                                    <MenuItem key={data.klb_code} value={data.klb_code}>{data.klb_name}</MenuItem>
                                ))}
                            </Select>

                        </FormControl>


                    </Grid >
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >
                    <Grid display="flex" justifyContent="flex-end" alignItems="center" lg={1} xs={1}>
                        <b className="fontColor">Symptom :</b>
                    </Grid>


                    <Grid display="flex" justifyContent="left" alignItems="center" lg={5} xs={12}>
                        <TextField style={{ backgroundColor: '#e0e0e0', borderRadius: '0.2rem' }} size="small" id="outlined-basic" variant="outlined" value={KlcName} onChange={(e) => {
                            setKlcName(e.target.value)
                        }
                        } fullWidth />
                    </Grid>


                    <Grid display="flex" justifyContent="left" alignItems="center" lg={1} xs={1}>
                        <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={btn_inset} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem' }}>Register</Button>
                    </Grid>

                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >
                    <Grid justifyContent="left" lg={5} xs={12} xsOffset={1}>
                        <Paper sx={{ overflow: 'hidden' }}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">#</StyledTableCell>
                                            <StyledTableCell align="center">Symptom</StyledTableCell>
                                            <StyledTableCell align="center">EMP Code</StyledTableCell>
                                            <StyledTableCell align="center">Last Update</StyledTableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listKlc.map((row, index) => (
                                            <StyledTableRow key={row.klc_code}>
                                                <StyledTableCell>{index + 1 + "."}</StyledTableCell>
                                                <StyledTableCell>{row.klc_name}</StyledTableCell>
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


                <Grid
                    container
                    spacing={2} display="flex" justifyContent="flex-end"
                >
                    <Grid>
                        <Box >

                            <Button fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem' }} onClick={() => {

                                window.location.href = 'ComplaintList';

                            }}>{"Close"}</Button>
                        </Box>

                    </Grid>
                </Grid >
            </Box>
        </>
    )
}

export default KlcPage