import express from 'express'
import Sequelize from 'sequelize'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import firstRun from 'electron-first-run'
import fileUpload from 'express-fileupload'
import * as jetpack from 'fs-jetpack'
import moment from 'moment'
const fs = require('fs')
const bodyParser = require('body-parser')
const excel = require('node-excel-export')






moment.locale('id')
const Op = Sequelize.Op
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './consequences.sqlite'
})
const route = express()

const primaryKey = {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    autoIncrement: false
}


//#region MODEL DECLARATION

const KK = sequelize.define('kartukeluarga',{
    id: primaryKey,
    noKk: Sequelize.TEXT,
    kepalaKeluarga: Sequelize.TEXT,
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

const Todos = sequelize.define('todo',{
    id: primaryKey,
    description: Sequelize.TEXT,
    dates: Sequelize.DATE
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

const Galeri = sequelize.define('galeri', {
    id: primaryKey,
    path: Sequelize.TEXT
})

Individu.belongsTo(KK, {onDelete: 'CASCADE'})
KK.hasMany(Individu)


    
//#endregion
sequelize.sync()
.then(() => {
    let isFirstRun = firstRun()
        if(isFirstRun){
            return Users.create({
                username: 'default_admin',
                password: 'ARy#-k9DK7!NU27UHAjF6s7'
            })
        }   
    }
)



//#region EXPRESS CONFIG
var whitelist = ['http://localhost:9080','file://']
const corsConfig = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(`${origin} is not allowed`)
        }
      }
}
route.use(fileUpload({
    createParentPath: true
}));
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());
// route.use(cors(corsConfig))
route.use(cors())

//#endregion

//Applications
route.delete('/reset',(req, res) => {
    firstRun.clear()
    res.send('success')
})

route.get('/dashboard/data', async (req, res) => {
    const jmlKeluarga = await KK.count()
    const jmlWarga = await Individu.count()
    const lakiLaki = await Individu.count({where: {jenisKelamin: 'Laki laki'}})
    const perempuan = await Individu.count({where: {jenisKelamin: 'Perempuan'}})

    const islam = await Individu.count({where: {agama: 'Islam'}})
    const kristen = await Individu.count({where: {agama: 'Kristen'}})
    const katolik = await Individu.count({where: {agama: 'Katolik'}})
    const hindu = await Individu.count({where: {agama: 'Hindu'}})
    const budha = await Individu.count({where: {agama: 'Budha'}})
    const konghucu = await Individu.count({where: {agama: 'Konghucu'}})
    const agama = [islam,kristen,katolik,hindu,budha,konghucu]
    
    res.json({
        jmlKeluarga: jmlKeluarga? jmlKeluarga: 0,
        jmlWarga: jmlWarga? jmlWarga: 0,
        lakiLaki: lakiLaki? lakiLaki: 0,
        perempuan: perempuan? perempuan: 0,
        agama
    })
})

route.post('/exportdatabase', (req, res) => {
    jetpack.copy('./consequences.sqlite', req.body.path)
    res.json(__dirname)
})

