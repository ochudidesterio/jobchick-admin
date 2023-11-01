import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { getJobLikeUsers, getJobMatchUsers } from "../redux/slices/UsersSlice";
import { LikeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Unmatched from "../pages/tabs/Unmatched";
import Matched from "../pages/tabs/Matched";
import { useTranslation } from 'react-i18next';


const { TabPane } = Tabs;

const JobLikesModal = ({ open, onClose, title, openUserProfile }) => {
  const {t} = useTranslation()
  const likeUsers = useSelector(getJobLikeUsers);
  const matchedUsers = useSelector(getJobMatchUsers);
  const [activeTab, setActiveTab] = useState("unmatched");

  const handleRowClick = (id) => {
    openUserProfile(id);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
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
        sx={{
          height: "100%",
          width: "70vw",
          direction:"rtl",
          maxHeight: "90vh",
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane
            key="unmatched"
            tab={
              <div style={{ display: "flex", alignItems: "center" }}>
                <LikeOutlined style={{ fontSize: "16px", marginLeft: "5px" }} />
                <span>{t('unmatchedusers')}</span>
              </div>
            }
          />
          <TabPane
            key="matched"
            tab={
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleOutlined style={{ fontSize: "16px", marginLeft: "5px" }} />
                <span>{t('matchedusers')}</span>
              </div>
            }
          />
        </Tabs>

        {activeTab === "unmatched" && (
          <Unmatched users={likeUsers} handleRowClick={handleRowClick} title={title} />
        )}

        {activeTab === "matched" && (
          <Matched users={matchedUsers} handleRowClick={handleRowClick} title={title} />
        )}
      </Box>
    </Modal>
  );
};

export default JobLikesModal;
