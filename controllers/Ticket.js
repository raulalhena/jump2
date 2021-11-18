import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default class Ticket {

    //**
    // GET ALL TICKET 
    //*
    async getAll(){
        let ticket;

        try{
            ticket = await prisma.ticket.findMany();
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
        }

        if(ticket){
            this.manageResult(200, "Ticket found", ticket);
        }else{
            this.manageResult(400, "Ticket not found", null);
        }

        return this.result;
    }

    //**
    // GET SPECIFIC TICKET 
    //*
    async get(_id){
        let ticket;

        try{
            ticket = await prisma.ticket.findUnique({
                where: {
                    id: _id
                },
            });
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
        }

        if(ticket){
            this.manageResult(200, "Ticket found", ticket);
        }else{
            this.manageResult(400, "Ticket not found", null);
        }

        return this.result;

    }

    //**
    // CREATE TICKET 
    //*
    async create(ticketData){
        let newTicket;

        try{
            newTicket = await prisma.ticket.create({
                data: {
                ...ticketData,
                product: {
                    connect: {
                        id: ticketData.product
                    }
                }
                },
            });
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
        }

        if(newTicket){
            this.manageResult(200, "New ticket created", newTicket);
        }else{
            this.manageResult(500, "Error: ticket not created", null);
        }

        return this.result;
    }

    //**
    // DELETE TICKET 
    //*
    async delete(_id){
        let deletedTicket;

        try{
            deletedTicket = await prisma.ticket.delete({
                where: {
                    id: _id
                },
            });
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
        }

        console.log(deletedTicket);
        if(deletedTicket){
            this.manageResult(200, "Ticket deleted successfully", deletedTicket);
        }else{
            this.manageResult(400, "Ticket not deleted", null);
        } 
        
        return this.result;
    }

    //**
    // SHOW ANALITYCS 
    //*
    async showAnalitycs(){
        const result = {
            code: 200,
            totalValue: null,
            numTypeProductSold: new Map([
                ["PC", null],
                ["Laptops", null],
                ["Phones", null],
                ["Tablets", null],
                ["Other", null]
            ]),
            paymentType: null
        }

        try{

            // Getting Payment Type tickets
            result.paymentType = await prisma.ticket.groupBy({
                by: ["paymentType"],
                _count: {
                    paymentType: true
                }
            });

            // Getting sold products
            const amountProductSold = await prisma.ticket.groupBy({
                by: ["productId"],
                _sum: {
                    amount: true
                }
            });

            // Getting all products
            const allProducts = await prisma.product.findMany();
            
            allProducts.forEach((product) => {
                amountProductSold.forEach((soldProduct) => {
                    if(product.id === soldProduct.productId){
                        result.totalValue += product.price * soldProduct._sum.amount;
        
                        if(result.numTypeProductSold.has(product.description)){
                            result.numTypeProductSold.set(
                                product.description, 
                                result.numTypeProductSold.get(product.description) + 1
                            );
                        }
                    }
                });
            });

        }catch(error) {
            // console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
            console.log(error);
        }

        return result;
    }

    //**
    // MANAGE RESULT, FILL THE STANDARD RESPONSE OBJECT
    //*
    manageResult(code, message, data){
        this.result = {
            code,
            message,
            data
        };

        return this.result;
    }
}