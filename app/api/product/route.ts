import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    // Route protection is handled in middleware.ts

    const body = await req.json();
    const { name, category, price, unit, qantity } = body;

    if (!name || !category)
      return new NextResponse("Missing Information", { status: 400 });

    const product = await prismadb.product.create({
      data: {
        name,
        category,
        price,
        unit,
        qantity,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PORDUCT POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
