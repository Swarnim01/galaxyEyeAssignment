const baseUrl = "http://localhost:3001";

export const fetchTiles = async () => {
  const res = await fetch(`${baseUrl}/api`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },})
  const data = await res.json();
    return data;
};