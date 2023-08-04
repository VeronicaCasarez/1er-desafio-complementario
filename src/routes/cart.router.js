import { Router } from "express";

import Carts from "../dao/mongoManagers/cartManager.js";
import productsModel from "../dao/models/product.js";
import Products from '../dao/mongoManagers/productManager.js'; 

const router = Router();
const carts = new Carts();
const productsManager = new Products(); 


// Mostrar el carrito
router.get('/', async (req, res) => {
  try {
    const showCart = await carts.getAll();
    res.json({message: "Este es el carrito",data:showCart});
  } catch (error) {
    res.status(500).json({
        message:"Error al mostrar el carrito",
        error:error
    });
  }
});

    
  // Crear un nuevo carrito
  router.post('/', async (req, res) => {
    const cartData = req.body;
    try {
      
      const newCarts = await carts.save(cartData);
      
      res.json({message:"Carrito creado",data:newCarts});
    } catch (error) {
        res.status(500).json({
            message:"Error al crear el carrito",
            error:error
        });
    }
  });
  

// Agregar un producto al carrito
// router.post("/:cid/product/:pid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;

//     const cartData = await carts.getById(cartId);

//     if (!cartData) {
//       res.status(404).json({ error: "Carrito no encontrado" });
//       return;
//     }

//     const existingProduct = await products.getById(productId);

//     if (existingProduct) {
//       const cartUpdated = await carts.update(cartId, existingProduct);
//       res.json({
//         message: "Producto agregado al carrito correctamente",
//         data: cartUpdated,
//       });
//     } else {
//       res.status(404).json({ error: "Producto no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al agregar el producto al carrito",
//       error: error,
//     });
//   }
// });
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cartData = await carts.getById(cartId);

    if (!cartData) {
      res.status(404).json({ error: "Carrito no encontrado" });
      return;
    }

    const existingProduct = await productsManager.getById(productId);
   
    if (existingProduct) {
      const cartUpdated = await carts.update(cartId, existingProduct);
      res.json({
        message: "Producto agregado al carrito correctamente",
        data: cartUpdated,
      });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar el producto al carrito",
      error: error,
    });
  }
});
  
  
  // Eliminar el carrito
  router.delete('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    try {
      const cartDeleted= await carts.delete(cartId);
      res.json({message:"Carrito eliminado",data:cartDeleted});
    } catch (error) {
        res.status(500).json({
            message:"Error al eliminar el carrito",
            error:error
        });
    }
  });
  
  export default router;