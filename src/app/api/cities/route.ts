import City from '@/models/City';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connect();
        const cities = await City.find();

        return new NextResponse(JSON.stringify(cities), { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
