import Order from '@/models/Order';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connect();
        const orders = await Order.find();

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
