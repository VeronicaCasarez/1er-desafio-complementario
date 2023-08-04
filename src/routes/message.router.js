import { Router } from "express";

import Messages from "../dao/mongoManagers/messageManager.js";


const router=Router();
const messageManager=new Messages();


router.post('/', async (req, res) => {
  try{ 
  const { user, message } = req.body;
  // Guardar el mensaje en la base de datos
  await messageManager.save({ user, message });
  res.redirect('/api/messages');
} catch (error) {
  res.status(500).json({
      message:"Error mensajes",
      error:error
  });
}
})


router.get('/', async (req, res) => {
  try{  
  // Obtener todos los mensajes de la base de datos
  const messages = await messageManager.getAll();
  res.render('chat', { messages });
  } catch (error) {
    res.status(500).json({
        message:"Error al obtener mensajes",
        error:error
    });
}
});


export default router;

