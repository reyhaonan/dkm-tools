import express from 'express'
import Sequelize from 'sequelize'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import firstRun from 'electron-first-run'

const bodyParser = require('body-parser')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './consequences.sqlite'
})

const primaryKey = {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    autoIncrement: false
}

const KK = sequelize.define('kartukeluarga',{
    id: primaryKey,
    noKk: Sequelize.TEXT,
    namaKepalaKeluarga: Sequelize.TEXT,
    alamat: Sequelize.TEXT,
    rt: Sequelize.TEXT,
    rw: Sequelize.TEXT,
    desa: Sequelize.TEXT,
    kecamatan: Sequelize.TEXT,
    kabupaten: Sequelize.TEXT,
    kodePos: Sequelize.TEXT,
    provinsi: Sequelize.TEXT,
    ket: Sequelize.TEXT,
})

const Individu =  sequelize.define('individu',{
    id: primaryKey,
    nama: Sequelize.TEXT,
    nik: Sequelize.TEXT,
    jenisKelamin: Sequelize.TEXT,
    // noKk: Sequelize.TEXT,
    tempatLahir: Sequelize.TEXT,
    tanggalLahir: Sequelize.DATE,
    agama: Sequelize.TEXT,
    pendidikan: Sequelize.TEXT,
    pekerjaan: Sequelize.TEXT,
    statusKawin: Sequelize.TEXT,
    statusDalamKeluarga: Sequelize.TEXT,
    kewarganegaraan: Sequelize.TEXT,
    noPaspor: Sequelize.TEXT,
    noKitab: Sequelize.TEXT,
    namaAyah: Sequelize.TEXT,
    namaIbu: Sequelize.TEXT,
    ket: Sequelize.TEXT
})

const Users = sequelize.define('users', {
    id: primaryKey,
    username: Sequelize.TEXT,
    password: Sequelize.TEXT
}, {
    hooks: {
        beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        }
    }
})

Individu.belongsTo(KK)
KK.hasMany(Individu)


    
sequelize.sync().then(() => {
    let isFirstRun = firstRun()
        if(isFirstRun){
            return Users.create({
                username: 's',
                password: 's'
            })
        }
        
    }
)

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

//Applications
route.delete('/reset',(req, res) => {
    firstRun.clear()
    res.send('success')
})


//Authentication
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

//Individu

//KK
route.get('/kk/:pagesize/:page', async (req, res) => {
    let page = parseInt(req.params.page)
    let pagesize = parseInt(req.params.pagesize)


    const kk = await KK.findAll({
        limit: pagesize,
        offset: pagesize * (page - 1)
    })

    const jmlKk = await KK.count()

    const next = page + 1
    const prev = page - 1
    res.json({
        data: kk,
        next: next <= Math.ceil(jmlKk / pagesize)? next: null,
        prev: prev > 0?prev:null
    })
    // res.send('okok')
    // else res.status(404).json('Tidak ada data')
})


//Vuex listing
route.get('/vuex/kk', async (req, res) => {
    const kkVuex = await KK.findAll()

    res.json(kkVuex)
})

route.listen(30258)