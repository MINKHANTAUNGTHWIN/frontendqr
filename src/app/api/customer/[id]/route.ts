import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";


export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);

  const customer = await prisma.customer.findFirst({ where: { id } });

  if (customer) {
    const { customerName } = customer;
    return NextResponse.json(customerName);
  } else {
    // 顧客が見つからない場合の処理
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }
};
