import useSWRInfinite from "swr/infinite";

const jsonFetcher = (...args) => fetch(...args).then((res) => res.json());
const BASE_URL = "https://pokeapi.co/api/v2";

const getPokemonPageKey = (page, previousPage) => {
  if (previousPage && !previousPage.next) return null;
  return `${BASE_URL}/pokemon?limit=20&offset=${page * 20}`;
};
export function usePokemonPages() {
  const { data, isLoading, setSize } = useSWRInfinite(getPokemonPageKey, jsonFetcher);
  return { data, setSize, isLoading };
}
