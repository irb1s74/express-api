const User = require('../../models/User');
const Role = require('../../models/Role');
const bcrypt = require('bcrypt');

class authCont {
    async reg(req, res) {
        try {
            const {name, surname, password, email} = req.body;
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Email with name like this already exist'})
            }
            const hashPass = bcrypt.hashSync(password, 2)
            const role = await Role.findOne({value: "USER"});
            const user = new User({
                name: name,
                surname: surname,
                email: email,
                password: hashPass,
                roles: [role.value],
            })
            await user.save()
            return res.json({message: 'User create'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            res.json(req.body)
        } catch (e) {
            res.status(400).json('Login error')
        }
    }
}

module.exports = new authCont()