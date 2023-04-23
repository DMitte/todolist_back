const Task = require('../models/task');
const User = require('../models/users');

const router = require('express').Router();

router.get('/:idperson', async(req,res) => {
    const tasks =  await Task.find({idperson: req.params.idperson});
    
    return res.json({error: null, tareas: tasks, msg: 'Exito!'})
})
router.get('/:idTask', async(req,res) => {
    const taskid = req.params.idTask

    //Buscar todas las tareas del usuario
    const task = await Task.findOne({_id: taskid})
    res.status(200).json({
        data: task
    })
})
router.post('/new', async(req,res) =>{
    //Verificacion de que usuario es real
    const iduser = req.body.idperson
    const userdb = await User.findById(iduser)
    if(!userdb) return res.status(400).json({msg: 'Error al encontrar el usuario'})

    const newtask = new Task({
        title: req.body.title,
        tags: req.body.tags,
        datet: req.body.date,
        description: req.body.description,
        idperson: iduser
    })
    try{
        await newtask.save();
        res.status(200).json({
            msg: 'Tarea Guardada Con Exito!'
        })
    }catch (error){
        res.status(400).json({error})
    }
})
router.delete('/delete/:iduser/:idtask', async(req,res) => {
    const idtask = req.params.idtask
    const iduser = req.params.iduser

    //buscando al usuario
    const userdb = await User.findById(iduser)
    if(!userdb) res.status(400).json({msg: 'Usuario no encontrado'})

    const taskdb = await Task.findById(idtask)
    if(taskdb.idperson === iduser){
        try{
            await Task.findByIdAndDelete(idtask)
            res.status(200).json({
                msg: 'Tarea eliminada con exito!'
            })
        }catch (error){
            res.status(400).json({msg: error})
        }
    }else{
        res.status(400).json({msg: 'Usuario sin acceso a esta accion'})
    }
    
})
router.put('/update/:iduser/:idtask', async(req,res) =>{
    const userid = req.params.iduser
    const taskid = req.params.idtask

    //verificando si el usuario es quien creo esta tarea
    const taskdb = await Task.findById(taskid)
    if(taskdb.idperson === userid){
        try{
            await Task.findByIdAndUpdate(taskid, req.body)
            res.status(200).json({msg: 'Tarea actualizada!'})
        }catch(error){
            res.status(400).json({msg: error})
        }
    }else{

    }

})

module.exports = router;