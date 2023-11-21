import React,{useState} from "react";

import { Tabs } from "antd";
import LikeJobs from "../tabs/LikeJobs";
import UnlikedJobs from "../tabs/UnlikedJobs";
import { useTranslation } from 'react-i18next';


const { TabPane } = Tabs;


const JobsTable = ({ openViewJob, openViewLikes }) => {
  const {t} = useTranslation()
  const [activeTab, setActiveTab] = useState("tableA");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div >
      <Tabs tabBarStyle={{ letterSpacing:"0.05em", fontWeight:"500" }} activeKey={activeTab} onChange={handleTabChange} direction="rtl">
        <TabPane  tab={t('likedjobs')} key="tableA" >
          <LikeJobs
            openViewJob={openViewJob}
            openViewLikes={openViewLikes}
          />
        </TabPane>
        <TabPane tab={t('unlikedjobs')} key="tableB">
          <UnlikedJobs
            openViewJob={openViewJob}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};


export default JobsTable;
