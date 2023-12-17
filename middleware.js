  import { NextResponse } from 'next/server';
  import { getUserId } from './app/components/serverAction';
  
  // This function can be marked `async` if using `await` inside
  export async function middleware(request) {
    const res = NextResponse.next()

    const cookie = await getUserId();

    // no cookie found means not signed in, will be redirected to /login if they try to go to /protected
    if (typeof cookie == 'undefined' && request.nextUrl.pathname === '/protected') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // if logged in and they try to go to home page it will send them to /posts
    if (cookie && request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/posts', request.url))
    }

    return res
  }
  
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: ['/', '/protected'],
  }