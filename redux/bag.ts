import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PokemonHome } from "@/types/pokemonTypes";

interface BagState {
  bag: PokemonHome[];
}

const initialState: BagState = {
  bag: [],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addBag: (state, action: PayloadAction<{ pokemon: PokemonHome }>) => {
      state.bag = [...state.bag, action.payload.pokemon];
    },
    decrementBag: (state, action: PayloadAction<{ pokemon: PokemonHome }>) => {
      state.bag = state.bag.filter(
        (item) => item.name !== action.payload.pokemon.name
      );
    },
  },
});

export const { addBag, decrementBag } = bagSlice.actions;

export default bagSlice.reducer;
