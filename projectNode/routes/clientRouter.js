const express = require("express");
const { ClientsModel } = require("../models/clientsModel");

const clientRouter = express.Router();
const clientsModel = new ClientsModel();



clientRouter.post("/", async (req, res) => {
    try {
        const result = await clientsModel.create(req.body);
        res.status(201).json({ message: "Cliente registrado con éxito", data: result });
    } catch (error) {
        console.error("Error al registrar al cliente", error.message)
        res.status(500).json({ error: "Error al registrar el cliente", details: error.message });
        
    }
});

clientRouter.get("/", async (req, res) => {
    try {
      const clients = await clientsModel.getClients();
  
      if (!clients || clients.length === 0) {
        return res.status(200).json({ message: "No hay clientes disponibles" });
      }
  
      res.status(200).json(clients); 
    } catch (err) {
      console.error("Error al obtener clientes:", err.message);
      res.status(500).json({ error: "Error al obtener los clientes" });
    }
  });

  clientRouter.put("/", async (req, res) => {
    try {
      const result = await clientsModel.update(req.body);
      res.json({ message: "Cliente actualizado con éxito", result });
    } catch (err) {
      res.status(500).json({ error: "Error al actualizar el cliente" });
    }
  });


  clientRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try{
      const result = await clientsModel.deleteClients(id);
      res.json(result)
    }catch(error){
      console.error("Error al eliminar cliente", error)
      res.status(500).json({error: "Error al eliminar cliente"});
    }
  })


  

module.exports = { clientRouter };