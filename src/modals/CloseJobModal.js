import React from 'react'
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const CloseJobModal = ({open,onClose,onSubmit}) => {
    const { t } = useTranslation();

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
      <Box
        sx={{
          width: 350,
          paddingLeft:2,
          paddingRight:2,
          paddingBottom:3,
          direction: "rtl",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5 className='close-title'>{t("close")}</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
            <p>Closing this job deactivates it</p>
            <p>Are you sure you want to close this job?</p>
          
           <div className='close-job-btns'>
           <Button
              variant="contained"
              style={{ backgroundColor: "#b22222" }}
              onClick={()=>{onClose()}}
            >
              {t('cancel')}
            </Button>
           <Button
              variant="contained"
              style={{ backgroundColor: "#b22222" }}
              onClick={()=>{onSubmit()}}
            >
             {t('yes')}
            </Button>
           </div>
        </div>
      </Box>
    </Modal>
  )
}

export default CloseJobModal