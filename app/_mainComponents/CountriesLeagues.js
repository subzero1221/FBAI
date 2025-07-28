"use client"

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLeaguesByCountry } from "../actions/footballActions";
import PulseSpinner from "./PulseSpinner";
import Link from "next/link";
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ka from '../locales/ka.json';
import { useUserStore } from '../store/userStore';
import Image from "next/image";

const translations = { en, ru, ka };
function t(key, lang) {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export default function CountriesLeagues({ country }) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`${country}-leagues`, country],
        queryFn: () => getLeaguesByCountry(country),
    });

    const language = useUserStore((state) => state.language);

    if (isLoading) return <div><PulseSpinner text={"Loading Leagues..."} /></div>;

    if (!data|| !Array.isArray(data.data)) return <div>No leagues data.</div>;
    
    

    return (
        <div className="max-w-3xl mx-auto mt-24">
                <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Leagues in {data.data[0]?.country?.name || "Country"}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.data.map((item) => (
                    <div
                        key={item.league.id}
                        className="flex items-center gap-4 bg-white rounded-lg shadow p-4 border border-blue-100 hover:shadow-lg transition cursor-pointer"
                    >
                        <Image src={item.league.logo} alt={item.league.name} width={12} height={12} className="w-12 h-12 object-contain bg-white rounded-full border" />
                        <div className="flex-1">
                            <Link    href={`/league/${item.league.id}`} className="font-semibold text-gray-900 text-lg">{item.league.name}</Link>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Image src={item.country.flag} alt={item.country.name} width={5} height={5} className="w-5 h-5 rounded-full" />
                                <span>{item.country.name}</span>
                                <span className="ml-2 text-blue-700 font-bold">{item.seasons[0]?.year}</span>
                            </div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold uppercase">{item.league.type}</span>
                    </div>
                ))}
            </div>
            <h2 className="text-sm font-bold bg-gradient-to-r from-green-200 via-emerald-200 to-green-300 bg-clip-text text-transparent tracking-wide">
              {t('countriesleagues_title', language)}
            </h2>
        </div>
    )
}