import Sequelize from 'sequelize'


const sequelize = new Sequelize({
  dialect: 'sqlite3',
  storage: './db.sqlite'
})


