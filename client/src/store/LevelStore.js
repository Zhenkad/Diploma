import {makeAutoObservable} from 'mobx'

export default class LevelStore {
    constructor() {
        this._levels = []
        makeAutoObservable(this)
    }

    setLevels(levels){
        this._levels = levels
    }

    get levels(){
        return this._levels
    }
}