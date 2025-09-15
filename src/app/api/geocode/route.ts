import { NextResponse } from 'next/server';
import opencage from 'opencage-api-client';

export async function POST(request: Request) {
  const { q } = await request.json();
  const key = process.env.OPENCAGE_API_KEY; // Use a server-only env var
  const result = await opencage.geocode({ q, key, no_annotations: 1 });
  return NextResponse.json(result);
}
