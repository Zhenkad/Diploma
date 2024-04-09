import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const createLevel = async (level) => {
    const {data} = await $authHost.post('api/createlevel', level)
    let levelId = data.id
    return await $authHost.post('api/createtokensforallusers', {levelId})
}

export const createTokensForAllUsers = async (levelId) => {
    return await $authHost.post('api/createtokensforallusers', {levelId})
}

export const createTokensForAllLevels = async (userId) => {
    return await $host.post('api/createtokens', {userId})
}

export const passLevel = async (userId, levelId, token) => {
    const {data} = await $authHost.post('api/checktoken', {userId, levelId, token})
    return data
}

export const fetchLevels = async (userId) => {
    const {data} = await $host.get('api/levels', {params: {userId}})
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/auth')
    return jwtDecode(data.token)
}