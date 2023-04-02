import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setAuth, setForm } from "../../store/action/action";
//css
import "../assets/css/login.css";
// images
import logIn from "../assets/image/log/login.svg";
import signUp from "../assets/image/log/signup.svg";

// APIs
import { register, login } from '../../service/service'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const Login = () => {

  // redux
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state);

  const [data, setData] = useState({})

  function handleClose() {
    dispatch(
      setForm({
        state: false,
        formType: null,
      })
    );
  }

  function handleChange(e) {
    setData(old => ({...old,
      [e.target.name]: e.target.value
    }))
  }


  async function handleLogIn(e) {
    try {
      e.preventDefault();

      const FD = new FormData();

      FD.append('email',data.email);
      FD.append('password',data.password);

      let res = await login(FD)

      if (res.status === 200) {
        dispatch(setAuth({
          isAuth : true,
          name : res.data.username,
          email : res.data.email,
          token : res.data.token,
        }))
        handleClose();
        dispatch(setAlert({
          open: true,
          variant: 'success',
          message: res.data.message || 'Logged In Successfully.'
        }))
      }
      else{
        dispatch(setAlert({
          open: true,
          variant: 'warning',
          message: "Incorrect Credentials "
        }))

      }
    } catch (error) {
      dispatch(setAlert(
        {
          open: true,
          message: 'Something Went Wrong !!!',
          variant: 'error'
        }
      ))
    }

  }


  async function handleSignUp(e) {
    try {
      e.preventDefault();

      const FD = new FormData();

      FD.append('username',data.username);
      FD.append('email',data.email);
      FD.append('password',data.password);

      let res = await register(FD)
      
      if (res.status === 200) {
        handleClose();
        dispatch(setAlert({
          open: true,
          variant: 'success',
          message: "User Registered Successfully !!!"
        }))
      }
    } catch (error) {
      dispatch(setAlert(
        {
          open: true,
          message: 'Something Went Wrong !!!',
          variant: 'error'
        }
      ))
    }

  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={form.state}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={form.state}>
        <Box sx={style}>
          {form.formType === "LogIn" ? (
            <Grid container className="logContainer">
              <Grid item xs={6}>
                <img src={logIn} alt={"Log In"} />
              </Grid>
              <Grid
                item
                xs={6}
                component="form"
                method="post"
                onSubmit={handleLogIn}
                encType="multipart/form-data"
              >
                <Box>
                  <center>
                    <Typography variant="h6">Log In</Typography>
                    <Typography variant="caption">
                      Hey, please log in first.
                    </Typography>
                  </center>
                </Box>
                <TextField
                  size="small"
                  name="email"
                  required
                  onChange={handleChange}
                  value={data.email || ""}
                  label="Email"
                  type="email"
                />
                <TextField
                  size="small"
                  name="password"
                  value={data.password || ''}
                  label="Password"
                  onChange={handleChange}
                  type="password"
                />
                <Button variant="contained" type = 'submit' size="small">
                  Log In
                </Button>
                <Typography variant="caption">Or</Typography>
                <Typography
                  component={Button}
                  onClick={() =>
                    dispatch(
                      setForm({
                        state: true,
                        formType: "signUp",
                      })
                    )
                  }
                  variant="caption"
                >
                  Do not have an account?
                </Typography>
              </Grid>
            </Grid>
          ) : (
            // signup ===================

            <Grid container className="logContainer signup">
              <Grid item xs={6}>
                <img src={signUp} alt={"Log In"} />
              </Grid>
              <Grid
                item
                xs={6}
                component="form"
                method="post"
                onSubmit={handleSignUp}
                encType = 'multipart/form-data'
              >
                <Box>
                  <center>
                    <Typography variant="h6">Sign Up</Typography>
                    <Typography variant="caption">
                      Your details are secure with us.
                    </Typography>
                  </center>
                </Box>
                <TextField
                  size="small"
                  name="username"
                  label="UserName"
                  required
                  value={data.username || ''}
                  onChange={handleChange}
                  type="text"
                />
                <TextField
                  required
                  size="small"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={data.email || ''}
                  type="email"
                />
                <TextField
                  required
                  size="small"
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  value={data.password || ''}
                  type="password"
                />
                <Button variant="contained" type= 'submit' size="small">
                  Sign Up
                </Button>
                <Typography variant="caption">Or</Typography>
                <Typography
                  component={Button}
                  onClick={() =>
                    dispatch(
                      setForm({
                        state: true,
                        formType: "LogIn",
                      })
                    )
                  }
                  variant="caption"
                >
                  Have an account?
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default Login;
