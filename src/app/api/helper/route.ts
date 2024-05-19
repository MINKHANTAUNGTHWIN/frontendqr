import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const GET = async (req: Request, res: NextResponse) => {
    const helpers = await prisma.helper.findMany();
    return NextResponse.json(helpers);
}