import { useState, useRef, useEffect } from 'react';
import { getPokemonByName, getPokemonList } from '../api/pokemonApi';
import { PokemonItemProps } from '../type';
import PokemonItem from '../components/PokemonItem';
import ErrorComponent from '../components/ErrorComponent';

const POKEMON_COUNT = 30;

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [pokemonData, setPokemonData] = useState<PokemonItemProps[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPokemonList = async (page: number, reset = false) => {
    try {
      const newData = await getPokemonList(page, POKEMON_COUNT);
      setPokemonData((prev) => (reset ? newData : [...prev, ...newData]));
    } catch (e) {
      console.error('Error fetching Pokemon list:', e);
      setIsError(true);
    }
  };

  const setSearch = async (isSearching: boolean) => {
    setIsSearching(isSearching);
    setPage(1);
    setPokemonData([]);
    if (!isSearching) {
      fetchPokemonList(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setSearch(false);
      return;
    }

    setIsError(false);
    setSearch(true);

    try {
      const data = await getPokemonByName(inputValue);
      setPokemonData([{ id: Number(data.id), name: inputValue }]);
    } catch (e) {
      setIsError(true);
      console.error('Pokemon not found:', e);
    }
  };

  useEffect(() => {
    if (isSearching) return;

    fetchPokemonList(1, true);

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (bottomRef.current) observer.current.observe(bottomRef.current);

    return () => observer.current?.disconnect();
  }, [isSearching]);

  useEffect(() => {
    if (!isSearching) fetchPokemonList(page);
  }, [page, isSearching]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center gap-3 p-8 mb-5"
      >
        <input
          type="text"
          placeholder="pokemon name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="min-w-24 border-b-2 border-gray-300 bg-transparent px-2 py-1 outline-none focus:border-gray-500 transition-all"
        />
        <button
          type="submit"
          className="h-9 px-4 bg-gray-400 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition-all"
        >
          Search
        </button>
      </form>

      {isError ? (
        <ErrorComponent />
      ) : (
        <div className="grid sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4">
          {pokemonData.map(({ name, id, url }: PokemonItemProps, idx) => (
            <PokemonItem key={name + idx} name={name} url={url ?? ''} id={id} />
          ))}
          <div ref={bottomRef} className="h-10" />
        </div>
      )}
    </>
  );
};

export default HomePage;
