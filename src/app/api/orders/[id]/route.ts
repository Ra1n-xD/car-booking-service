import Order from '@/models/Order';
import connect from '@/utils/db';

import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await connect();

        await Order.findByIdAndDelete(id);

        return new NextResponse('Post has been deleted', { status: 200 });
    } catch (error) {
        return new NextResponse('Error in response of DB', { status: 500 });
    }
}
