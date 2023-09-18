import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LinearProgress, TableFooter, colors } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as randomstring from "randomstring";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TablePagination from "@mui/material/TablePagination";


function getUserInfo() {
    const tokenString = sessionStorage.getItem('json');
    const userToken = JSON.parse(tokenString!);
    return userToken
}


function NewRecPage() {



    const getUser = getUserInfo();
    if (!getUser) {
        window.location.href = 'Login';
    }


    // const [userInfo] = useLocalStorage("json", []);
    const key = JSON.parse(sessionStorage.getItem('key')!);
    const json = JSON.parse(sessionStorage.getItem('json')!);
    const [pathName] = useState(
        window.location.pathname.replace("/", "")
    );
    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get("Mode");
    // console.log(mode)


    const [listMethod, setListMethod] = useState<Method_Type[]>([]);
    const [methodId, setMethodId] = useState("");
    const [qcsNo, setQcsNo] = useState("");
    const [tb_key, setTb_key] = useState("");
    const [flagFind, setFlagFind] = useState(false);


    const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));

    const [listKla, setListKla] = useState<Kla_Type[]>([]);
    const [listKlb, setListKlb] = useState<Klb_Type[]>([]);
    const [listKlc, setListKlc] = useState<Klc_Type[]>([]);
    const [listCompaint, setListCompaint] = useState<Complaint_record_Type[]>([]);
    const [listIns, setListIns] = useState<Ins_Type[]>([]);
    const [klaCode, setKlaCode] = useState<string>("");
    const [klbCode, setKlbCode] = useState<string>("");
    const [klcCode, setKlcCode] = useState<string>("");

    const [listFlag, setListFlag] = useState<Flag_Type[]>([]);

    const [listResult, setListResult] = useState<Result_Type[]>([]);

    const [listCompaintEditView, setListCompaintEditView] = useState<complaint_record_info_Type[]>([]);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const handleChange_a = async (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setKlaCode(event.target.value);

        setListKlb([]);
        setListKlc([]);

        klb_select(event.target.value);
    };

    const handleChange_b = async (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setKlbCode(event.target.value);

        setListKlc([]);
        klc_select(event.target.value);
    };

    const handleChange_c = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setKlcCode(event.target.value);


        // console.log(userInfo[0].department_key);
        // console.log(klaCode);
        // console.log(klbCode);


        complaint_record_select(getUser[0].department_key, klaCode, klbCode);
        // console.log(temp);

        // setListKlc([]);

        // klc_select(event.target.value);
    };


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    interface Flag_Type {
        flag_code: string;
        flag_name: string;
        dep_code: string;
    }

    interface Kla_Type {

        kla_code: string;
        kla_name: string;
        dep_code: string;
    }

    interface Klb_Type {

        klb_code: string;
        klb_name: string;
        dep_code: string;
        kla_code: string;
    }

    interface Klc_Type {

        klc_code: string;
        klc_name: string;
        dep_code: string;
        kla_code: string;
        klb_code: string;
    }


    //auto vs manual
    interface Method_Type {

        id: string;
        method: string;
    }

    interface Ins_Type {

        ins_no: string;
        part_name: string;
        prd_date: string;
        prd_lot: string;
        k_serial: string;
    }


    interface Result_Type {
        result_code: string;
        result_name: string;
        result_value: number;
        dep_code: string;
    }


    interface Complaint_record_Type {

        slt: number;
        item_name: string;
        item_source: string;
        rate: string;
        eff: string;
        item_code: string;
        result_code: string;
        dep_code: string;
        kla_code: string;
        kla_name: string;
        klb_code: string;
        klc_name: string;
        k_mode: number;

    }




    interface complaint_record_info_Type {

        complaint_code: string;
        ins_no: string;
        prd_lot: string;
        part_name: string;
        k_serial: string;
        prd_date: string;
        qcs_no: string;
        kla_code: string;
        kla_name: string;
        klb_code: string;
        klb_name: string;
        klc_code: string;
        klc_name: string;
        k_mode: string;
        method_id: string;
        method_value: string;
        emp_code: string;
        last_update: string;
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

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });



    async function identify_method_select() {
        const url = process.env.REACT_APP_NODEJS + "identify_method_select";

        const options = {
            params: {

            }
        };

        await axios.get(url, options).then((response) => {
            // handle success
            // console.log(response.data);
            setListMethod(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }

    async function kla_select() {
        const url = process.env.REACT_APP_NODEJS + "kla_select";

        const options = {
            params: {
                key: getUser[0].department_key
            }
        };
        await axios.get(url, options).then((response) => {
            setListKla(response.data);
        }).catch((error) => {
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

        await axios.get(url, options).then((response) => {
            setListKlb(response.data);
        }).catch((error) => {
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

        await axios.get(url, options).then((response) => {
            setListKlc(response.data);
        }).catch((error) => {
            // handle errors
        });


    }

    async function ins_record_select(key: string, mode: string, fac_code: string) {
        const url = process.env.REACT_APP_NODEJS + "ins_record_select";
        setFlagFind(true);

        const options = {
            params: {
                key: key,
                mode: mode,
                fac_code: fac_code,
            }
        };

        await axios.get(url, options).then((response) => {
            setListIns(response.data);
            setFlagFind(false);
        }).catch((error) => {
            // handle errors
        });


    }


    function complaint_record_info_with_compaint_code(dep_code: string, complaint_code: string) {
        const url = process.env.REACT_APP_NODEJS + "complaint_record_info_with_compaint_code";

        // console.log(dep_code)
        // console.log(complaint_code)

        const options = {
            params: {
                dep_code: dep_code,
                complaint_code: complaint_code,
            }
        };

        axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListCompaintEditView(response.data);

            setMethodId(response.data[0].method_id);
            setTb_key(response.data[0].method_value);
            setQcsNo(response.data[0].qcs_no);
            setKlaCode(response.data[0].kla_code);


            return response.data[0];

            // console.log(listKla);
        }).then((response) => {
            // ins_record_select(tb_key, methodId);
            console.log(response)
            ins_record_select(response.method_value, response.method_id, getUser[0].fac_code);

            klb_select(response.kla_code)
            setKlbCode(response.klb_code)

            return response;

        }).then((response) => {
            klc_select(response.klb_code)
            setKlcCode(response.klc_code)
            return response;

        }).then((response) => {
            // complaint_record_select(userInfo[0].department_key, klaCode, klbCode);
            console.log(response)
            complaint_record_select_with_comapint_code(getUser[0].department_key, response.kla_code, response.klb_code, key[0].key);

            return response;

        }).then((response) => {
            // complaint_record_select_with_comapint_code(userInfo[0].department_key, response.kla, response.klb, key[0].key);
        })
            .catch((error) => {
                // handle errors
            });

        // const promise = axios.get(url, options)
        // const dataPromise = promise.then((response) => response.data)
        // return dataPromise




    }





    async function complaint_record_insert(complaint_code: string, kla_code: string, klb_code: string, klc_code: string, slt: string, item_code: string, result_code: string, dep_code: string, k_mode: string, method_id: string, method_value: string, emp_code: string, last_update: string) {



        const params = {
            complaint_code: complaint_code,
            kla_code: kla_code,
            klb_code: klb_code,
            klc_code: klc_code,
            slt: slt,
            item_code: item_code,
            result_code: result_code,
            dep_code: dep_code,
            k_mode: k_mode,
            method_id: method_id,
            method_value: method_value,
            emp_code: emp_code,
            last_update: last_update

        };


        await axios
            .post(process.env.REACT_APP_NODEJS + "complaint_record_insert", params, {
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




    async function complaint_record_info_insert(complaint_code: string, ins_no: string, prd_lot: string, part_name: string, serial: string, prd_date: string, qcs_no: string, kla_code: string, klb_code: string, klc_code: string, k_mode: string, dep_code: string, method_id: string, method_value: string, emp_code: string, last_update: string) {



        const params = {
            complaint_code: complaint_code,
            ins_no: ins_no,
            prd_lot: prd_lot,
            part_name: part_name,
            serial: serial,
            prd_date: prd_date,
            qcs_no: qcs_no,
            kla_code: kla_code,
            klb_code: klb_code,
            klc_code: klc_code,
            k_mode: k_mode,
            dep_code: dep_code,
            method_id: method_id,
            method_value: method_value,
            emp_code: emp_code,
            last_update: last_update
        };

        console.log(params)



        await axios
            .post(process.env.REACT_APP_NODEJS + "complaint_record_info_insert", params, {
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



    function Save(Mode: string) {
        let k_key = key[0].key;
        let k_kla_code = klaCode;
        let k_klb_code = klbCode;
        let k_klc_code = klcCode;
        let k_method_id = methodId;
        let k_method_value = tb_key;
        let k_pic = getUser[0].EmpCode;
        let k_last_update = dayjs(new Date).format('YYYY-MM-DD HH:mm:ss');

        console.log(k_pic);
        console.log(k_last_update);

        {
            listCompaint.map((item) => {

                let k_slt = item.slt === 1 ? "1" : "0";
                if (k_slt !== "2") {
                    let k_item_code = item.item_code;
                    let k_result_code = item.result_code === null ? "" : item.result_code;

                    // console.log("k_result_code")
                    // console.log(k_result_code)
                    complaint_record_insert(k_key, k_kla_code, k_klb_code, k_klc_code, k_slt, k_item_code, k_result_code, getUser[0].department_key, Mode, k_method_id, k_method_value, k_pic, k_last_update)
                }

            })
        }


        // let k_key = key[0].key;
        console.log(listIns)
        let k_ins_no = listIns.length == 0 ? "" : listIns[0].ins_no;
        let k_prd_lot = listIns.length == 0 ? "" : listIns[0].prd_lot;
        let k_part_name = listIns.length == 0 ? "" : listIns[0].part_name;
        let k_serial = listIns.length == 0 ? "" : listIns[0].k_serial;
        let k_prd_date = listIns.length == 0 ? dayjs(new Date()).format('YYYY-MM-DD') : dayjs(listIns[0].prd_date).format('YYYY-MM-DD');
        let k_qcsNo = qcsNo;
        // let k_kla = klaCode;
        // let k_klb = klbCode;
        // let k_klc = klcCode;
        console.log(methodId)


        complaint_record_info_insert(k_key, k_ins_no, k_prd_lot, k_part_name, k_serial, k_prd_date, k_qcsNo, k_kla_code, k_klb_code, k_klc_code, Mode, getUser[0].department_key, methodId, tb_key, k_pic, k_last_update);
    }




    async function complaint_record_select(dep_code: string, kla_code: string, klb_code: string) {
        const url = process.env.REACT_APP_NODEJS + "complaint_record_select";

        const options = {
            params: {
                dep_code: dep_code,
                kla_code: kla_code,
                klb_code: klb_code,
            }
        };

        await axios.get(url, options).then((response) => {
            // handle success
            // console.log(response.data);
            setListCompaint(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }

    // async function flag_select() {
    //     const url = process.env.REACT_APP_NODEJS + "flag_select";

    //     const options = {
    //         params: {
    //             key: getUser[0].department_key
    //         }
    //     };

    //     await axios.get(url, options).then((response) => {
    //         // handle success
    //         // console.log(response.data);
    //         setListFlag(response.data);

    //         // console.log(listKla);
    //     })
    //         .catch((error) => {
    //             // handle errors
    //         });


    // }

    async function result_select() {
        const url = process.env.REACT_APP_NODEJS + "result_select";

        const options = {
            params: {
                key: getUser[0].department_key
            }
        };

        await axios.get(url, options).then((response) => {
            // handle success
            console.log(response.data);
            setListResult(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }

    async function complaint_record_select_with_comapint_code(dep_code: string, kla_code: string, klb_code: string, complaint_code: string) {
        const url = process.env.REACT_APP_NODEJS + "complaint_record_select_with_comapint_code";

        const options = {
            params: {
                dep_code: dep_code,
                kla_code: kla_code,
                klb_code: klb_code,
                complaint_code: complaint_code,
            }
        };

        await axios.get(url, options).then((response) => {
            // handle success
            // console.log(response.data);
            setListCompaint(response.data);

            // console.log(listKla);
        })
            .catch((error) => {
                // handle errors
            });


    }





    const handleChange = (event: SelectChangeEvent) => {
        // console.log(event.target.value)
        setTb_key("")
        setMethodId(event.target.value);

    };

    useEffect(() => {
        console.log("useEffect");
        identify_method_select();

        result_select();
        // console.log()


        let getData = async () => {
            kla_select();
        }

        getData();

        console.log(mode)

        if (mode !== "New") {
            // console.log("Edit");


            console.log(getUser[0].department_key);
            console.log(key[0].key)


            complaint_record_info_with_compaint_code(getUser[0].department_key, key[0].key);
        }



    }, []);







    return (
        <>


            <Grid xl={6} md={6}>
                <Typography variant="h3" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
                    Complaint Record : {mode}
                </Typography>
                {flagFind && <LinearProgress color="secondary" />}
            </Grid>

            <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid alignItems="center" marginTop={'7px'} xs={1.2} justifyContent="right" display="flex">
                        <b>Identify method :</b> </Grid>

                    <Grid justifyContent="left" lg={5} xs={12}>

                        <Grid>
                            <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                                <Select size="small" disabled={mode === "View" ? true : false}
                                    value={methodId}
                                    // label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="0"><em>None</em></MenuItem>
                                    {listMethod.map((data, index) => (
                                        <MenuItem key={data.id} value={data.id}>{data.method}</MenuItem>
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
                    <Grid lg={5} xs={12} xsOffset={1.2}>
                        {methodId != "4" && <Grid>
                            <TextField style={{ backgroundColor: '#e0e0e0', borderRadius: '0.2rem' }} size="small" id="outlined-basic" variant="outlined" value={tb_key} onChange={(e) => {

                                setTb_key(e.target.value)

                            }
                            } fullWidth disabled={mode === "View" ? true : false} />
                        </Grid>
                        }
                        {methodId == "4" && <Grid >

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker format="YYYY-MM-DD" slotProps={{ textField: { fullWidth: true, } }} sx={{ background: '#FFF', borderRadius: '0.2rem' }}
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);

                                        // console.log(dayjs(newValue).format('YYYY-MM-DD'))


                                        setTb_key(dayjs(newValue).format('YYYY-MM-DD'));


                                    }}
                                />
                            </LocalizationProvider>

                        </Grid>}
                    </Grid>

                    <Grid lg={1} xs={1} display="flex" alignItems="center"  >
                        {mode !== "View" && <Button fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} disabled={flagFind} onClick={async () => {

                            console.log(tb_key)

                            if (tb_key !== "" && methodId !== "") {
                                ins_record_select(tb_key, methodId, getUser[0].fac_code);
                            }


                        }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', }} >Search</Button>}
                    </Grid>



                </Grid>

                <Grid
                    container
                    spacing={2}
                >
                    <Grid justifyContent="left" lg={6.2} xs={24} xsOffset={1.2}>

                        <Grid>
                            <Paper>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow >
                                                <StyledTableCell align="center">Inspection</StyledTableCell>
                                                <StyledTableCell align="center">PRD Lot</StyledTableCell>
                                                <StyledTableCell align="center">Serial	</StyledTableCell>
                                                <StyledTableCell align="center">Part Name</StyledTableCell>
                                                <StyledTableCell align="center">PRD Date</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listIns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                                <TableRow
                                                    key={randomstring.generate(100).toUpperCase()}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    tabIndex={-1}
                                                >
                                                    <TableCell align="left">{row.ins_no}</TableCell>
                                                    <TableCell align="left">{row.prd_lot}</TableCell>
                                                    <TableCell align="left">{row.k_serial}</TableCell>
                                                    <TableCell align="left">{row.part_name}</TableCell>
                                                    <TableCell align="left">{dayjs(row.prd_date).format('YYYY-MM-DD')}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>

                                        </TableFooter>


                                    </Table>
                                </TableContainer>
                                <TablePagination style={{ justifyContent: "end" }}
                                    count={listIns.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>








            </Box >


            <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} sx={{ backgroundColor: '#424242' }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >

                    <Grid alignItems="center" marginTop={'7px'} xs={1.2} justifyContent="right" display="flex">
                        <b>QCS No :</b> </Grid>

                    <Grid justifyContent="left" lg={5} xs={12}>

                        <Grid>
                            <TextField style={{ backgroundColor: '#e0e0e0', borderRadius: '0.2rem' }} size="small" id="outlined-basic" variant="outlined" value={qcsNo} onChange={(e) => {
                                setQcsNo(e.target.value)
                            }
                            } fullWidth disabled={mode === "View" ? true : false} />
                        </Grid>
                    </Grid>



                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="left"
                >
                    <Grid display="flex" justifyContent="flex-end" alignItems="center" lg={1.2} xs={1.2}>
                        <b className="fontColor" >Type : </b>
                    </Grid >

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={5} xs={12}>


                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                            <Select size="small"
                                value={klaCode}
                                // label="Age"
                                onChange={handleChange_a}
                                disabled={mode === "View" ? true : false}>
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
                    <Grid display="flex" justifyContent="flex-end" alignItems="center" lg={1.2} xs={1.2}>
                        <b className="fontColor" >Phenomenon : </b>
                    </Grid >

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={5} xs={12}>


                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem' }}>

                            <Select size="small"
                                value={klbCode}
                                // label="Age"
                                onChange={handleChange_b}
                                disabled={mode === "View" ? true : false}>
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
                    <Grid display="flex" justifyContent="flex-end" alignItems="center" lg={1.2} xs={1.2}>
                        <b className="fontColor" >Symptom : </b>
                    </Grid >

                    <Grid display="flex" justifyContent="left" alignItems="center" lg={5} xs={12}>


                        <FormControl fullWidth className="tb_dark" style={{ borderRadius: '0.2rem', }}>

                            <Select size="small"
                                value={klcCode}
                                // label="Age"
                                onChange={handleChange_c}
                                disabled={mode === "View" ? true : false}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                {listKlc.map((data, index) => (
                                    <MenuItem key={data.klc_code} value={data.klc_code}>{data.klc_name}</MenuItem>
                                ))}
                            </Select>

                        </FormControl>


                    </Grid >
                    {/* 
                    <Grid lg={1.8} xs={1.8} display="flex" alignItems="center"  >
                        <Button disabled={mode === "View" ? true : false} fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => { }} style={{ background: '#000000', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', }}>Collect Data</Button>
                    </Grid> */}



                </Grid>

                <Grid
                    container
                    spacing={2}
                >
                    <Grid justifyContent="left" lg={7} xs={24} xsOffset={1.2}>

                        <Grid>



                            <TableContainer component={Paper} >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow >
                                            <StyledTableCell align="center">Select</StyledTableCell>
                                            <StyledTableCell align="center">Items</StyledTableCell>
                                            <StyledTableCell align="center">Sources</StyledTableCell>
                                            <StyledTableCell align="center">Using rate</StyledTableCell>
                                            <StyledTableCell align="center">Effective</StyledTableCell>
                                            <StyledTableCell align="center">Results</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listCompaint.map((row) => (
                                            <TableRow
                                                key={row.item_code}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">
                                                    <Checkbox disabled={mode === "View" ? true : false}
                                                        checked={row.slt === 0 ? false : true}
                                                        onChange={(e) => {
                                                            console.log(e.target.checked)



                                                            // // setListCompaint(...listCompaint[index], [{ slt: e.target.checked }]);
                                                            let newTodos = listCompaint.map((item) => {
                                                                if (item.item_code === row.item_code) {
                                                                    return { ...item, slt: e.target.checked === true ? 1 : 0 };
                                                                }
                                                                return item;
                                                            });

                                                            setListCompaint(newTodos);

                                                            console.log(listCompaint);


                                                        }}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </TableCell>



                                                <TableCell align="left">{row.item_name}</TableCell>
                                                <TableCell align="left">{row.item_source}</TableCell>
                                                <TableCell align="right">{row.rate}%</TableCell>
                                                <TableCell align="right">{row.eff}%</TableCell>
                                                <TableCell align="center" style={{ minWidth: "150px" }}>

                                                    <FormControl fullWidth style={{ borderRadius: '20px' }}>

                                                        <Select size="small"

                                                            disabled={row.slt === 0 || mode === "View" ? true : false}

                                                            value={row.result_code === null ? "" : row.result_code}
                                                            name={row.item_code}
                                                            // label="Age"
                                                            onChange={(e) => {
                                                                console.log(e.target)



                                                                let newTodos = listCompaint.map((item) => {
                                                                    if (item.item_code === row.item_code) {
                                                                        return { ...item, result_code: e.target.value };
                                                                    }
                                                                    return item;
                                                                });

                                                                setListCompaint(newTodos);
                                                                console.log(listCompaint);

                                                            }}

                                                        >
                                                            <MenuItem value=""><em>None</em></MenuItem>
                                                            {listResult.map((data) => (
                                                                <MenuItem key={randomstring.generate(100).toUpperCase()} value={data.result_code}>{data.result_name}</MenuItem>
                                                            ))}
                                                        </Select>

                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>



                        </Grid>
                    </Grid>
                </Grid>
            </Box >

            {
                mode !== "View" && <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} >
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        <Grid>
                            <Button fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {
                                Save("0");
                                window.location.href = 'ComplaintList';
                            }} style={{ background: '#E4E4E4', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', color: '#000' }}>Draft save </Button>
                        </Grid>

                        <Grid>
                            <Button fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {
                                Save("1");
                                window.location.href = 'ComplaintList';
                            }} style={{ background: '#E4E4E4', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', color: '#000' }}>Complete data </Button>
                        </Grid>
                    </Grid>
                </Box>
            }


            {
                mode === "View" && <Box marginTop={'2rem'} borderRadius={'20px'} padding={'1rem'} >
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent={"center"}
                    >


                        <Grid>
                            <Button fullWidth size="large" variant="contained" sx={{ borderRadius: 28 }} onClick={() => {
                                window.location.href = 'ComplaintList';
                            }} style={{ background: '#E4E4E4', fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', color: '#000' }}>Back</Button>
                        </Grid>
                    </Grid>
                </Box>
            }


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default NewRecPage