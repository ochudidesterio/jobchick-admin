import axios from "axios";
export default axios.create({
    baseURL:"http://172.105.51.141/jobchick"//production
    //baseURL:"http://localhost/jobchick"
})