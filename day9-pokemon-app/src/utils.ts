export const getIdFromUrl = (url: string = 'unknown') => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};
