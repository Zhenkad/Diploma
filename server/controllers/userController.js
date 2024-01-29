class UserController{
    async registration(req, res){

    }

    async login(req, res){
        
    }

    async check(req, res){
        const {id} = req.query
        res.json(id)
    }

    async getAll(req, res){
        res.json('Hello')
    }
}

module.exports = new UserController()