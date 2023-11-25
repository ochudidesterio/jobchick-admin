import React from 'react'
import TextField from "@mui/material/TextField";


const CustomInput = ({label,placeholder,name,value,onChange}) => {
  return (
    <TextField
              fullWidth
              label={label}
              placeholder={placeholder}
              margin="normal"
              name={name}
              size="small"
              value={value}
              onChange={onChange}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#179CBD",
                    fontFamily: "Open Sans",
                    textAlign: "right",
                  },
                  "&:hover fieldset": {
                    borderColor: "#179CBD", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#179CBD", // Border color when focused
                    color: "#179CBD", // Text color when focused
                  },
                },
              }}
            />
  )
}

export default CustomInput