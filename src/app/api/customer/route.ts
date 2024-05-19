import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
//import prisma from "@/lib/PrismaClient";
const prisma = new PrismaClient()

export const POST = async (req: Request, res:NextResponse) => {
    const { customerName } = await req.json();

    const new_customer = await prisma.customer.create({
        data: {
            customerName,
        },
    });
    return NextResponse.json(new_customer);
}

export const GET = async (req: Request, res: NextResponse) => {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
}