import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const createLevel = async (level) => {
    const {data} = await $authHost.post('api/createlevel', level)
    let levelId = data.id
    await $authHost.post('api/createtokensforallusers', {levelId})
    return await $authHost.post('api/createstatforallusers', {levelId})
}

export const createStatForOneUser = async (userId) => {
    return await $host.post('api/createstatforoneuser', {userId})
}

export const createTokensForAllUsers = async (levelId) => {
    return await $authHost.post('api/createtokensforallusers', {levelId})
}

export const createTokensForAllLevels = async (userId) => {
    return await $host.post('api/createtokens', {userId})
}

export const passLevel = async (userId, levelId, token) => {
    const {data} = await $authHost.post('api/checktoken', {userId, levelId, token})
    await $authHost.post('api/timeforlevel', {userId, levelId})
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

export const setCurrentTimeForStat = async (levelId, userId, currentTime) => {
    return await $authHost.post('api/settimestart', {levelId, userId, currentTime})
}

export const getStatistic = async (userId) => {
    return await $authHost.get('api/getstatistic', {params: {userId}})
}