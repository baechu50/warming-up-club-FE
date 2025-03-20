const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-600 mb-4">Failed Loading</h1>
      <p className="text-lg text-gray-700 mb-6">
        There was an error loading the data. Please try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow"
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorComponent;
