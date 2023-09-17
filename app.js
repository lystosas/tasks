const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const tasks = [
    {
        id:1,
        descripcion: "Iniciar proyecto con node",
        finalizada: true
    },
    {
        id:2,
        descripcion: "Instalar Express",
        finalizada: false
    },
    {
        id:3,
        descripcion: "Hacer los endpoints",
        finalizada: false
    }
]

let nextId = 4;

//Ruta mostrar la pagina principal
app.get("/", (req, res) => {
    res.send("Tasks Aplication");
});

//Ruta para listar todos los libros
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

//Ruta para Crear
app.post("/tasks", (req, res) => {
    const task = {
        id: nextId++,
        descripcion: req.body.descripcion,
        finalizada: req.body.finalizada
    }

    tasks.push(task);

    res.json(task);
});

//Ruta para actualizar 
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if(task){
        task.descripcion = req.body.descripcion;
        task.finalizada = req.body.finalizada;
        res.json(task);
    }else{
        res.status(404).send("Tarea no encontrada");
    }
});

app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if(index !== -1){
        tasks.splice(index, 1);
        res.status(204).send("Tarea eLiminada");
    }else{
        res.status(404).send("Tarea no encontrada");
    }
});

app.listen(port, (req, res) => {
    console.log(`Server running on http://localhost:${port}/`);
});

