
import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const createLevel = async (name, port) => {
    const {data} = await $authHost.post('api/createlevel', {name, port})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const createToken = async (userId, LevelId) => {
    const {data} = await $host.post('api/createtoken', {userId, LevelId})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const fetchLevels = async () => {
    const {data} = await $host.get('api/levels')
    return data
}


export const getOneTokenForUser = async (userId, levelId) => {
    const {data} = await $host.get('api/getonetokenforuser', {userId, levelId})
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}