const BASE_URL = 'https://covid19.mathdro.id';
async function fetcher(url: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: 'same-origin',
  });

  if (!res.ok) {
    throw new Error(res.status?.toString());
  }

  return res.json();
}

function getNumericSign(number: number | string) {
  return +number >= 0 ? '+' : '';
}

export { fetcher, getNumericSign };
