import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getActiveLikedJobs } from "../../redux/slices/JobsSlice";
import { getLoggedInUser } from "../../redux/slices/UsersSlice";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";

const LikeJobs = ({ openViewJob, openEditJob, openViewLikes }) => {
  const jobs = useSelector(getActiveLikedJobs);
  const loggedInUser = useSelector(getLoggedInUser);
  const [searchQuery, setSearchQuery] = useState("");

  const filterJobs = (jobs, query) => {
    return jobs.filter((job) => {
      const title = job.title ? job.title.toLowerCase() : "";
      const company = job.company.name ? job.company.name.toLowerCase() : "";
      const region = job.region ? job.region.toLowerCase() : "";

      return (
        title.includes(query.toLowerCase()) ||
        company.includes(query.toLowerCase()) ||
        region.includes(query.toLowerCase())
      );
    });
  };
  const filteredJobs = filterJobs(jobs, searchQuery);

  const handleMenuClick = (id, action, title) => {
    switch (action) {
      case "view":
        openViewJob(id); // Pass the ID to the openModal function
        break;
      case "likes":
        openViewLikes(id, title); // Pass the ID to the openModal function
        break;
      case "edit":
        openEditJob(id); // Pass the ID to the openModal function
        break;

      case "delete":
        console.log(`Delete - Company ID: ${id}`);
        break;
      default:
        break;
    }
  };
  const menu = (id, title) => (
    <Menu onClick={({ key }) => handleMenuClick(id, key, title)}>
      <Menu.Item key="view">View</Menu.Item>
      {loggedInUser && loggedInUser.role === "ADMIN" && (
        <>
          <Menu.Item key="likes">Likes</Menu.Item>
          <Menu.Item key="edit">Edit</Menu.Item>
          <Menu.Item key="delete" danger="true">
            Delete
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  if (filteredJobs.length === 0) {
    return <p>No jobs available.</p>;
  }
  return (
    <>
      <div className="seach-container">
        <TextField
          placeholder="Search ..."
          margin="normal"
          size="small"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search style={{ color: "#179CBD" }} />,
            style: {
              borderRadius: "5px",
              height: "35px",
              borderWidth: "1px",
              fontFamily: "Open Sans",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#179CBD",
                fontFamily: "Open Sans",
              },
            },
          }}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Region</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length !== 0 &&
            filteredJobs.map((item) => (
              <tr key={item.id} className="tableRow">
                <td>{item.title}</td>
                <td>{item.company.name}</td>
                <td>{item.region}</td>
                <td>
                  <Dropdown
                    overlay={menu(item.id, item.title)}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <EyeOutlined
                      style={{
                        fontSize: "16px",
                        color: "#696969",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#179CBD";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#696969";
                      }}
                    />
                  </Dropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default LikeJobs;
