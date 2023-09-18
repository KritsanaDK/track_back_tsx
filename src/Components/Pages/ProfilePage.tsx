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

function ProfilePage() {

    const getUser = getUserInfo();
    if (!getUser) {
        window.location.href = 'Login';
    }


    const [listDep, setListDep] = useState<Department_Type[]>([]);
    const [listPosition, setListPosition] = useState<user_position_Type[]>([]);
    const [listTable, setListTable] = useState<Table_Type[]>([]);

    const [userName_new, setUserName_new] = useState("");
    const [firstName_new, setFirstName_new] = useState("");
    const [lastName_new, setLastName_new] = useState("");
    const [Password_new, setPassword_new] = useState("");
    const [depCode, setDepCode] = useState("");
    const [depName, setDepName] = useState("");
    const [positionCode, setPositionCode] = useState("");
    const [positionName, setPositionName] = useState("");

    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");

    const handleChange_a = (event: any) => {
        console.log(event.target.value)
        setDepCode(event.target.value);
        const temp = listDep.find(ojb => {
            return ojb.department_key === event.target.value;
        })
        setDepName(temp!.dep_name);
    };

    const handleChange_b = (event: any) => {
        console.log(event.target.value)
        const temp = listPosition.find(ojb => {
            return ojb.id === event.target.value;
        })
        console.log(temp)
        setPositionCode(event.target.value);
        setPositionName(temp!.item);

    };


    interface Department_Type {

        id: string;
        dep_name: string;
        fac_code: string;
        department_key: string;
    }

    interface user_position_Type {

        id: string;
        item: string;
    }

    interface Table_Type {

        EmpCode: string;
        Passwords: string;
        FirstName: string;
        LastName: string;
        UserPosition: string;
        department_id: string;
        department_key: string;
        item: string;
        dep_name: string;
        fac_code: string;
    }

    async function departments_select() {
        const url = process.env.REACT_APP_NODEJS + "departments_select";

        const options = {
            params: {

            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListDep(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });
    }


    async function user_position_select() {
        const url = process.env.REACT_APP_NODEJS + "user_position_select";

        const options = {
            params: {

            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListPosition(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }


    async function user_table_select(user_position: string, department_key: string) {
        const url = process.env.REACT_APP_NODEJS + "user_table_select";

        const options = {
            params: {
                user_position: user_position,
                department_key: department_key
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListTable(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }

    async function userinfo_insert(EmpCode: string, Passwords: string, FirstName: string, LastName: string, UserPosition: string, department_key: string) {
        const
            params = {
                EmpCode: EmpCode,
                Passwords: Passwords,
                FirstName: FirstName,
                LastName: LastName,
                UserPosition: UserPosition,
                department_key: department_key,

            };

        axios
            .post(process.env.REACT_APP_NODEJS + "userinfo_insert", params, {
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

    async function userinfo_delete(key: string) {

        const params = {
            key: key
        };

        console.log(params)

        await axios
            .post(process.env.REACT_APP_NODEJS + "userinfo_delete", params, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                // console.log(res.data);
            })

            .catch((err) => {
                console.log(err);
            });

    }

    async function userinfo_update(EmpCode: string, FirstName: string, LastName: string, Passwords: string) {

        const params = {
            EmpCode: EmpCode,
            FirstName: FirstName,
            LastName: LastName,
            Passwords: Passwords
        };

        console.log(params)

        await axios
            .post(process.env.REACT_APP_NODEJS + "userinfo_update", params, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                // console.log(res.data);
            })

            .catch((err) => {
                console.log(err);
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
        departments_select();
        user_position_select();
        user_table_select(getUser[0].UserPosition, getUser[0].department_key)

        setUserName(getUser[0].EmpCode);
        setFirstName(getUser[0].FirstName);
        setLastName(getUser[0].LastName);

    }, []);


    return (
        <>

            <Box>
                <Grid xl={12} md={12}>
                    <Typography variant="h3" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                        Profile
                    </Typography>
                </Grid>
            </Box>

            <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>User Name</b> </Grid>
                    <Grid xs={4}>
                        < TextField size="small" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} value={userName} onChange={(e) => {
                            setUserName(e.target.value);
                        }
                        } fullWidth disabled />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>First Name</b> </Grid>
                    <Grid xs={4}>
                        <TextField size="small" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} value={firstName} onChange={(e) => {
                            setFirstName(e.target.value)
                        }
                        } fullWidth />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>Last Name</b> </Grid>
                    <Grid xs={4}>
                        <TextField size="small" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} value={lastName} onChange={(e) => {
                            setLastName(e.target.value)
                        }
                        } fullWidth />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>Department</b> </Grid>
                    <Grid xs={4}>
                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>
                            <Select size="small"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={getUser[0].department_key}
                                // label="Age"
                                disabled
                                onChange={handleChange_b}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {listDep.map((data, index) => (
                                    <MenuItem key={data.department_key} value={data.department_key}>{data.dep_name + " : " + data.fac_code}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>Password</b> </Grid>
                    <Grid xs={4}>
                        <TextField size="small" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} type="password" value={Password} onChange={(e) => {
                            setPassword(e.target.value)
                        }
                        } fullWidth />
                    </Grid>

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={1} xs={1}>
                        <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {


                            userinfo_update(userName, firstName, lastName, Password);

                        }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem' }}>Update</Button>
                    </Grid>
                </Grid>
            </Box>

            <Box marginTop={'2rem'}>
                <Grid xl={12} md={12}>
                    <Typography variant="h4" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                        Create User
                    </Typography>
                </Grid>
            </Box>
            <Box marginTop={'0rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >
                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>User Name</b> </Grid>
                    <Grid xs={4}>
                        <TextField size="small" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} value={userName_new} onChange={(e) => {
                            setUserName_new(e.target.value);
                        }
                        } fullWidth />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>First Name</b> </Grid>
                    <Grid xs={4}>
                        <TextField size="small" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} value={firstName_new} onChange={(e) => {
                            setFirstName_new(e.target.value);
                        }
                        } fullWidth />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>Last Name</b> </Grid>
                    <Grid xs={4}>
                        <TextField size="small" variant="outlined" style={{ backgroundColor: '#e0e0e0', borderRadius: '3px' }} value={lastName_new} onChange={(e) => {
                            setLastName_new(e.target.value);
                        }
                        } fullWidth />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>Department</b> </Grid>
                    <Grid xs={4}>
                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                            <Select size="small"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={getUser[0].UserPosition == "0" ? depCode : getUser[0].department_key}

                                disabled={getUser[0].UserPosition == "0" ? false : true}
                                // label="Age"
                                onChange={handleChange_a}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {listDep.map((data, index) => (
                                    <MenuItem key={data.department_key} value={data.department_key}>{data.dep_name + " : " + data.fac_code}</MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid justifyContent="flex-start" alignItems="center" marginTop={'7px'} xs={1}>
                        <b>Position</b> </Grid>
                    <Grid xs={4}>
                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                            <Select size="small"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name={positionName}
                                value={positionCode}
                                // label="Age"
                                onChange={handleChange_b}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {listPosition.map((data, index) => (
                                    getUser[0].UserPosition <= data.id && <MenuItem key={data.id} value={data.id}>{data.item}</MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </Grid>

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={1} xs={1}>
                        <Button size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {

                            const temp = listDep.find(ojb => {
                                return ojb.department_key === (getUser[0].UserPosition == "0" ? depCode : getUser[0].department_key);
                            })


                            userinfo_insert(userName_new, "password", firstName_new, lastName_new, positionCode, getUser[0].UserPosition == "0" ? depCode : getUser[0].department_key)
                            setListTable([...listTable, {

                                EmpCode: userName_new,
                                Passwords: "",
                                FirstName: lastName_new,
                                LastName: lastName_new,
                                UserPosition: positionCode,
                                department_id: "",
                                department_key: getUser[0].UserPosition == "0" ? depCode : getUser[0].department_key,
                                item: positionName,
                                dep_name: temp!.dep_name,
                                fac_code: getUser[0].UserPosition == "0" ? depCode : getUser[0].department_key,
                            }]);
                        }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem' }}>Register</Button>
                    </Grid>
                </Grid>
            </Box>

            <Box marginTop={'2rem'}>
                <Grid xl={12} md={12}>
                    <Typography variant="h4" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                        User List
                    </Typography>
                </Grid>
            </Box>
            <Box marginTop={'1rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >
                    <Grid justifyContent="left" lg={10} xs={12} xsOffset={1}>

                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">User Nmae</StyledTableCell>
                                        <StyledTableCell align="center">First Name</StyledTableCell>
                                        <StyledTableCell align="center">Last Update</StyledTableCell>
                                        <StyledTableCell align="center">Department</StyledTableCell>
                                        <StyledTableCell align="center">Position</StyledTableCell>
                                        {getUser[0].UserPosition <= 1 && <StyledTableCell align="center">Action</StyledTableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listTable.map((row, index) => (
                                        getUser[0].EmpCode !== row.EmpCode && <TableRow
                                            key={row.EmpCode}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.EmpCode}</TableCell>
                                            <TableCell align="left">{row.FirstName}</TableCell>
                                            <TableCell align="left">{row.LastName}</TableCell>
                                            <TableCell align="center">{row.dep_name}</TableCell>
                                            <TableCell align="center">{row.item}
                                                {/* <FormControl fullWidth style={{ borderRadius: '20px' }}>
                                                    <Select size="small"
                                                        value={row.UserPosition === null ? "" : row.UserPosition}
                                                        // label="Age"
                                                        onChange={(e) => {
                                                            console.log(e.target)
                                                            let newTodos = listTable.map((item: any) => {
                                                                if (item.EmpCode === row.EmpCode) {
                                                                    return { ...item, UserPosition: e.target.value };
                                                                }
                                                                return item;
                                                            });
                                                            setListTable(newTodos);
                                                            // console.log(listCompaint);
                                                        }}

                                                    >
                                                        <MenuItem value=""><em>None</em></MenuItem>
                                                        {listPosition.map((data) => (
                                                            getUser[0].UserPosition <= data.id && <MenuItem key={randomstring.generate(100).toUpperCase()} value={data.id}>{data.item}</MenuItem>
                                                        ))}
                                                    </Select>

                                                </FormControl> */}
                                            </TableCell>
                                            {getUser[0].UserPosition <= 1 && <TableCell align="center">
                                                {/* <Button size="large" variant="contained" onClick={() => {

                                                }} style={{ background: '#E4E4E4', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', color: '#000', marginRight: '1rem' }}>EDIT</Button> */}

                                                <Button size="large" variant="contained" onClick={() => {

                                                    userinfo_delete(row.EmpCode);

                                                    setListTable((current) =>
                                                        current.filter((x) => x.EmpCode !== row.EmpCode)
                                                    );

                                                }} style={{ background: '#d50000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', color: '#FFF' }}>DELETE</Button>

                                            </TableCell>}

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default ProfilePage