import { NextResponse, type NextRequest } from 'next/server'
import { decrypt, encrypt } from './lib/db/helpers/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // If a user is on the dashboard without a session, redirect to the homepage
  if (request.nextUrl.pathname.match('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (!session)
    return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Expires in a week

  // If theres a sesssion but a user is at the login page, redirect them to the dashboard with a new cookie
  if (request.nextUrl.pathname.match('/')) {
    const res = NextResponse.redirect(new URL('/dashboard', request.url))

    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    })

    return res
  }

  // Otherwise business as usuall, pass the new cookie
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
}