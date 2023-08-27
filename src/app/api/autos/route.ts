import Auto from '@/models/Auto';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connect();
        const autos = await Auto.find();

        return new NextResponse(JSON.stringify(autos), { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
