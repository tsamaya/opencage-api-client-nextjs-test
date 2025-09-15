import Image from 'next/image';
import Link from 'next/link';
import opencage from 'opencage-api-client';
import type { GeocodingRequest } from 'opencage-api-client';
import Footer from '@/components/Footer';

export default async function Home() {
  // Server side call to OpenCage Geocoding API
  // The API Key is hidden from the browser
  // See https://opencagedata.com/api#testingkeys for a free testing key

  const input: GeocodingRequest = {
    q: '51.952659,7.632473', // hardcoded coordinates for demo purposes and anyway the test key will always the same result
    key: process.env.OPENCAGE_API_KEY!, // Use a server-only env var
    no_annotations: 1,
  };
  const result = await opencage.geocode(input);

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
            This page is rendered server-side, and uses the{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              OpenCage Geocoding API
            </code>
            , the API Key is hidden from the browser:
            <div className="mt-10 text-center">
              {JSON.stringify(result.results[0].components)}
            </div>
          </li>
          <li className="tracking-[-.01em]">
            Click the button{' '}
            <Link href={'/client'}>
              <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                Client with Server API
              </code>
            </Link>{' '}
            below to see an example using a page rendered on the client-side
            using a server-side API.
          </li>
          <li className="tracking-[-.01em]">
            Click the button{' '}
            <Link href={'/wrong'}>
              <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                Client with Client API
              </code>
            </Link>{' '}
            below to see an example using a page rendered on the client-side
            using a client-side request, exposing the API Key.{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              THIS IS NOT RECOMMENDED
            </code>
            .
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href={'/client'}
          >
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Globe icon"
              width={20}
              height={20}
            />
            Client with Server API
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-2  hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href={'/wrong'}
          >
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Globe icon"
              width={20}
              height={20}
            />
            Client with Client API
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://opencagedata.com/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
