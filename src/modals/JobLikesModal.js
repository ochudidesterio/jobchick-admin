import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { getJobLikeUsers } from "../redux/slices/UsersSlice";
import { EyeOutlined } from "@ant-design/icons";

const JobLikesModal = ({ open, onClose, title,openUserProfile }) => {
  const users = useSelector(getJobLikeUsers);

  const handleRowClick=(id)=>{
    openUserProfile(id)
  }

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
          maxHeight: "90vh",
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5>Users who liked {title}</h5>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length !==0 ? users.map((item) => (
              <tr key={item.id} onClick={() => handleRowClick(item.id)}
              className="tableRow">
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.authUsername}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>
                  <EyeOutlined style={{ fontSize: "16px", color: "#696969" }} />
                </td>
              </tr>
            )): "No Likes"}
          </tbody>
        </table>
      </Box>
    </Modal>
  );
};

export default JobLikesModal;
