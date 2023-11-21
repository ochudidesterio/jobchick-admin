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
import { useTranslation } from 'react-i18next';
import './rtl.css'


const Login = ({ onLogin}) => {
  const { t } = useTranslation();
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
      setEmailError(t('emailisrequired'));
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError(t('passwordisrequired'));
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
          if (response.data.role === "SUPERADMIN" || response.data.role === "ADMIN") {
            onLogin();
          } else {
            setEmailError(t('onlyadminsareallowed'));
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
           label={t('email')}

            variant="outlined"
            value={email}
            className="input"
            fullWidth
            size="small"
            style={{ marginTop: "30px", fontFamily: "Open Sans" }}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <Email style={{ color: "#179CBD" }} />,
              endAdornment: (
                <InputAdornment position="end">
                 
                </InputAdornment>
              ),
              style: { borderRadius: "10px", fontFamily: "Open Sans" },
            }}

            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#179CBD",
                  fontFamily: "Open Sans",
                  textAlign:"right"
                },
              },
              
            }}
               InputLabelProps={{
              style: {
                transform: "right",
                left: "unset",
                right: "1.20rem",
                fontSize: "Medium",
                
                overflow: "unset",
                
              },
            }}
            

            error={Boolean(emailError)}
            helperText={emailError}
            dir = "rtl"

          />

          <TextField
            label={t('password')}

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
              style: { borderRadius: "10px", fontFamily: "Open Sans" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#179CBD",
                  fontFamily: "Open Sans",
                  textAlign:"right"
                },
              },
            }}

            InputLabelProps={{
              style: {
                 transform: "right",
                left: "unset",
                right: "1.20rem",
                fontSize: "Medium",
                overflow: "unset",
                backgroundColor: "white", 
              },
            }}
            error={Boolean(passwordError)}
            helperText={passwordError}
            dir = "rtl"

          />

          <Button
            variant="contained"
            style={buttonStyle}
            fullWidth
            color="primary"
            onClick={handleLogin}
          >
            {t('login')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
