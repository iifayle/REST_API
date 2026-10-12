import express from 'express'
import {tasks} from "./data.js"

const app = express();
const PORT = 3000;

app.use(express.json())

function Logging(req,res,next){
    console.log('Hello avrivan')
    next();
}

app.use(Logging);

app.get('/',(req, res)=>{
    res.json({message: 'Hello World'})
})

app.get('/tasks', (req,res)=>{
    res.json({data: tasks})
})

app.get('/tasks/:id', (req,res)=>{
    const taskID = Number(req.params.id);
    const task = tasks.find(task => task.id === taskID)
    if(task){
    res.json({ data: task})
    }else{
        res.status(404).json({error: "Nothing found"})
    }
})

app.post('/tasks', (req,res)=>{
    const title = req.body.title;
    const newTask = {id: tasks.length+1, title}
    tasks.push(newTask)

    res.status(201).json({data: newTask})
})

app.put('/tasks/:id',(req,res)=>{
    const taskID = Number(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskID)
    if(taskIndex!==-1){
        tasks[taskIndex].title=req.body.title
        res.json(tasks[taskIndex])
    }else{
        res.status(404).json({error: "Nothing found"})
    }
})

app.delete('/tasks/:id',(req,res)=>{
    const taskID = Number(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskID)
    if(taskIndex!==-1){
        tasks.splice(taskIndex,1)
        res.json({data: tasks})
    } else{
         res.status(404).json({error: "Nothing found"})
    }
})

app.use((req,res)=>{
    res.status(404).json({error: "Nothing found"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})