import React from "react";
import { PokeMonTypes } from "@/types/pokemonTypes";
import { FaLeaf, FaSkull, FaFire, FaWater } from "react-icons/fa";

type Props = {
  pokemonType: PokeMonTypes[];
};

export default function PokemonType({ pokemonType }: Props) {
  return (
    <div className="absolute top-0 right-0 flex flex-col gap-4 text-5xl p-5">
      {pokemonType?.map((item, index) => {
        if (item === PokeMonTypes.grass) {
          return (
            <span key={index} className="text-green-500 ">
              <FaLeaf />
            </span>
          );
        }
        if (item === PokeMonTypes.poison) {
          return (
            <span key={index} className="text-purple-700">
              <FaSkull />
            </span>
          );
        }
        if (item === PokeMonTypes.fire) {
          return (
            <span key={index} className="text-red-600">
              <FaFire />
            </span>
          );
        }
        if (item === PokeMonTypes.water) {
          return (
            <span key={index} className="text-blue-600">
              <FaWater />
            </span>
          );
        }
      })}
    </div>
  );
}
