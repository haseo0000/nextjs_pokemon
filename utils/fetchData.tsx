import axios from "axios";

export const fetchDataPokemon = async (value: number) => {
  try {
    const respones = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${value}`
    );
    return respones.data;
  } catch (error) {
    return `Something went wrong ${error}`;
  }
};

export const SearchNamePokemon = async (name: string) => {
  try {
    const respones = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return {
      respones: respones.data,
    };
  } catch (error) {
    return {
      error: `Pokemon not found.`,
    };
  }
};
