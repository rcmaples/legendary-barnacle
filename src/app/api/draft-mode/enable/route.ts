import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { client } from '@/sanity/lib/client';

// const token = process.env.SANITY_API_READ_TOKEN;
const token = process.env.SANITY_API_WRITE_TOKEN;
const clientWithToken = client.withConfig({ token });

export async function GET(request: NextRequest) {
  // if (!process.env.SANITY_API_READ_TOKEN) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    // return new Response('Missing environment variable SANITY_API_READ_TOKEN', {
    return new Response('Missing environment variable SANITY_API_WRITE_TOKEN', {
      status: 500,
    });
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
