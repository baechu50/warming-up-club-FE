export type PokemonItemProps = {
  id?: number;
  name: string;
  url?: string;
};

export type PokemonDetail = {
  name: string;
  weight: number;
  height: number;
  abilities: Ability[];
  stats: Stats[];
};

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