route.post('/exporttoexcel', async (req, res) => {

    const styles = {
        header: {
          border:{
            bottom:{ 
              style: 'medium',
            }
          },
          font: {
            sz: 14,
            bold: true,
          }
        },
        cell: {
            font: {
                sz: 13,
                bold: false,
            },
            border:{
                bottom:{ 
                    style: 'thin',
                },
                top:{ 
                    style: 'thin',
                },
                left:{ 
                    style: 'thin',
                },
                right:{ 
                    style: 'thin',
                },
            }
        }
    };
    
    //Array of objects representing heading rows (very top)
    const kk_heading = [
    [{value: 'Laporan data kartu keluarga', style: {
        font: {
            sz: 22,
            bold: true,
        }
        }}],
    ];
    const individu_heading = [
    [{value: 'Laporan data warga', style: {
        font: {
            sz: 22,
            bold: true,
        }
        }}],
    ];
    
    //Here you specify the export structure
    const kk_specification = {
    noKk: {
        displayName: 'Nomor KK',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 140
    },
    kepalaKeluarga: {
        displayName: 'Kepala Keluarga',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 120
    },
    alamat: {
        displayName: 'Alamat',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 200
    },
    rt: {
        displayName: 'RT',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 30
    },
    rw: {
        displayName: 'RW',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 30
    },
    desa: {
        displayName: 'Desa',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 160
    },
    kecamatan: {
        displayName: 'Kecamatan',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 160
    },
    kabupaten: {
        displayName: 'Kabupaten',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 160
    },
    kodePos: {
        displayName: 'Kode Pos',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 80
    },
    provinsi: {
        displayName: 'Provinsi',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 160
    },
    ket: {
        displayName: 'ket',
        headerStyle: styles.header,
        cellStyle: styles.cell,
        width: 200
    },
    }

    const individu_specification = {
        nama: {
            displayName: 'Nama',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 200
        },
        nik: {
            displayName: 'NIK',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 160
        },
        noKk:{
            displayName: 'nomor KK',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 160
        },
        jenisKelamin: {
            displayName: 'Jenis Kelamin',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 100
        },
        tempatLahir: {
            displayName: 'Tempat Lahir',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 140
        },
        tanggalLahir: {
            displayName: 'Tanggal Lahir',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 160
        },
        agama: {
            displayName: 'Agama',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 120
        },
        pendidikan: {
            displayName: 'Pendidikan',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 140
        },
        pekerjaan: {
            displayName: 'Pekerjaan',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 140
        },
        statusKawin: {
            displayName: 'Status Kawin',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 140
        },
        statusDalamKeluarga: {
            displayName: 'Status Dalam Keluarga',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 140
        },
        kewarganegaraan: {
            displayName: 'Kewarganegaraan',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 100
        },
        noPaspor: {
            displayName: 'no Paspor',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 100
        },
        noKitab: {
            displayName: 'no Kitab',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 100
        },
        namaAyah: {
            displayName: 'Nama Ayah',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 160
        },
        namaIbu: {
            displayName: 'Nama Ibu',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 160
        },
        ket: {
            displayName: 'ket',
            headerStyle: styles.header,
            cellStyle: styles.cell,
            width: 200
        },
    }

    const kk_dataset = await KK.findAll()
    const individu_dataset = await Individu.findAll({include: [{
        model: KK,
        attributes: ['noKk']
    }]})


    individu_dataset.forEach(value => {
        value.noKk = value.kartukeluarga.noKk
        value.tanggalLahir = moment(value.tanggalLahir).add(1, 'days').format('Do MMMM YYYY')
    })

    const report = excel.buildExport(
    [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
        {
            name: 'Kartu keluarga', // <- Specify sheet name (optional)
            heading: kk_heading, // <- Raw heading array (optional)
            specification: kk_specification, // <- Report specification
            data: kk_dataset // <-- Report data
        },
        {
            name: 'Warga(individu)', // <- Specify sheet name (optional)
            heading: individu_heading, // <- Raw heading array (optional)
            specification: individu_specification, // <- Report specification
            data: individu_dataset // <-- Report data
        },
    ]
    )

    jetpack.write(req.body.path, report)
    res.json('Success')
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


//GET ADMIN
route.get('/settings/admin', async (req, res) => {
    let user = await Users.findAll()
    res.json(user)
})

route.post('/user', (req, res) => {
    Users.create({
        ...req.body
    })
    .then(() => res.json('Success'))
})

//DELETE ADMIN
route.delete('/settings/:id', (req, res) => {
    Users.destroy({where: {id: req.params.id}})
    .then(() => res.json('Success'))
})

//#region iNDIVIDU
//GET INDIVIDU
route.get('/individu/:pagesize/:page', async (req, res) => {
    let page = parseInt(req.params.page)
    let pagesize = parseInt(req.params.pagesize)


    const individu = await Individu.findAll({
        limit: pagesize,
        offset: pagesize * (page - 1),
        include: [{
            model: KK,
            attributes: ['id', 'noKk']
            
        }],
        order: [['createdAt', 'ASC']]
    })

    const jmlIndividu = await Individu.count()

    const next = page + 1
    const prev = page - 1
    const last = Math.ceil(jmlIndividu / pagesize)
    res.json({
        data: individu,
        links:{    
            nextPage: next <= last? next: null,
            prevPage: prev > 0?prev:null,
            currentPage: page,
            lastPage: last
        }
    })
})

//SEARCH INDIVIDU
route.get('/individu/:pagesize/:page/:searchQuery', async (req, res) => {
    let searchQuery = req.params.searchQuery
    let page = parseInt(req.params.page)
    let pagesize = parseInt(req.params.pagesize)

    const individu = await Individu.findAll({
        limit: pagesize,
        offset: pagesize * (page - 1),
        include: [{
            model: KK,
            attributes: ['id', 'noKk']
            
        }],
        order: [['createdAt', 'ASC']],
        where: {[Op.or]: [
            {
              nama: {
                [Op.like]: `%${searchQuery}%`
              }
            },
            {
              nik: {
                [Op.like]: `%${searchQuery}%`
              }
            },
            {
              noPaspor: {
                [Op.like]: `%${searchQuery}%`
              }
            },
            {
              agama: {
                [Op.like]: `%${searchQuery}%`
              }
            }
        ]}
    })

    const jmlIndividu = await Individu.count()

    const next = page + 1
    const prev = page - 1
    const last = Math.ceil(jmlIndividu / pagesize)
    res.json({
        data: individu,
        links:{    
            nextPage: next <= last? next: null,
            prevPage: prev > 0?prev:null,
            currentPage: page,
            lastPage: last
        }
    })
})

//CREATE INDIVIDU
route.post('/individu', async (req,res) => {
    Individu.create({
        nama: req.body.nama,
        nik: req.body.nik,
        jenisKelamin: req.body.jenisKelamin,
        tempatLahir: req.body.tempatLahir,
        tanggalLahir: req.body.tanggalLahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        pekerjaan: req.body.pekerjaan,
        statusKawin: req.body.statusKawin,
        statusDalamKeluarga: req.body.statusDalamKeluarga,
        kewarganegaraan: req.body.kewarganegaraan,
        noPaspor: req.body.noPaspor,
        noKitab: req.body.noKitab,
        namaAyah: req.body.namaAyah,
        namaIbu: req.body.namaIbu,
        ket: req.body.ket,
        kartukeluargaId: req.body.kartukeluargaId
    }).then(() => {
        res.json("Success")
    }).catch(err => res.status(404).json(err))
})

//EDIT INDIVIDU
route.post('/editIndividu', async (req, res) => {
    Individu.update({
        nama: req.body.form.nama,
        nik: req.body.form.nik,
        jenisKelamin: req.body.form.jenisKelamin,
        tempatLahir: req.body.form.tempatLahir,
        tanggalLahir: req.body.form.tanggalLahir,
        agama: req.body.form.agama,
        pendidikan: req.body.form.pendidikan,
        pekerjaan: req.body.form.pekerjaan,
        statusKawin: req.body.form.statusKawin,
        statusDalamKeluarga: req.body.form.statusDalamKeluarga,
        kewarganegaraan: req.body.form.kewarganegaraan,
        noPaspor: req.body.form.noPaspor,
        noKitab: req.body.form.noKitab,
        namaAyah: req.body.form.namaAyah,
        namaIbu: req.body.form.namaIbu,
        ket: req.body.form.ket,
        kartukeluargaId: req.body.form.kartukeluargaId
    },{
        where: {
            id: req.body.id
        }
    })
    .then(() => res.json("Success"))
})

//DELETE INDIVIDU
route.put('/individu', (req, res) => {
    Individu.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.json('Success')
    })
})
//#endregion


