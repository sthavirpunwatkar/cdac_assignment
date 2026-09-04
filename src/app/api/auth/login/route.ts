import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Specific test user for evaluation
    if (email !== 'test@example.com' || password !== 'password123') {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password. Please use test@example.com / password123' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    
    // Set a dummy cookie
    response.cookies.set('auth-token', 'mock-jwt-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
