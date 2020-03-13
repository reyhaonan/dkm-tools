import { Router } from 'electron-routes'
import { User } from './database'
const route = new Router('app')

route.get('api/uy', async function(req, res) {
  await User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
    res.json(users)
  })
})