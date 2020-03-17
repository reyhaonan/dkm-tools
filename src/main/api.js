import express from 'express'
import Sequelize from 'sequelize'
import cors from 'cors'
import bcrypt from 'bcryptjs'

const bodyParser = require('body-parser')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './consequences.sqlite'
});

const Users = sequelize.define('users', {
        id: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            autoIncrement: false
        },
        username: {
            type: Sequelize.TEXT
        },
        password:{
            type: Sequelize.TEXT
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: new Date
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: new Date
        }
    }, {
        hooks: {
            beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    })
    
// sequelize.sync().then(() => {
//     // return Users.create({
//     //     username: 'admin',
//     //     password: 'roti2020'
//     // })
// })

const route = express()

//Cross origin site request limiting
var whitelist = ['http://localhost:9080',`file://`]
const corsConfig = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback('nope')
        }
      }
}

route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());
route.use(cors(corsConfig))

route.post('/login', async (req, res) => {

    const user = await Users.findOne({
        where: {
            username: req.body.username
        }
    })

    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.json('sukses')
        }else{
            res.status(403).json('Password salah')
        }
    }else{
        res.status(404).json('Username tidak ditemukan')
    }

})






route.listen(9000)