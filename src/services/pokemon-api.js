import useSWRInfinite from "swr/infinite";
import useSWR from "swr";

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

export function usePokemonDetails(pokemonName) {
  const { data, isLoading } = useSWR(`${BASE_URL}/pokemon/${pokemonName}`, jsonFetcher);
  return { data, isLoading };
}
