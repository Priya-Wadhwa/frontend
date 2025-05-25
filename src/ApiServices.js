import axios from "axios"
import * as qs from"qs"
export const BASE_URL="/https://backend-sqyk.onrender.com"

class ApiServices{
    getToken(){
        let obj={
            Authorization:sessionStorage.getItem("token")
        }
        return obj
    }

    login(data){
        return axios.post(BASE_URL+"admin/login",qs.stringify(data))
    }

    BDEregister(data){
        return axios.post(BASE_URL+"freelancer/register",data)
    }
    clientRegister(data){
        return axios.post(BASE_URL+"client/register",data)
    }
    addDepartment(data){
        return axios.post(BASE_URL+"admin/category/create",data,{headers:this.getToken()})
    }
    manageDepartment(data){
        return axios.post(BASE_URL+"admin/category/all",qs.stringify(data))
    }
    updateDepartment(data){
        return axios.post(BASE_URL+"admin/category/update",data,{headers:this.getToken()})
    }
    singleDepartment(data){
        return axios.post(BASE_URL+"admin/category/single",qs.stringify(data),{headers:this.getToken()})
    }
    changeStatus(data){
        return axios.post(BASE_URL+"admin/category/change-status",qs.stringify(data),{headers:this.getToken()})
    }

    viewClients(data){
        return axios.post(BASE_URL+"admin/client/all",qs.stringify(data),{headers:this.getToken()})
    }
    viewFreelancers(data){
        return axios.post(BASE_URL+"admin/freelancer/all",qs.stringify(data),{headers:this.getToken()})
    }

    viewProjects(data){
        return axios.post(BASE_URL+"admin/project/all",qs.stringify(data),{headers:this.getToken()})
    }
    viewSingleProject(data){
        return axios.post(BASE_URL+"admin/project/single",qs.stringify(data),{headers:this.getToken()})
    }

    dashboard(data){
        return axios.post(BASE_URL+"admin/dashboard",qs.stringify(data),{headers:this.getToken()})
    }  
    changePassword(data){
        return axios.post(BASE_URL+"client/change-password",qs.stringify(data),{headers:this.getToken()})

    }
    addProject(data){
        return axios.post(BASE_URL+"client/project/create",data,{headers:this.getToken()})
    }
    manageProject(data){
        return axios.post(BASE_URL+"client/project/all",qs.stringify(data),{headers:this.getToken()})
    }
    deleteProject(data){
        return axios.post(BASE_URL+"client/project/delete",qs.stringify(data),{headers:this.getToken()})
    }
    updateProject(data){
        return axios.post(BASE_URL+"client/project/update",data,{headers:this.getToken()})
    }
    singleProject(data){
        return axios.post(BASE_URL+"client/project/single",qs.stringify(data),{headers:this.getToken()})
    }
    singleFreelancer(data){
        return axios.post(BASE_URL+"admin/freelancer/single",qs.stringify(data),{headers:this.getToken()})
    }
    singleClient(data){
        return axios.post(BASE_URL+"admin/client/single",qs.stringify(data),{headers:this.getToken()})
    }
    viewProject(data){
        return axios.post(BASE_URL+"freelancer/project/all",qs.stringify(data),{headers:this.getToken()})
    }

    viewSingleBDEProject(data){
        return axios.post(BASE_URL+"freelancer/project/single",qs.stringify(data),{headers:this.getToken()})
    }
    addBid(data){
        return axios.post(BASE_URL+"freelancer/create-bid",data,{headers:this.getToken()})
    }
    viewBid(data){
        return axios.post(BASE_URL+"freelancer/bids",qs.stringify(data),{headers:this.getToken()})
    }
    viewSingleBid(data){
        return axios.post(BASE_URL+"freelancer/bid-single",qs.stringify(data),{headers:this.getToken()})
    }
    updateBid(data){
        return axios.post(BASE_URL+"freelancer/bid-update",data,{headers:this.getToken()})
    }
    clientViewBid(data){
        return axios.post(BASE_URL+"client/bids",qs.stringify(data),{headers:this.getToken()})
    }
    BidChangeStatus(data){
        return axios.post(BASE_URL+"client/bid-update",qs.stringify(data),{headers:this.getToken()})
    }
    viewBids(data){
        return axios.post(BASE_URL+"admin/bids",qs.stringify(data),{headers:this.getToken()})
    }
    
}
export default new ApiServices