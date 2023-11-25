import React from 'react'
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTranslation } from 'react-i18next';
import CustomInput from '../components/CustomInput';


const EditTypeModal = ({open,onClose,onSubmit,formData,onChange}) => {
  const {t} = useTranslation()
  return (
    <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 400, direction:"rtl", paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5, bgcolor: "background.paper", borderRadius:2
 }}>
          <h5>{t('editjobtype')}</h5>
          <div style={{
            maxHeight: 300,
            overflow: "auto",

          }}>
          <form onSubmit={onSubmit}>
          <CustomInput
              label={t('jobtypes')}
              name="name"
              onChange={onChange}
              placeholder={t('name')}
              value={formData.name}
            />
            
         
            
            <Button variant="contained" style={{backgroundColor:"#179CBD",marginTop:15}} fullWidth type="submit">
              {t('save')}
            </Button>
          </form>
          </div>
        </Box>
      </Modal>
  )
}

export default EditTypeModal