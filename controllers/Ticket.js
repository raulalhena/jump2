import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default class Ticket {

    async getAll(){
        const tickets = await prisma.ticket.findMany()
        console.log(tickets);

        if(tickets) return tickets;

        if(!tickets){
            return "404";
        }
    }

    async get(id){
        return `Showing ticket ${id}`;
    }

    async create(){
        const newTicket = await prisma.ticket.create({
            data: {
              name: 'Alice',
              email: 'alice@prisma.io',
            },
        });
    }

    async delete(id){
        return `Deleted ticket ${id}`;
    }

    async showAnalitycs(){
        return "Showing analitycs report";
    }
}