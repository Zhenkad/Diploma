import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const createLevel = async (name, port) => {
    const {data} = await $authHost.post('api/createlevel', {name, port})
    const levelId = data.id
    return await $host.post('api/createtokensforallusers', {levelId})
}

export const createTokensWhenCreateLevel = async(levelId) => {
    return await $host.post('api/createtokensforallusers', {levelId})
}

export const createTokens = async (userId) => {
    return await $host.post('api/createtokens', {userId})
}


export const fetchLevels = async () => {
    const {data} = await $host.get('api/levels')
    return data
}

export const getOneTokenForUser = async (userId, levelId) => {
    const {data} = await $host.get('api/getonetokenforuser', {params: {
        userId: userId,
        levelId: levelId
    }})
    localStorage.setItem('tokenStatus', data.tokenStatus)
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/auth')
    return jwtDecode(data.token)
}