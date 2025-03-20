import React from 'react';
import { getIdFromUrl } from '../utils';
import { PokemonItemProps } from '../type';
import { useNavigate } from 'react-router-dom';

const PokemonItem = React.memo(({ id, name, url }: PokemonItemProps) => {
  const navigate = useNavigate();
  const pokemonId = id ?? getIdFromUrl(url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <div
      className="max-w-44 mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      onClick={() => navigate(`/pokemon/${pokemonId}`)}
    >
      <img src={imageUrl} alt={name} className="w-full object-cover" />
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-800">{name}</span>
        <span className="text-xs text-gray-500 font-medium">#{pokemonId}</span>
      </div>
    </div>
  );
});

export default PokemonItem;
