import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LikesView from "../pages/profile/LikesView";
import DislikeView from "../pages/profile/DislikeView";
import MatchPageView from "../pages/profile/MatchPageView";
import GalleryView from "../pages/profile/GalleryView";
import { useSelector } from "react-redux";

import Profile from "../assets/profile.png"
import { getSelectedCompany } from "../redux/slices/CompaniesSlice";
import CompanyDetailTable from "../components/CompanyDetailTable";


const ViewCompanyProfileModal = ({ open, onClose }) => {
  const company = useSelector(getSelectedCompany)

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
          {company && company.logoUrl ? (
              <img src={company.logoUrl} alt="User" className="prof-image" />
            ) : (
              <img
                src={Profile}
                alt="User Placeholder"
                className="prof-image"
              />
            )}
          </div>
        </div>
        <CompanyDetailTable  company={company} />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          //   TabIndicatorProps={{ style: { display: "none" } }}
        >
          
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
          {selectedTab === 0 && <LikesView />}
          {selectedTab === 1 && <DislikeView />}
          {selectedTab === 2 && <MatchPageView />}
          {selectedTab === 3 && <GalleryView />}
        </div>
      </Box>
    </Modal>
  );
};

export default ViewCompanyProfileModal;
