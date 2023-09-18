import React, { useState } from "react";
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
import swal from 'sweetalert';
type Props = {}

const LogInPage = (props: Props) => {

    const [logIn, setLogIn] = useState(false);

    const validationSchema = Yup.object().shape({
        tb_username: Yup.string()
            .required("Username is required")
            .min(4, "Username must be at least 4 characters")
            .max(12, "Username must not exceed 12 characters"),
        tb_password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const onSubmit = async (e: any) => {


        let user = e.tb_username;
        let pass = e.tb_password;

        const param = { user: user, pass: pass };
        // console.log(param);



        axios
            .post(process.env.REACT_APP_NODEJS + "logIn", param, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if ('accessToken' in res) {
                    console.log(res)
                }
                return res.data;
            })
            .then((json) => {
                // console.log(json);

                if (json.length === 1) {
                    setLogIn(false);
                    let json_data = JSON.stringify(json, null, 2);
                    // console.log(json_data);



                    // localStorage.setItem("json", json);
                    sessionStorage.setItem("json", json_data);
                    window.location.href = 'ComplaintList';

                } else {
                    setLogIn(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });


    };

    return (
        <>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '80vh' }}

            >
                <Grid xl={4} md={12}>
                    <Card>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <CardContent>
                                <Grid style={{ textAlign: "center" }}>
                                    <Typography component="h4" variant="h5">
                                        <b>Quality Data Trace back System</b>
                                    </Typography>
                                </Grid>

                                <Grid style={{ textAlign: "left" }}>
                                    <TextField
                                        required
                                        id="tb_username"
                                        label="User Name"
                                        fullWidth

                                        margin="dense"
                                        {...register("tb_username")}
                                        error={errors.tb_username ? true : false}
                                        inputProps={{
                                            maxLength: 12,
                                        }}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.tb_username?.message}
                                    </Typography>
                                </Grid>

                                <Grid style={{ textAlign: "left" }}>
                                    <TextField
                                        required
                                        id="tb_password"
                                        label="Password"
                                        type="password"
                                        fullWidth

                                        margin="dense"
                                        {...register("tb_password")}
                                        error={errors.tb_password ? true : false}
                                    // value={"Password12346"}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.tb_password?.message}
                                    </Typography>
                                </Grid>

                                <Grid style={{ textAlign: "center", paddingTop: '0.5rem' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{ borderRadius: 28 }}
                                        style={{ background: '#212121', }}
                                    >
                                        <b>Login</b>
                                    </Button>
                                </Grid>



                                {logIn && (
                                    <Grid style={{ textAlign: "center" }}>
                                        <Typography variant="inherit" color="error">
                                            Login fail
                                        </Typography>
                                    </Grid>
                                )}
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid >

        </>
    )
}

export default LogInPage