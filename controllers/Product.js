import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default class Product {

    //**
    // GET ONE PRODUCT 
    //*
    async get(_id){
        let product;
        
        try{
            product = await prisma.product.findUnique({
                where: {
                    id: _id
                },
            });
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
        }

        if(product){
            this.manageResult(200, "Product found", product);
        }else{
            this.manageResult(400, "Product not found", null);
        }

        return this.result;
    }

    //**
    // CREATE A NEW PRODUCT
    //*
    async create(productData){
        let newProduct;
        
        try{
            newProduct = await prisma.product.create({
                data: {
                ...productData
                },
            });
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta}`);
        }

        if(newProduct){
            this.manageResult(200, "New product created", newProduct);
        }else{
            this.manageResult(500, "Error: product not created", null);
        }

        return this.result;
    }

    //**
    // UPDATE A PRODUCT
    //*
    async update(productData){
        let updatedProduct;

        try{
            updatedProduct = await prisma.product.update({
                where: {
                    id: productData.id
                },
                data: {
                    ...productData,
                },
            });
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
        }

        if(updatedProduct){
            this.manageResult(200, "Product updated successfully", updatedProduct);
        }else{
            this.manageResult(400, "Product not updated", null);
        }
        
        return this.result;
    }

    //**
    // DELETE A PRODUCT
    //*
    async delete(_id){
        let deletedProduct;

        try{
            deletedProduct = await prisma.product.delete({
                where: {
                    id: _id
                },
            });
        }catch(error){
            console.log(`CODE: ${error.code} \nMESSAGE: ${error.meta.cause}`);
        }

        console.log(deletedProduct);
        if(deletedProduct){
            this.manageResult(200, "Product deleted successfully", deletedProduct);
        }else{
            this.manageResult(400, "Product not deleted", null);
        } 
        
        return this.result;
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