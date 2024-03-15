import {makeAutoObservable} from 'mobx'

export default class LevelStore {
    constructor() {
        this._levels = [
            {id: 1, name: 'XSS-инъекции', img: 'https://avatars.mds.yandex.net/i?id=159c4a3a4eedd5c8edeb53f2f4c36d4175a3c113-8497429-images-thumbs&n=13', status: 'FALSE'},
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