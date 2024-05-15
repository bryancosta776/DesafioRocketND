import http from 'node:http'

import {routes} from './routes.js'
import { json } from './middleware/json.js';


const server = http.createServer(async(req, res) => {
    const {method, path} = req

    await json(req, res);
   
    const route = routes.find(route => {
        return route.method === method && route.path === path
    })
    
    if(route){
        return route.handler(req, res)
    }
    

    return res.writeHead(404).end()

})

server.listen(3434, () => {
    console.log('Server started!')
})