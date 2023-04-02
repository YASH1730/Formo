import axios, { AxiosError } from 'axios'
import config from '../config.json'

const API = config.local;

function register (data){
    return axios.post(`${API}/register`,data)
}
function login (data){
    return axios.post(`${API}/login`,data)
}
function addForm (data){
    return axios.post(`${API}/addForm`,data)
}
function listForm (data){
    return axios.get(`${API}/listForm?email=${data}`)
}

function getFormDetails (data){
    return axios.get(`${API}/getFormDetails?uuid=${data}`)
}

function editForm (data){
    return axios.patch(`${API}/editForm`,data)
}

function submitResponse (data){
    return axios.post(`${API}/submitResponse`,data)
}


export {register, login, addForm, listForm, getFormDetails,editForm, submitResponse};