import axiosClient from './axiosClient';

export const getPokemonList = async (page: number, limit: number = 20) => {
  const offset = (page - 1) * limit;
  const response = await axiosClient.get(
    `pokemon?offset=${offset}&limit=${limit}`,
  );
  return response.data.results;
};

export const getPokemonByName = async (pokemonName: string) => {
  const response = await axiosClient.get(`pokemon/${pokemonName}`);
  return response.data;
};

export const getPokemonById = async (pokemonId: number) => {
  const response = await axiosClient.get(`pokemon/${pokemonId}`);
  return response.data;
};