//#region KARTU KELUARGA

//GET KK
route.get('/kk/:pagesize/:page', async (req, res) => {
    let page = parseInt(req.params.page)
    let pagesize = parseInt(req.params.pagesize)


    const kk = await KK.findAll({
        limit: pagesize,
        offset: pagesize * (page - 1),
        include: [{
            model: Individu,
            attributes: ['id', 'nama']
        }]
    })

    const jmlKk = await KK.count()

    const next = page + 1
    const prev = page - 1
    const last = Math.ceil(jmlKk / pagesize)
    res.json({
        data: kk,
        links:{    
            nextPage: next <= last? next: null,
            prevPage: prev > 0?prev:null,
            currentPage: page,
            lastPage: last
        }
    })
})

//CREATE KK
route.post('/kk', async (req,res) => {
    KK.create({
        ...req.body
    }).then(() => res.json("Success"))
    .catch(() => res.status(403).json("Error"))
})

//EDIT KK
route.post('/editkk', async (req, res) => {

    KK.update({
        noKk: req.body.data.noKk,
        kepalaKeluarga: req.body.data.kepalaKeluarga,
        alamat: req.body.data.alamat,
        rt: req.body.data.rt,
        rw: req.body.data.rw,
        desa: req.body.data.desa,
        kecamatan: req.body.data.kecamatan,
        kabupaten: req.body.data.kabupaten,
        kodePos: req.body.data.kodePos,
        provinsi: req.body.data.provinsi,
        ket: req.body.data.ket,
    },{
        where: {
            id: req.body.id
        }
    })
    .then(() => res.json("Success"))
})

