import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'

import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler:  (req, res) => {
        const { search } = req.query

        const tasks = database.select('tasks', {
        title: search,
        description: search
        })
        return res.end(JSON.stringify(tasks))
    }

    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {title, description } = req.body
           

            const task = {
                id: randomUUID(),
                title,
                description,                    
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()         
               
            }
            
            database.insert('tasks', task)
            return res.writeHead(201).end()
        }
    }
]

