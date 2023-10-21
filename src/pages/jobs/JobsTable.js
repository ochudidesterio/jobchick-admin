import React,{useState} from "react";

import { Tabs } from "antd";
import LikeJobs from "../tabs/LikeJobs";
import UnlikedJobs from "../tabs/UnlikedJobs";

const { TabPane } = Tabs;


const JobsTable = ({ openViewJob, openEditJob, openViewLikes }) => {
  const [activeTab, setActiveTab] = useState("tableA");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div >
      <Tabs activeKey={activeTab} onChange={handleTabChange} direction="rtl">
        <TabPane tab="Liked Jobs" key="tableA" >
          <LikeJobs
            openViewJob={openViewJob}
            openEditJob={openEditJob}
            openViewLikes={openViewLikes}
          />
        </TabPane>
        <TabPane tab="Unliked Jobs" key="tableB">
          <UnlikedJobs
            openViewJob={openViewJob}
            openEditJob={openEditJob}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};


export default JobsTable;
