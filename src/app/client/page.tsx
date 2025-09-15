'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Client() {
  // In production, you should use a server-side API route to hide your API key
  // https://nextjs.org/docs/app/building-your-application/routing/api-routes

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [serverResult, setServerResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleServerGeocode() {
    setLoading(true);
    const res = await fetch('/api/geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // hardcoded coordinates for demo purposes and anyway the test key will always the same result
      body: JSON.stringify({ q: '51.952659,7.632473' }),
    });
    const data = await res.json();
    setServerResult(data.results[0].components);
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
            This page is rendered client-side, and uses the{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              OpenCage Geocoding API
            </code>
            , the API Key is hidden from the browser as the geocoding routine is
            called from a server-side API route, click the button below to see
            the result
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            type="button"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={handleServerGeocode}
            disabled={loading}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logo"
              width={20}
              height={20}
            />
            {loading ? 'Loading...' : 'Geocode (Server)'}
          </button>
          {serverResult && (
            <div className="mt-4 text-center">
              <strong>Server-side result:</strong>
              <pre>{JSON.stringify(serverResult, null, 2)}</pre>
            </div>
          )}
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/"
          >
            Back
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://opencagedata.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to OpenCage →
        </a>
      </footer>
    </div>
  );
}
