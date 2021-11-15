import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default class Product {

    async get(id){
        return `Get product ${id}`;
    }

    async create(productData){
        const newProduct = await prisma.product.create({
            data: {
              ...productData
            },
        });

        console.log(newProduct);
        if(newProduct) return newProduct;

    }

    async update(id){
        return `Updated product ${id}`;
    }

    async delete(id){
        return `Deleted product ${id}`;
    }
}