import Order from '@/models/Order';
import connect from '@/utils/db';

import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        await connect();

        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json('Not find order', { status: 400 });
        }

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
};
