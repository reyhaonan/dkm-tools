import Sequelize from 'sequelize'

const db = {}
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
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
})

db.Users = Users
db.connection = sequelize
db.Sequelize = Sequelize


export default db