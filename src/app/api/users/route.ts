// import Auto from '@/models/City';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connect();
        // const autos = await Auto.find();

        return NextResponse.json({ user: 123 }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
