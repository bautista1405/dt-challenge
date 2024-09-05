"use client";

import Link from "next/link";
import useSWR from "swr"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data, error, isLoading } = useSWR(`${apiUrl}/countries`, fetcher) 

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <table className="min-w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 p-2">Country</th>
              <th className="border border-gray-400 p-2">Country Code</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: { name: string, countryCode: string }, idx: number) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-400 p-2"><Link href={`/country-info/${item.countryCode}`}>{item.name}</Link></td>
                <td className="border border-gray-400 p-2">{item.countryCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
