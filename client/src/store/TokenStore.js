import {makeAutoObservable} from 'mobx'

export default class TokenStore {
    constructor() {
        this._token = []
        makeAutoObservable(this)
    }

    setToken(token){
        this._token = token
    }

    get tokens(){
        return this._token
    }
}