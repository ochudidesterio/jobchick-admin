import React,{useState} from 'react'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CustomInput from '../../components/CustomInput';
import api from '../../api/api';
import { showErrorToast, showSuccessToast } from '../../Constants/Toasts';

const ChangePasswordView = ({user}) => {
     //update  password
   const [updateData, setUpdateData] = useState({
    password: "",
  });
  const handleChangePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  const handleChangePassword =(e)=>{
    e.preventDefault()
    api.post(`/reset/${user.email}/password/${updateData.password}`)
    .then((res)=>{
      if(res.data === "changed"){
        showSuccessToast("Successfull")
        setUpdateData({
          password:""
        })
      }else{
        showErrorToast("failed")
      }
    }).catch(e=>console.log(e))
  }
  return (
   
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}>
            <Box sx={{ width: 400, p: 2,alignItems: "center",
          justifyContent: "center", bgcolor: "background.paper", borderRadius:2
 }}>
          <h5>Change User password</h5>
          <div style={{
            maxHeight: 300,
            overflow: "auto",

          }}>
          <form onSubmit={handleChangePassword} >
            
            <CustomInput
              label="New Password"
              name="password"
              onChange={handleChangePasswordInputChange}
              placeholder="enter password"
              value={updateData.password}
            />
         
            
            <Button variant="contained" style={{backgroundColor:"#179CBD"}} fullWidth type="submit">
              Reset Password
            </Button>
          </form>
          </div>
        </Box>
        </div>
     
  )
}

export default ChangePasswordView