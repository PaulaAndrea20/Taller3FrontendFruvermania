// Rutas del proyecto

/*Implementar objeto Router del modulo de express, para crear una instancia que permitar
manejar todas las solicitudes Http*/

import { Router } from "express";

import { getProductos, getProducto,postProductos, putProductos, deleteProductos } from "../Controllers/controllerProductos.js";
import { getClientes, getCliente, postClientes, putClientes, deleteClientes, login } from '../Controllers/controllerClientes.js';
import { getCompras, postCompras, putCompras, deleteCompras } from '../Controllers/controllerCompras.js';

//Crear Instancia
const router = Router();


//Definir rutas

//GET method route
router.get('/',(req, res)=>{
    res.send('GET Pagina principal');
  });

//Productos
router.get("/productos", getProductos);
router.get("/productos/:idProducto", getProducto);
router.post("/productos",postProductos);
router.put("/productos/:idProducto",putProductos);
router.delete("/productos/:idProducto", deleteProductos);

// CLientes
router.get("/clientes", getClientes);
router.get("/clientes/:idCliente", getCliente);
router.post("/clientes", postClientes);
router.put("/clientes/:idCliente", putClientes);
router.delete("/clientes/:idCliente", deleteClientes);

// Compras
router.get("/compras", getCompras);
router.post("/compras", postCompras);
router.put("/compras/:idCompra", putCompras);
router.delete("/compras/:idCompra", deleteCompras);

//Login
router.post('/login', login)

export default router;