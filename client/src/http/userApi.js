import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (user_name, phone_number, password) => {
    const {data} = await $host.post('api/registration', {user_name, phone_number, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (user_name, password) => {
    const {data} = await $host.post('api/login', {user_name, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchUsers = async () => {
    return await $authHost.get('api/users')
}

export const changeRole = async (id, role) => {
    return await $authHost.post('api/changerole', {id, role})
}

export const deleteUser = async (userId) => {
    return await $authHost.delete('api/deleteuser', {data: {userId: userId}})
}

export const check = async () => {
    const {data} = await $authHost.get('api/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const resetPasswordRequest = async (user_name, password) => {
    return await $host.post('api/resetpassword', {user_name, password})
}