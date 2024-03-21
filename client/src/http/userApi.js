import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (user_name, password) => {
    const {data} = await $host.post('api/registration', {user_name, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (user_name, password) => {
    const {data} = await $host.post('api/login', {user_name, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}