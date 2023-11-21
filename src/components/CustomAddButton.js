import React from "react";
import { Button } from "@mui/material";

const CustomAddButton = ({onClick, name }) => {
    const buttonStyle = {
        fontFamily: 'Open Sans, sans-serif',
        backgroundColor: '#178C9B',
        borderRadius: "5px",
        textTransform:"none",
        
        
        // backgroundColor: "#179CBD", borderRadius: "5px", textTransform:"none"
        // Additional styles for your Open Sans text
      };
  return (
    <Button
      type="submit"
      onClick={onClick}
      variant="contained"
      size="medium"
      
      style={buttonStyle}
    >
      {name}
    </Button>
  );
};

export default CustomAddButton;