//DELETE KK
route.put('/kk', (req, res) => {
    KK.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.json('Success')
    })
})

//SEARCH KK
route.get('/kk/:pagesize/:page/:searchQuery', async (req, res) => {
    let searchQuery = req.params.searchQuery
    let page = parseInt(req.params.page)
    let pagesize = parseInt(req.params.pagesize)


    const kk = await KK.findAll({
        limit: pagesize,
        offset: pagesize * (page - 1),
        include: [{
            model: Individu,
            attributes: ['id', 'nama']
        }],
        where: {[Op.or]: [
            {
              noKk: {
                [Op.like]: `%${searchQuery}%`
              }
            },
            {
              kepalaKeluarga: {
                [Op.like]: `%${searchQuery}%`
              }
            },
            {
              alamat: {
                [Op.like]: `%${searchQuery}%`
              }
            },
            {
              desa: {
                [Op.like]: `%${searchQuery}%`
              }
            }
          ]}
    }).catch(err => res.json(err))

    const jmlKk = await KK.count()

    const next = page + 1
    const prev = page - 1
    const last = Math.ceil(jmlKk / pagesize)
    res.json({
        data: kk,
        links:{    
            nextPage: next <= last? next: null,
            prevPage: prev > 0?prev:null,
            currentPage: page,
            lastPage: last
        }
    })
})

//#endregion    

//#region TODOS
//GET TODOS
route.get('/todos', async (req, res) => {
    const todos = await Todos.findAll()

    res.json(todos)
})


//CREATE TODOS
route.post('/todos', async (req, res) => {
    Todos.create({
        ...req.body
    }).then(() => res.json('success'))
})

//DELETE TODOS
route.delete('/todos/:id', async (req,res) => {
    Todos.destroy({where: {
        id: req.params.id
    }}).then(() => res.json('success'))
})
//#endregion


//#region FILE GALERI

//GET GALERI
route.get('/galeri', async (req, res) => {
    const galeri = await Galeri.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['createdAt', 'DESC'],
        ]        
    })
    res.json(galeri)
})

//CREATE GALERI
route.post('/upload', (req, res) => {
    if(req.files.fileList.length){
        req.files.fileList.forEach(value => {
            let path = 'uploads/' + value.md5 + '.' + value.name.split('.').pop()
            value.mv(path)
            Galeri.create({
                path
            })
        })
    }else{
        let path = 'uploads/' + req.files.fileList.md5 + '.' + req.files.fileList.name.split('.').pop()
        req.files.fileList.mv(path)
        Galeri.create({
            path
        })
    }
    res.json("Success")
})

route.put('/galeri', async(req, res) => {
     
    await Galeri.destroy({where: {
        id: req.body.id
    }})
    let remaining = await Galeri.count({where: {path : req.body.path}})
    if(!remaining) fs.unlink(req.body.path) 
    res.json("Success")
})



//#endregion



//Vuex listing
route.get('/vuex/kk', async (req, res) => {
    const kkVuex = await KK.findAll({
        attributes: ['id','noKk']
    })

    res.json(kkVuex)
})

route.listen(30258)
