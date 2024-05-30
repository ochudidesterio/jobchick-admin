import axios from "axios";
export default axios.create({
   baseURL:"https://app.jobchick.app/jobchick"//production
   //baseURL:"http://localhost/jobchick"
})