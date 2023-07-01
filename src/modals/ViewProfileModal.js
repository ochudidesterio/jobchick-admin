import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ProfileView from "../pages/profile/ProfileView";
import LikesView from "../pages/profile/LikesView";
import DislikeView from "../pages/profile/DislikeView";
import MatchPageView from "../pages/profile/MatchPageView";
import GalleryView from "../pages/profile/GalleryView";
import { useSelector } from "react-redux";
import { getSelectedUser } from "../redux/slices/UsersSlice";
import Profile from "../assets/profile.png"


const ViewProfileModal = ({ open, onClose }) => {
    const user = useSelector(getSelectedUser);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
        sx={{ width: 700, p: 2, bgcolor: "background.paper", borderRadius: 2,
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
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          //   TabIndicatorProps={{ style: { display: "none" } }}
        >
          <Tab
            icon={<PersonIcon style={{ marginTop: "6", fontSize: "15" }} />}
            label="Profile"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          />
          <Tab
            icon={<FavoriteIcon style={{ marginTop: "6", fontSize: "15" }} />}
            label="Likes"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          />
          <Tab
            icon={<ThumbDownIcon style={{ marginTop: "6", fontSize: "15" }} />}
            label="Dislikes"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          />
          <Tab
            icon={
              <CheckCircleIcon style={{ marginTop: "6", fontSize: "15" }} />
            }
            label="Matched"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          />

          <Tab
            icon={
              <PhotoLibraryIcon style={{ marginTop: "6", fontSize: "15" }} />
            }
            label="Gallery"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          />
        </Tabs>
        <div
          style={{
            marginTop: 20,
          }}
        >
          {selectedTab === 0 && <ProfileView user={user}/>}
          {selectedTab === 1 && <LikesView />}
          {selectedTab === 2 && <DislikeView />}
          {selectedTab === 3 && <MatchPageView />}
          {selectedTab === 4 && <GalleryView />}
        </div>
      </Box>
    </Modal>
  );
};

export default ViewProfileModal;
