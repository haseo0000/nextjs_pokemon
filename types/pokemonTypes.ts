export enum PokeMonTypes {
  grass = "grass",
  fire = "fire",
  water = "water",
  earth = "earth",
  poison = "poison",
}

export type PokemonHome = {
  name: string;
  image: string;
  type: PokeMonTypes[];
};
