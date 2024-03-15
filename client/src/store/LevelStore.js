import {makeAutoObservable} from 'mobx'

export default class LevelStore {
    constructor() {
        this._levels = [
            {id: 1, name: 'XSS-инъекции', img: '', status: 'FALSE'},
            {id: 2, name: 'SQL-инъекции', img: '', status: 'TRUE'},
            {id: 3, name: 'SHEL-инъекции', img: '', status: 'FALSE'}
        ]
        makeAutoObservable(this)
    }

    setLevels(levels){
        this._levels = levels
    }

    get levels(){
        return this._levels
    }
}