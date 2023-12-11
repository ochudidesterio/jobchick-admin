import React,{useEffect,useState} from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getCompany } from '../../redux/slices/CompaniesSlice';
import { useDispatch } from 'react-redux/es/exports';
import api from '../../api/api';
import { setClosedJobs, setQualifications, setRoles, setSelectedJob } from '../../redux/slices/JobsSlice';
import ClosedJobsTable from './ClosedJobsTable';
import "./closedjobs.css"
import { useTranslation } from "react-i18next";
import { showErrorToast, showSuccessToast } from '../../Constants/Toasts';
import EditJobRolesModal from '../../modals/EditJobRolesModal';
import EditJobDescriptionModal from '../../modals/EditJobDescriptionModal';
import EditJobQualificationsModal from '../../modals/EditJobQualificationModal';
import ViewJobModal from '../../modals/ViewJobModal';
import RepostJobModal from '../../modals/RepostJobModal';
import { getLoggedInUser } from '../../redux/slices/UsersSlice';



const ClosedJobs = () => {
  const { t } = useTranslation();
  const loggedUser = useSelector(getLoggedInUser);

    //create view job modal
    const [showViewJobs, setViewJobs] = useState(false);
    const handleShowViewJob = () => setViewJobs(false);

    //open close job modal
  const [showRepostJob, setRepostJob] = useState(false);
  const handleRepostJob = () => setRepostJob(false);

     //job company
  const [company, setCompany] = useState(null);

  const dispatch = useDispatch()
  const mycompany = useSelector(getCompany);
  const [selectedJobId, setSelectedJobId] = useState(null);



  const [editDescData, setEditDescData] = useState({
    id: null,
    description: null,
    title: null,
  });
  const [rolesData, setRolesData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);

  const [showEditDesc, setShowEditDesc] = useState(false);
  const [showEditRoles, setShowEditRoles] = useState(false);
  const [showEditQualifications, setShowEditQualifications] = useState(false);

  const handleShowEditDesc = () => setShowEditDesc(false);
  const handleShowEditRoles = () => setShowEditRoles(false);
  const handleShowEditQualifications = () => setShowEditQualifications(false);

  const handleEditDescriptionInputChange = (e) => {
    const { name, value } = e.target;
    setEditDescData({ ...editDescData, [name]: value });
  };
  const handleSubmitEditDescription = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/job/update", editDescData);
      showSuccessToast(res.data);
      handleShowEditDesc();
    } catch (error) {
      console.log("Error Editing Job Description:", error);
      showErrorToast("Failed");
    }
  };
  // Function to handle changes in roles' descriptions
  const handleRolesChange = (roleId, updatedRole) => {
    // Find the role in the state and update its role property
    const updatedRoles = rolesData.map((r) =>
      r.id === roleId ? { ...r, role: updatedRole.role } : r
    );
    setRolesData(updatedRoles);
  };

  // Function to handle changes in qualification' descriptions
  const handleQualificationChange = (qId, updatedQ) => {
    // Find the qualification in the state and update its qualification property
    const updatedQualifications = qualificationData.map((q) =>
      q.id === qId ? { ...q, qualification: updatedQ.qualification } : q
    );
    setQualificationData(updatedQualifications);
  };
  const handleRolesEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/job/roles/update", rolesData);
      showSuccessToast(res.data);
      handleShowEditRoles();
    } catch (error) {
      console.log("Error Editing Roles:", error);
      showErrorToast("Failed");
    }
  };
  const handleQualificationsEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/job/qualifications/update",
        qualificationData
      );
      showSuccessToast(res.data);
      handleShowEditQualifications();
    } catch (error) {
      console.log("Error Editing Qualifications:", error);
      showErrorToast("Failed");
    }
  };

   //showEditDescriptio
   const openEditJobDescription = (id) => {
    api
      .get(`/job/${id}`)
      .then((res) => {
        setEditDescData({
          id: res.data.id,
          description: res.data.description,
          title: res.data.title,
        });
        setShowEditDesc(true);
      })
      .catch((err) => console.log("Error fetching Job", err));
  };
  //show Edit Qualitifications
  const openEditQualifications = (id) => {
    api
      .get(`/job/qualifications/${id}`)
      .then((res) => {
        setShowEditQualifications(true);
        setQualificationData(res.data);
      })
      .catch((err) => console.log("Error fetching qualifications", err));
  };
  //show Edit Roles
  const openEditRoles = (id) => {
    api
      .get(`/job/roles/${id}`)
      .then((res) => {
        setShowEditRoles(true);
        setRolesData(res.data);
      })
      .catch((err) => console.log("Error fetching roles", err));
  };
  const fetchClosedJobs =async(id)=>{
    try {
      const res = await api.get(`/job/company/closed/${id}`)
      dispatch(setClosedJobs(res.data))
    } catch (error) {
      console.log("Error fatching closed jobs: ",error)
    }
  }
  const fetchAllClosedJobs = async() =>{
    try{
      const res = await api.get(`/job/all/closed`)
      dispatch(setClosedJobs(res.data))
    }catch(err){
      console.log("Error fatching closed jobs: ",err)

    }
  }
  useEffect(()=>{
    if(loggedUser.role ==="ADMIN"){
      fetchClosedJobs(mycompany.id)
    }else{
      fetchAllClosedJobs()
    }
  })
  //show view job modal
  const openViewJob = (jobId) => {
    try {
      api
        .get(`/job/${jobId}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setSelectedJob(res.data));
            setViewJobs(true);
            setCompany(res.data.company);
            api.get(`/job/roles/${jobId}`).then((roles) => {
              dispatch(setRoles(roles.data));
            });
            api.get(`/job/qualifications/${jobId}`).then((qualifications) => {
              dispatch(setQualifications(qualifications.data));
            });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  };
  const openRepost =(id)=>{
    setRepostJob(true)
    setSelectedJobId(id)
  }
  const repostJob = async() =>{
    try {
      const res = await api.post(`/job/repost/${selectedJobId}`);
      if (res.data.status === "ACTIVE") {
        showSuccessToast("Reposted");
        handleRepostJob();
      } else {
        showErrorToast("Failed");
      }
    } catch (error) {
      showErrorToast("Failed");
    }
  }
  return (
    <div className='closed-home' dir='rtl'>
      <h3>{t('closedjobs')}</h3>
      <ClosedJobsTable openViewJob={openViewJob} openRepost={openRepost}/>
      <EditJobRolesModal
        data={rolesData}
        open={showEditRoles}
        onClose={handleShowEditRoles}
        onChange={handleRolesChange}
        onSubmit={handleRolesEditSubmit}
      />
      <EditJobDescriptionModal
        open={showEditDesc}
        onClose={handleShowEditDesc}
        onChange={handleEditDescriptionInputChange}
        onSubmit={handleSubmitEditDescription}
        data={editDescData}
      />
      <EditJobQualificationsModal
        open={showEditQualifications}
        onClose={handleShowEditQualifications}
        data={qualificationData}
        onChange={handleQualificationChange}
        onSubmit={handleQualificationsEditSubmit}
      />
      <ViewJobModal
        open={showViewJobs}
        onClose={handleShowViewJob}
        company={company}
        openEditDesc={openEditJobDescription}
        openEditRoles={openEditRoles}
        openEditQualification={openEditQualifications}
      />
      <RepostJobModal
      open={showRepostJob}
      onClose={handleRepostJob}
      onSubmit ={repostJob}
      />
    </div>
  )
}

export default ClosedJobs