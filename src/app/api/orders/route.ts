import Order from '@/models/Order';
import connect from '@/utils/db';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connect();

        const userEmail = request.headers.get('userEmail');

        if (!userEmail) {
            return NextResponse.json({ error: 'Not find email' }, { status: 400 });
        }

        const orders = await Order.find({ userId: userEmail });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const newOrder = new Order(body);

    try {
        await connect();

        if (!body) {
            return NextResponse.json({ error: 'Order not added' }, { status: 400 });
        }

        await newOrder.save();

        return NextResponse.json(newOrder, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
