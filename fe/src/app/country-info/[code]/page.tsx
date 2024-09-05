"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr"

import Chart from "@/app/components/chart/page";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { code: string } }) {
 
  const { data, error, isLoading } = useSWR(
    `${apiUrl}/country-info?code=${params.code}`, fetcher
  );

  const country = data?.data;

  const { data: flagData, error: flagError, isLoading: flagLoading } = useSWR(
    `${apiUrl}/country-info/flag?code=${params.code}`, fetcher
  );

  const { data: populationData, error: populationError, isLoading: populationLoading } = useSWR(
    `${apiUrl}/country-info/population?code=${country?.commonName}`, fetcher
  );
  
  const population = populationData?.data?.data?.populationCounts
  const flag = flagData?.data?.data?.flag;

  if (error) return <div>Failed to load: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  if (flagError) return <div>Failed to load flag: {flagError.message}</div>;
  if (flagLoading) return <div>Loading...</div>;

  if (populationError) return <div>Failed to load population: {populationError.message}</div>;
  if (populationLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row gap-3">
        <h1 className="text-3xl font-bold text-black">{country?.commonName}</h1>
        <Image height={0} width={50} src={flag} alt="country flag"/>
      </div>
      <div className="flex justify-between gap-10">

        <div className="">
          <h2 className="text-black text-lg">Countries that share borders:</h2>
          <ul className=" gap-1">
            {country?.borders?.map((item: { commonName: string, countryCode: string }, idx: number) => {
              return (
                <li key={idx}><Link href={`/country-info/${item?.countryCode}`}>{item?.commonName}</Link></li>
              )
            })}
          </ul>
        </div>

        <Chart populationData={population}/>

      </div>
    </div>
  );
}
