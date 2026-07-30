export function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (!codespaceName) {
    return `/api/${path}`;
  }
  return `https://${codespaceName}-8000.app.github.dev/api/${path}`;
}

export function normalizeApiResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data == null) return [];
  return [data];
}
