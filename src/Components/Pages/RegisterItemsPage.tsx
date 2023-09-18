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

import { inputLabelClasses } from "@mui/material/InputLabel";
import dayjs from "dayjs";

function getUserInfo() {
    const tokenString = sessionStorage.getItem('json');
    const userToken = JSON.parse(tokenString!);
    return userToken
}

function RegisterItemsPage() {

    // const [userInfo] = useLocalStorage("json", []);

    const getUser = getUserInfo();
    if (!getUser) {
        window.location.href = 'Login';
    }



    const [item, setItem] = useState("");
    const [source, setSource] = useState("");
    const [flag, setFlag] = useState("");

    const [listFlag, setListFlag] = useState<Flag_Type[]>([]);
    const [listItem, setListItem] = useState<Item_Type[]>([]);


    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setFlag(event.target.value);

        // klb_select(event.target.value);
    };

    interface Flag_Type {
        flag_code: string;
        flag_name: string;
        dep_code: string;
    }


    interface Item_Type {
        item_code: string;
        item_name: string;
        item_source: string;
        dep_code: string;
        flag_code: string;
        flag_name: any;
        emp_code: string;
        last_update: string;

    }

    const btn_inset = () => {
        console.log("btn_inset");
        console.log(item)

        if (item === "" || source === "") {
            return;
        }

        let emp_code = getUser[0].EmpCode;
        let last_update = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');


        setListItem([...listItem, {
            item_code: randomstring.generate(100).toUpperCase(),
            item_name: item,
            item_source: source,
            dep_code: getUser[0].department_key,
            flag_code: flag,
            flag_name: listFlag.find((x) => x.flag_code === flag)?.flag_name,
            emp_code: emp_code,
            last_update: last_update


        }]);

        // console.log(userInfo[0].department_key)

        register_item_insert(randomstring.generate(100).toUpperCase(), item, source, getUser[0].department_key, flag, emp_code, last_update);
        // setKlbName("")
    }


    async function flag_select() {
        const url = process.env.REACT_APP_NODEJS + "flag_select";

        const options = {
            params: {
                key: getUser[0].department_key
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListFlag(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }


    async function register_item_select() {
        const url = process.env.REACT_APP_NODEJS + "register_item_select";

        const options = {
            params: {
                key: getUser[0].department_key
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListItem(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }




    async function register_item_insert(item_code: string, item_name: string, item_source: string, dep_code: string, flag_code: string, emp_code: string, last_update: string) {



        const params = {
            item_code: item_code,
            item_name: item_name,
            item_source: item_source,
            dep_code: dep_code,
            flag_code: flag_code,
            emp_code: emp_code,
            last_update: last_update
        };


        axios
            .post(process.env.REACT_APP_NODEJS + "register_item_insert", params, {
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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#424242",
            color: '#FFF',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14, color: '#FFF',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#424242',


        },
        '&:nth-of-type(even)': {
            backgroundColor: '#424242',

        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,

        },
    }));

    useEffect(() => {
        flag_select();
        register_item_select();

    }, [])




    return (
        <>






            <Grid
                container
                spacing={2}
                alignItems="left"
            >
                <Grid xl={12} md={12}>
                    <Typography variant="h3" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                        Register Data Items
                    </Typography>
                </Grid>
            </Grid >


            <Box marginTop={'2rem'} borderRadius={'20px'} paddingBottom={'1rem'} >
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >
                    <Grid display="flex" justifyContent="left" alignItems="center" lg={2} xs={10}>
                        <TextField style={{ backgroundColor: '#e0e0e0', borderRadius: '20px' }} size="small" id="outlined-basic" variant="outlined" value={item} onChange={(e) => {
                            setItem(e.target.value)
                        }
                        } fullWidth label="Enter items" />
                    </Grid>
                    <Grid display="flex" justifyContent="left" alignItems="center" lg={2} xs={10}>
                        <TextField style={{ backgroundColor: '#e0e0e0', borderRadius: '20px' }} size="small" id="outlined-basic" variant="outlined" value={source} onChange={(e) => {
                            setSource(e.target.value)
                        }
                        } fullWidth label="Enter source" />
                    </Grid>

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={2} xs={10}>


                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '20px' }}>

                            <Select size="small"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={flag}
                                // label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {listFlag.map((data, index) => (
                                    <MenuItem key={data.flag_code} value={data.flag_code}>{data.flag_name}</MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                    </Grid >

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={1} xs={1}>
                        <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={btn_inset} style={{ background: '#E4E4E4', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', color: '#1F1F1F' }}>Register</Button>
                    </Grid>

                </Grid >
            </Box>


            <Grid
                container
                spacing={2}
                alignItems="left"
            >
                <Grid lg={6} xs={12}>
                    <Paper sx={{ overflow: 'hidden', borderRadius: '20px' }}>
                        <Table aria-label="customized table" >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">#</StyledTableCell>
                                    <StyledTableCell align="center">Items</StyledTableCell>
                                    <StyledTableCell align="center">Sourcce</StyledTableCell>
                                    <StyledTableCell align="center">Flag</StyledTableCell>
                                    <StyledTableCell align="center">EMP Code</StyledTableCell>
                                    <StyledTableCell align="center">Last Update</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listItem.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{index + 1 + "."}</StyledTableCell>
                                        <StyledTableCell>{row.item_name}</StyledTableCell>
                                        <StyledTableCell>{row.item_source}</StyledTableCell>
                                        <StyledTableCell>{row.flag_name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.emp_code}</StyledTableCell>
                                        <StyledTableCell align="center">{dayjs(row.last_update).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid >

        </>
    )
}

export default RegisterItemsPage