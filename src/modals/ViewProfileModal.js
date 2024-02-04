import React, { useState,useEffect ,useCallback} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ProfileView from "../pages/profile/ProfileView";

import GalleryView from "../pages/profile/GalleryView";
import { useSelector } from "react-redux";
import { getLoggedInUser, getSelectedUser } from "../redux/slices/UsersSlice";
import Profile from "../assets/profile.png"
import { IconButton } from "@mui/material";
import api from "../api/api";
import { getIsLikedJob } from "../redux/slices/JobsSlice";
import { useTranslation } from 'react-i18next';
import ChangePasswordView from "../pages/profile/ChangePasswordView";






const ViewProfileModal = ({ open, onClose,companyId,jobId }) => {
  const {t} = useTranslation()
    const user = useSelector(getSelectedUser);
    const likedJob = useSelector(getIsLikedJob)
    const loggedInUser = useSelector(getLoggedInUser)

  const [selectedTab, setSelectedTab] = useState(0);
  const [liked, setLiked] = useState(false);
  const [images,setImages] = useState([])



  const fetchImages = useCallback(
    async()=>{
      try {
        if(user){
          const response = await api.get(`/gallery/get/${user.id}`)
        console.log("Images",response.data)
        setImages(response.data)
        }
  
      } catch (error) {
        
      }
    },[user]
  )
  useEffect(()=>
  {
    fetchImages()
  },[fetchImages])
 

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleThumbClick = async () => {
    const res = await api.post(`/job/admin/like/${likedJob.id}/${!liked}`)
    if(res.data === "updated"){
      setLiked(!liked);
    }
  };
 
  useEffect(()=>{
    if(likedJob.likedBack !== null){
      setLiked(likedJob.likedBack)
    }
  },[likedJob])

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
      
        sx={{ width: "70vw", direction:"rtl", p: 2, bgcolor: "background.paper", borderRadius: 2,
        height:"100%",
        maxHeight: "90vh", // Set a maximum height for the modal
          overflow: "auto", // Enable scrolling when content exceeds the height
     }}
      >
        <div className="profileview-image">
          <div className="prof-img-container">
          {user && user.profileImage ? (
              <img src={user.profileImage} alt="User" className="prof-image" />
            ) : (
              <img
                src={Profile}
                alt="User Placeholder"
                className="prof-image"
              />
            )}
          </div>
        </div>
        <div className="profile-tabs">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          //   TabIndicatorProps={{ style: { display: "none" } }}
        >
          <Tab
            icon={<PersonIcon style={{ marginTop: "6", fontSize: "15" }} />}
            label={t('profile')}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
              marginLeft: "30px",
            }}
          />
          

          <Tab
            icon={
              <PhotoLibraryIcon style={{ marginTop: "6", fontSize: "15" }} />
            }
            label={t('gallery')}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
              marginLeft: "30px",
            }}
          />
          {loggedInUser && loggedInUser.role === "SUPERADMIN" && <Tab
              icon={<VpnKeyIcon style={{ marginTop: "6", fontSize: "15" }} />} 
              label={t('password')}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                textTransform: "none",
                marginLeft: "30px",
              }}
            />}
         
        </Tabs>
        {loggedInUser && loggedInUser.role === "ADMIN" && <IconButton onClick={handleThumbClick}>
            {liked ? (
              <ThumbUpIcon
                sx={{ color: "red" }}
                fontSize="default"
              />
            ) : (
              <ThumbDownIcon
                sx={{ color: "black" }}
                fontSize="default"
              />
            )}
          </IconButton>}

        </div>
        <div
          style={{
            marginTop: 20,
          }}
        >
          {selectedTab === 0 && <ProfileView user={user}/>}
       
          {selectedTab === 1 && <GalleryView images={images} />}
          {loggedInUser && loggedInUser.role ==="SUPERADMIN" && selectedTab === 2 && <ChangePasswordView user={user}/>}
        </div>
      </Box>
    </Modal>
  );
};

export default ViewProfileModal;
