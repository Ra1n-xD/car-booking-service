import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connect();
        const users = await User.find();

        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
