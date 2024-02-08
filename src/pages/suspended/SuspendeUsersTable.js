import React from "react";
import { useSelector } from "react-redux/es/exports";
import { getSuspendedUsers} from "../../redux/slices/UsersSlice";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import SelectPageSize from "../../components/SelectPageSize";
import SuspendedUsersTableComponent from "./SuspendedTableCompnent";

const SuspendedUsersTable = ({
  pageSize,
  handlePageSize,
  param,
  onChange,
  totalUsers,
  activateUser
}) => {
  const { t } = useTranslation();

  const users = useSelector(getSuspendedUsers);
  
  return (
    <div>
      <div className="seach-container">
        <h3>
          {t("users")} ({totalUsers})
        </h3>
        <SelectPageSize
          pageSize={pageSize}
          handlePageSizeChange={handlePageSize}
        />
        <div className="search">
          <TextField
            placeholder={t("searchuser")}
            margin="normal"
            size="small"
            className="search-input"
            value={param}
            onChange={onChange}
            InputProps={{
              startAdornment: <Search style={{ color: "#179CBD" }} />,
              style: {
                borderRadius: "2px",
                height: "35px",
                width: "200px",
                borderWidth: 0.5,
                fontFamily: "Open Sans",
              },
            }}
            dir="rtl"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#179CBD",
                  fontFamily: "Open Sans",
                },
                "&:hover fieldset": {
                  borderColor: "#179CBD", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#179CBD", // Border color when focused
                  color: "#179CBD", // Text color when focused
                },
              },
            }}
          />
        </div>
      </div>

      <SuspendedUsersTableComponent
        userList={users}
        activateUser={activateUser}
      />
    </div>
  );
};

export default SuspendedUsersTable;
