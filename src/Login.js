import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Logo from "./assets/logo.png";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import "./login.css";
import api from "./api/api";
import { setLoggedInUser } from "./redux/slices/UsersSlice";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };
  const fetchAminDetails = async (id) =>{
    try{
        const response = await api.get(`/user/${id}`)
        dispatch(setLoggedInUser(response.data))
    }catch(error){

    }
  }

  const handleLogin = async () => {
    if (validateForm()) {
      const loginData = {
        email: email,
        password: password,
      };

      try {
        const response = await api.post("/auth/authenticate", loginData);
        if (response.data.message === "Successful") {
            fetchAminDetails(response.data.id)
          if (response.data.role === "ADMIN") {
            onLogin();
          } else {
            setEmailError("Only Admins are allowed");
          }
        } else {
          setPasswordError(response.data.message);
        }
        
      } catch (error) {
        // Handle login error
      }
    }
  };

  const buttonStyle = {
    fontFamily: "Open Sans, sans-serif",
    backgroundColor: "#179CBD",
    borderRadius: "15px",
    textTransform: "none",
    marginTop: "10px",

    // backgroundColor: "#179CBD", borderRadius: "5px", textTransform:"none"
    // Additional styles for your Open Sans text
  };

  return (
    <div className="login-gome">
      <div className="home-content">
        <div className="logo">
          <img src={Logo} alt="Logo" className="log-img" />
        </div>
        <div className="login-form">
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            className="input"
            fullWidth
            size="small"
            style={{ marginTop: "30px", fontFamily: "Open Sans" }}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <Email style={{ color: "#179CBD" }} />,
              style: { borderRadius: "20px", fontFamily: "Open Sans" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#179CBD",
                  fontFamily: "Open Sans",
                },
              },
            }}
            error={Boolean(emailError)}
            helperText={emailError}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "30px", fontFamily: "Open Sans" }}
            InputProps={{
              startAdornment: <Lock style={{ color: "#179CBD" }} />,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? (
                      <VisibilityOff style={{ color: "#179CBD" }} />
                    ) : (
                      <Visibility style={{ color: "#179CBD" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderRadius: "20px", fontFamily: "Open Sans" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#179CBD",
                  fontFamily: "Open Sans",
                },
              },
            }}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />

          <Button
            variant="contained"
            style={buttonStyle}
            fullWidth
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
