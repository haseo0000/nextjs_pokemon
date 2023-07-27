import React from "react";
import { PokemonHome } from "@/types/pokemonTypes";

type Props = {
  handleClick?: () => void;
  bag?: PokemonHome[];
  icon: React.ReactElement;
  bgColor: string;
};

export default function CustomIcon({ handleClick, bag, icon, bgColor }: Props) {
  return (
    <div
      className={`relative cursor-pointer border-black border rounded-full w-fit p-6 text-white text-3xl ${bgColor}`}
      onClick={handleClick}>
      {icon}
      {bag && bag.length > 0 && (
        <div className="absolute -bottom-2 -right-4">
          <span
            className={`bg-red-500 rounded-full py-1 ${
              bag.length > 9 ? "px-2" : "px-3"
            }`}>
            {bag.length}
          </span>
        </div>
      )}
    </div>
  );
}