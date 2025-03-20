import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById } from '../api/pokemonApi';
import { PokemonDetail } from '../type';
import ErrorComponent from '../components/ErrorComponent';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isError, setIsError] = useState(false);
  const [detailData, setDetailData] = useState<PokemonDetail>({
    name: 'unknown',
    weight: 0,
    height: 0,
    abilities: [],
    stats: [],
  });

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getPokemonById(Number(id));
        setDetailData(data);
      } catch (e) {
        console.error('Error fetching Pokemon Detail:', e);
        setIsError(true);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-700 hover:bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded shadow"
        >
          ← Back to Home
        </button>
        <div>
          <button
            onClick={() => navigate(`/pokemon/${Number(id) - 1 || 1}`)}
            className="bg-gray-700 hover:bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded shadow mr-2"
          >
            &lt;
          </button>
          <button
            onClick={() => navigate(`/pokemon/${Number(id) + 1 || 1}`)}
            className="bg-gray-700 hover:bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded shadow"
          >
            &gt;
          </button>
        </div>
      </div>
      {isError ? (
        <ErrorComponent />
      ) : (
        <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-4">
          <img
            src={imageUrl}
            alt={detailData.name}
            className="w-full object-cover rounded"
          />
          <h1 className="text-3xl font-bold mt-4 text-center text-gray-800">
            {detailData.name}
          </h1>
          <div className="flex justify-around mt-2">
            <p className="text-gray-700">
              Weight: {(detailData.weight / 10).toFixed(1)} kg
            </p>
            <p className="text-gray-700">
              Height: {(detailData.height / 10).toFixed(1)} m
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Abilities
            </h2>
            <div className="flex flex-wrap gap-2">
              {detailData.abilities.map(({ ability }) => (
                <span
                  key={ability.name}
                  className="bg-gray-400 text-gray-900 py-1 px-3 rounded-full text-sm"
                >
                  {ability.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Stats</h2>
            {detailData.stats.map(({ stat, base_stat }) => {
              const percentage = Math.min(100, (base_stat / 255) * 100);
              return (
                <div key={stat.name} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-gray-800">
                      {stat.name}
                    </span>
                    <span className="text-gray-800">{base_stat} / 255</span>
                  </div>
                  <div className="w-full bg-gray-400 rounded-full h-3">
                    <div
                      className="bg-gray-600 h-3 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
