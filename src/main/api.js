import { Router } from 'electron-routes'
const route = new Router('app')
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});
//TODO: https://www.techiediaries.com/electron-data-persistence/  

route.get('api/uy', async function(req, res) {
})