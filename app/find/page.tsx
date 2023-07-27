"use client";

import React, { useState } from "react";
import { SearchNamePokemon } from "@/utils/fetchData";
import ReactLoading from "react-loading";
import CustomIcon from "@/components/customIcon";
import { GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { GiHandBag } from "react-icons/gi";
import ModalBag from "@/components/modalBag";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type FindProps = {
  // params: { slug: string };
  // searchParams: { [key: string]: string };
};

type PokemonDetails = {
  name: string;
  weight: number;
  height: number;
  exp: number;
  abilities: any[];
  stats: any[];
  image: string;
};

export default function Find({}: FindProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [openModalBag, setOpenModalBag] = useState(false);

  const { bag } = useSelector((state: RootState) => state.bag);

  const handleSearchPokemon = async (e: any) => {
    if (e.key !== "Enter" || name === "") return;
    setLoading(true);
    setError(null);
    const { respones, error } = await SearchNamePokemon(name.toLowerCase());
    if (error) {
      setError(error);
      setPokemon(null);
      setLoading(false);
      return;
    }
    setPokemon({
      name: respones.name,
      weight: respones.weight,
      height: respones.height,
      exp: respones.base_experience,
      abilities: respones.abilities,
      stats: respones.stats,
      image: respones.sprites.other["official-artwork"].front_default,
    });
    setLoading(false);
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <label className="text-2xl">Search</label>
        <input
          type="text"
          name="search"
          placeholder="search pokemon name..."
          autoComplete="off"
          onKeyDown={(e) => handleSearchPokemon(e)}
          onChange={(e) => setName(e.target.value)}
          className="border border-black py-2 px-4 rounded-full w-full"
        />
      </div>
      <div className="flex flex-col mt-5 p-5 bg-red-50">
        <div className="text-center uppercase text-3xl">detail pokemon</div>
        {loading ? (
          <div className="grid place-content-center">
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={200}
              width={200}
            />
          </div>
        ) : (
          <>
            {error || !pokemon ? (
              <span className="mt-5">{error}</span>
            ) : (
              <div>
                <div className="flex justify-center">
                  <img
                    src={pokemon.image}
                    alt=""
                    width={300}
                    className="h-full"
                  />
                </div>
                <div className="grid grid-cols-2 mt-8">
                  <div>
                    <p className="font-bold">Identity</p>
                    {Object.entries(pokemon).map(([key, value], index) => {
                      if (
                        key !== "image" &&
                        (typeof value === "string" || typeof value === "number")
                      ) {
                        return (
                          <p key={index} className="ml-5">
                            {key.toUpperCase()}: {value}
                          </p>
                        );
                      }
                    })}
                  </div>
                  <div>
                    <div>
                      <h1 className="font-bold">Stats</h1>
                      <div className="ml-5">
                        {pokemon.stats.map((item: any) => (
                          <p>
                            {item.stat.name.toUpperCase()}: {item.base_stat}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5">
                      <h1 className="font-bold">Abilities</h1>
                      <div className="ml-5">
                        {pokemon.abilities.map((item: any) => (
                          <p>{item.ability.name.toUpperCase()}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex gap-5 mt-5">
        <Link href={`/`}>
          <CustomIcon icon={<GoHomeFill />} bgColor={"bg-green-600"} />
        </Link>
        <CustomIcon
          handleClick={() => setOpenModalBag(true)}
          bag={bag}
          icon={<GiHandBag />}
          bgColor="bg-orange-900"
        />
      </div>
      <ModalBag openModal={openModalBag} closeModal={setOpenModalBag} />
    </>
  );
}
