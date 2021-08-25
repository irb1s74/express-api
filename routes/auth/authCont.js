const User = require('../../models/User');
const Role = require('../../models/Role');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../../config')

const generateToken = (id,roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,secret,{expiresIn: "24h"})
}

class authCont {
    async reg(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: errors})
            }
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
            const {email,password} = req.body
            const user =  await User.findOne({email})
            if(!user) {
                return res.status(400).json({message:'Пользаватель с таким email не был найден!'})
            }
            const validPassword = bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return  res.status(400).json({message:'Введен неверный пароль '})
            }
            const token = generateToken(user._id,user.roles)
            return  res.json({token})
        } catch (e) {
            res.status(400).json('Login error')
        }
    }

}

module.exports = new authCont()