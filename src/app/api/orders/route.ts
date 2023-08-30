import Order from '@/models/Order';
import connect from '@/utils/db';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connect();

        const userEmail = request.headers.get('userEmail');

        if (!userEmail) {
            return NextResponse.json('Not find email', { status: 400 });
        }

        const orders = await Order.find({ userId: userEmail });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
