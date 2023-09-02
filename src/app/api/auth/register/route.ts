import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    await connect();

    const newUser = new User({
        email,
        password // потом добавлю хеширование
    });

    try {
        await newUser.save();
        return NextResponse.json('User has been created', { status: 201 });
    } catch (error: any) {
        console.log('aboa');
        return NextResponse.json(JSON.stringify(error.message), { status: 500 });
    }
}
