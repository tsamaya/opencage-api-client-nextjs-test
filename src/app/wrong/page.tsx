'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import opencage from 'opencage-api-client';
// import { geocode } from 'opencage-api-client'; // works as well
import type { GeocodingResponse } from 'opencage-api-client';
import Footer from '@/components/Footer';

export default function WrongUsageClientSide() {
  // In production, you should use a server-side API route to hide your API key
  // https://nextjs.org/docs/app/building-your-application/routing/api-routes

  const [clientResult, setClientResult] = useState<GeocodingResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  async function handleClientGeocode() {
    setLoading(true);
    // This is a WRONG usage, the API key is exposed to the browser
    // and can be misused by anyone
    // NEVER do this in production

    // const res = await geocode({ // works as well

    const res = await opencage.geocode({
      q: '51.952659,7.632473',
      key: '6d0e711d72d74daeb2b0bfd2a5cdfdba', // test key. Always the same result
    });
    setClientResult(res);
    setLoading(false);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            This page is rendered client-side and uses the{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              OpenCage Geocoding API
            </code>{' '}
            client-side. The API Key is
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              exposed
            </code>{' '}
            in the browser as the geocoding is called from the client-side.
            Click the button below to see the result.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            type="button"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={handleClientGeocode}
            disabled={loading}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logo"
              width={20}
              height={20}
            />
            {loading ? 'Loading...' : 'Geocode (Client)'}
          </button>
          {clientResult && (
            <div className="mt-4 text-center">
              <strong>Server-side result:</strong>
              <pre>
                {JSON.stringify(clientResult.results[0].components, null, 2)}
              </pre>
            </div>
          )}
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/"
          >
            Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
