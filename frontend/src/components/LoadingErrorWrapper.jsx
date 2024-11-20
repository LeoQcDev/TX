// @/components/LoadingErrorWrapper.jsx
// se muestra mientras se cargan las pages.js

const LoadingErrorWrapper = ({ isLoading, error, loadingMessage }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
        <span className="ml-2 text-lg font-semibold">{loadingMessage}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return null;
};

export default LoadingErrorWrapper;
