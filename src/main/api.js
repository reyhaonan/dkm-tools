import { Router } from 'electron-routes'

const route = new Router('app')

route.get('api/uy', (req, res) => {
  res.json({
    hello: 'world',
  })
})