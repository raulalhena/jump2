import express from "express";
import Ticket from "../controllers/Ticket.js";
import Product from "../controllers/Product.js";

const router = express.Router();

const ticket = new Ticket();
const product = new Product();

// ROOT ROUTE, to check API connection
router.get("/", (req, res) => {
    res.status(200).json({
        message: "API connected successfully"
    });
});

// **
// ROUTES TICKET
// **

// Get all tickets
router.get("/ticket", (req, res) => {
    res.json(ticket.getAll());
});

// Get a ticket with id = ticketId
router.get("/ticket/:ticketId", (req, res) => {
    res.json(ticket.get(req.params.ticketId));
});

// Create a new ticket
router.post("/ticket", (req, res) => {
    res.json(ticket.create());
});

// Delete a ticket with id = ticketId
router.delete("/ticket/:ticketId", (req, res) => {
    res.json(ticket.delete(req.params.ticketId));
});

// Show the analitycs report
router.get("/ticket/analitycs", (req, res) => {
    res.json(ticket.showAnalitycs());
});

// **
// ROUTES PRODUCT
// **

// Get a product with id = productId
router.get("/product/:productId", (req, res) => {
    res.json(product.get(req.params.productId));
});

// Create a new product
router.post("/product", (req, res) => {
    res.json(product.create(req.body));
});

// Update a product with id = productId
router.put("/product/:productId", (req, res) => {
    res.json(product.update(req.params.productId));
});

// Delete a product with id = productId
router.delete("/product/:productId", (req, res) => {
    res.json(product.delete(req.params.productId));
});

export default router;