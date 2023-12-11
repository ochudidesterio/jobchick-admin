import { Menu } from "antd";
import { useState, useEffect,useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  ContactsFilled,
  ProfileFilled,
  BankFilled,
  IdcardFilled,
  LogoutOutlined,
  GoldFilled,
  EnvironmentFilled,
  StarFilled,
  ScheduleFilled,
  PoundCircleFilled,
 
  MinusSquareFilled
} from "@ant-design/icons";
import Companies from "./pages/companies/Companies";
import AdminUsers from "./pages/admin/AdminUsers";
import Unpublished from "./pages/unpublished/Unpublished";
import Logo from "./components/logo/Logo";
import Users from "./pages/users/Users";
import Jobs from "./pages/jobs/Jobs";
import Category from "./pages/Categories/Category";
import Regions from "./pages/regions/Regions";
import JobTypes from "./pages/jobtypes/JobTypes";
import ClosedJobs from "./pages/closed/ClosedJobs";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getLoggedInUser } from "./redux/slices/UsersSlice";
import api from "./api/api";
import { setCompany } from "./redux/slices/CompaniesSlice";
import Packages from "./pages/packages/Packages";
import { useTranslation } from 'react-i18next';

const Main = ({ onLogout }) => {
  const { t } = useTranslation();

  const [selectedKey, setSelectedKey] = useState("/");
  const loggedUser = useSelector(getLoggedInUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    if (key === "signout") {
      onLogout();
    } else {
      navigate(key);
    }
  };

  const fetchCompanyUsers = useCallback(async () => {
    try {
      const res = await api.get(`/company/admin/${loggedUser.id}`);
      if (res.status === 200) {
        dispatch(setCompany(res.data));
      }
    } catch (error) {}
  }, [dispatch, loggedUser]);
  
  useEffect(() => {
    if (loggedUser && loggedUser.role === "ADMIN") {
      fetchCompanyUsers();
    }
  }, [fetchCompanyUsers, loggedUser]);
  

  

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Menu
        style={{ width: "200px" }}
        mode="vertical"
        className="rtl"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => handleMenuClick(key)}
      >
        <div
          style={{
            backgroundColor: "#179CBD",
            height: "150px",
            alignItems: "center",
          }}
        >
          <Logo />
        </div>
        <Menu.Item
          key="/"
          icon={<ContactsFilled style={{ fontSize: "16px" ,color:"#179CBD" }} />}
          className="menu-item"
          
          
        >
          {t('users')}
        </Menu.Item>
        {loggedUser.role === "SUPERADMIN" && (
          <Menu.Item
            key="/companies"
            icon={<BankFilled style={{ fontSize: "16px",color:"#179CBD" }} />}
            className="menu-item"
          >
            {t('companies')}
          </Menu.Item>
        )}
        <Menu.Item
          key="/jobs"
          icon={<ScheduleFilled style={{ fontSize: "16px",color:"#179CBD" }} />}
          className="menu-item"
          direction="rtl"
        >
          {t('publishedjobs')}
        </Menu.Item>
      
          <>
          <Menu.Item
          key="/closedjobs"
          icon={<MinusSquareFilled style={{ fontSize: "16px" ,color:"#179CBD"}} />}
          className="menu-item"
        >
          {t('closedjobs')}
        </Menu.Item>
          </>
   
        <Menu.Item
          key="/unpublished"
          icon={<ProfileFilled style={{ fontSize: "16px" ,color:"#179CBD"}} />}
          className="menu-item"
        >
          {t('unpublishedjobs')}
        </Menu.Item>
        {loggedUser.role === "SUPERADMIN" && (
          <>
            {" "}
            <Menu.Item
              key="/adminusers"
              icon={<IdcardFilled style={{ fontSize: "16px",color:"#179CBD" }} />}
              className="menu-item"
            >
              {t('adminusers')}
            </Menu.Item>
            <Menu.Item
              key="/categories"
              icon={<GoldFilled style={{ fontSize: "16px" ,color:"#179CBD"}} />}
              className="menu-item"
            >
              {t('categories')}
            </Menu.Item>
            <Menu.Item
              key="/types"
              icon={<StarFilled style={{ fontSize: "16px",color:"#179CBD" }} />}
              className="menu-item"
            >
              {t('jobtypes')}
            </Menu.Item>
            <Menu.Item
              key="/regions"
              icon={<EnvironmentFilled style={{ fontSize: "16px",color:"#179CBD" }} />}
              className="menu-item"
            >
              {t('regions')}
            </Menu.Item>

            <Menu.Item
              key="/packages"
              icon={<PoundCircleFilled style={{ fontSize: "16px",color:"#179CBD" }} />}
              className="menu-item"
              
            >
             {t('premium')}
            </Menu.Item>
          </>
        )}

        <Menu.Item
          key="signout"
          icon={<LogoutOutlined style={{ fontSize: "16px" }} />}
          danger="true"
          className="menu-item"
        >
          {t('signout')}
        </Menu.Item>
      </Menu>
      <Content />
    </div>
  );
};
function Content() {
  return (
    <div className="content" style={{ flex: "1" }}>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/adminusers" element={<AdminUsers />} />
        <Route path="/unpublished" element={<Unpublished />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/types" element={<JobTypes />} />
        <Route path="/closedjobs" element={<ClosedJobs />} />
        <Route path="/packages" element={<Packages/>} />
      </Routes>
    </div>
  );
}

export default Main;
