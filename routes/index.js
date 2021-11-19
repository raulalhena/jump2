import express from "express";
import Ticket from "../controllers/Ticket.js";
import Product from "../controllers/Product.js";

const router = express.Router();

//**
// Instantiation classes Ticket and Product
//*
const ticket = new Ticket();
const product = new Product();

// **
// ROOT ROUTE, to check API connection
// *
router.get("/", (req, res) => {
    res.status(200).json({
        message: "API connected successfully"
    });
});

// **
// ROUTES TICKET
// *

// Get one or all tickets
router.get("/ticket", async (req, res) => {
    let result;

    // If id is passed in req.body, get one ticket, 
    // if is not, get all tickets
    if(req.body.id){
        result = await ticket.get(req.body.id);
    }else{
        result = await ticket.getAll();
    }

    res.status(result.code).json(result);
});

// Create a new ticket
router.post("/ticket", async (req, res) => {
    const result = await ticket.create(req.body);
    res.status(result.code).json(result);
});

// Delete a ticket
router.delete("/ticket", async (req, res) => {
    const result = await ticket.delete(req.body.id);
    res.status(result.code).json(result);
});

// Show the analitycs report
router.get("/ticket/analitycs", async (req, res) => {
    const result = await ticket.showAnalitycs();
    res.status(result.code).json(result);
});

// **
// ROUTES PRODUCT
// *

// Get a product
router.get("/product", async (req, res) => {
    const result = await product.get(req.body.id);
    res.status(result.code).json(result);
});

// Create a new product
router.post("/product", async (req, res) => {
    const result = await product.create(req.body);
    res.status(result.code).json(result);
});

// Update a product
router.put("/product", async (req, res) => {
    const result = await product.update(req.body);
    res.status(result.code).json(result);
});

// Delete a product
router.delete("/product", async (req, res) => {
    const result = await product.delete(req.body.id);
    res.status(result.code).json(result);
});

export default router;