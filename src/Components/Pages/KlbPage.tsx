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


function KlbPage() {

    const getUser = getUserInfo();
    if (!getUser) {
        window.location.href = 'Login';
    }


    // const [tbKla, setTbKla] = useState("");
    const [KlbName, setKlbName] = useState("");
    // const [userInfo] = useLocalStorage("json", []);
    const [listKla, setListKla] = useState<Kla_Type[]>([]);
    const [listKlb, setListKlb] = useState<Klb_Type[]>([]);
    const [klaCode, setKlaCode] = React.useState<string>("");




    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setKlaCode(event.target.value);

        klb_select(event.target.value);
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


    const btn_inset = () => {
        console.log("btn_inset");
        console.log(KlbName)

        if (KlbName === "") {
            return;
        }

        let emp_code = getUser[0].EmpCode;
        let last_update = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

        setListKlb([...listKlb, {
            klb_code: randomstring.generate(100).toUpperCase(),
            klb_name: KlbName,
            dep_code: getUser[0].department_key,
            kla_code: klaCode,
            emp_code: emp_code,
            last_update: last_update

        }]);

        // console.log(userInfo[0].department_key)

        klb_insert(randomstring.generate(100).toUpperCase(), KlbName, getUser[0].department_key, klaCode, emp_code, last_update);
        setKlbName("")
    }


    async function klb_insert(klb_code: string, klb_name: string, dep_code: string, kla_code: string, emp_code: string, last_update: string) {



        const params = {
            klb_code: klb_code,
            klb_name: klb_name,
            dep_code: dep_code,
            kla_code: kla_code,
            emp_code: emp_code,
            last_update: last_update,
        };


        axios
            .post(process.env.REACT_APP_NODEJS + "klb_insert", params, {
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

                    <Grid alignItems="center" marginTop={'7px'} xs={1.2}>
                        <b>Complaint Type :</b> </Grid>

                    <Grid justifyContent="left" lg={5} xs={12}>

                        <Grid>
                            <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                                <Select size="small"
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={klaCode}
                                    // label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {listKla.map((data, index) => (
                                        <MenuItem key={data.kla_code} value={data.kla_code}>{data.kla_name}</MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid alignItems="center" marginTop={'7px'} xs={1.2}>
                        <b>Phenomenon :</b> </Grid>

                    <Grid justifyContent="left" lg={5} xs={12}>

                        <Grid>
                            <TextField style={{ backgroundColor: '#e0e0e0', borderRadius: '0.2rem' }} size="small" id="outlined-basic" variant="outlined" value={KlbName} onChange={(e) => {
                                setKlbName(e.target.value)
                            }
                            } fullWidth />
                        </Grid>
                    </Grid>


                    <Grid alignItems="center" lg={1} xs={1}>
                        <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={btn_inset} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem' }}>Register</Button>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                >



                    <Grid justifyContent="left" lg={5} xs={12} xsOffset={1.2}>

                        <Grid>
                            <Paper sx={{ overflow: 'hidden' }}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">#</StyledTableCell>
                                                <StyledTableCell align="center">Phenomenon</StyledTableCell>
                                                <StyledTableCell align="center">EMP Code</StyledTableCell>
                                                <StyledTableCell align="center">Last Update</StyledTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listKlb.map((row, index) => (
                                                <StyledTableRow key={row.klb_code}>
                                                    <StyledTableCell>{index + 1 + "."}</StyledTableCell>
                                                    <StyledTableCell>{row.klb_name}</StyledTableCell>
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






                <Grid
                    container
                    spacing={2} display="flex" justifyContent="flex-end"
                >
                    <Grid>
                        <Box >

                            <Button fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem' }} onClick={() => {
                                window.location.href = 'Klc'
                            }}>{"Next >>"}</Button>
                        </Box>

                    </Grid>
                </Grid >

            </Box >












        </>
    )
}

export default KlbPage