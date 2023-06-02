const Task = require("../models/task");

const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.get("/all", async (req, res) => {
  //obtener el id de la persona
  const dcdtoken = jwt.decode(req.header("auth-token"));
  const iduser = dcdtoken.id;

  const tasks = await Task.find({ idperson: iduser });
  res.status(200).json({
    msg: "Esta son las tareas",
    data: tasks,
  });
});
router.get("/:idTask", async (req, res) => {
  const taskid = req.params.idTask;
  const dcdtoken = jwt.decode(req.header("auth-token"));
  const iduser = dcdtoken.id;

  //Buscar todas las tareas del usuario
  const task = await Task.findOne({ _id: taskid });
  if (task != null && task.idperson === iduser) {
    res.status(200).json({
      msg: "Tarea encontrada con exito",
      data: task,
    });
  } else {
    res.status(200).json({
      msg: "Esta tarea no pertenece a este usuario",
      data: null,
    });
  }
});
router.post("/new", async (req, res) => {
  //obtener el id de la persona
  const dcdtoken = jwt.decode(
    req.header("auth-token"),
    process.env.TOKEN_SECRET
  );
  const iduser = dcdtoken.id;

  const task = new Task({
    title: req.body.title,
    description: req.body.descript,
    datet: req.body.startDate,
    timet: req.body.time,
    idperson: iduser,
  });

  try {
    const saveTask = await task.save();
    res.status(200).json({
      msg: "Tarea agregada correctamente!",
      data: saveTask,
    });
  } catch (e) {
    res.status(400).json({ e });
  }
});
router.delete("/delete/:idtask", async (req, res) => {
  const idtask = req.params.idtask;
  const token = req.header("auth-token");
  const dcdtoken = jwt.decode(token, process.env.TOKEN_SECRET);
  const iduser = dcdtoken.id;

  const taskdb = await Task.findById(idtask);
  if (taskdb.idperson === iduser) {
    try {
      await Task.findByIdAndDelete(idtask);
      res.status(200).json({
        error: null,
        msg: "Tarea eliminada con exito!",
      });
    } catch (error) {
      res.status(400).json({ error: null, msg: error });
    }
  } else {
    res
      .status(400)
      .json({ error: true, msg: "Usuario sin acceso a esta accion" });
  }
});
router.put("/update/:idtask", async (req, res) => {
  const token = req.header("auth-token");
  const dcdtoken = jwt.decode(token, process.env.TOKEN_SECRET);
  const userid = dcdtoken.id;
  const taskid = req.params.idtask;

  //verificando si el usuario es quien creo esta tarea
  const taskdb = await Task.findById(taskid);
  if (taskdb.idperson === userid) {
    try {
      await Task.findByIdAndUpdate(taskid, req.body);
      res.status(200).json({ msg: "Tarea actualizada!" });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  } else {
  }
});

module.exports = router;
