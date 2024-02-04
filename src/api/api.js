import axios from "axios";
export default axios.create({
   baseURL:"https://app.jobchick.co.il/jobchick"//production
   //baseURL:"http://localhost/jobchick"
})