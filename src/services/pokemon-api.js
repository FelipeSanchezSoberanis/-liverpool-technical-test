import useSWRInfinite from "swr/infinite";
import useSWRImmutable from "swr/immutable";

const jsonFetcher = (...args) => fetch(...args).then((res) => res.json());
const BASE_URL = "https://pokeapi.co/api/v2";

const getPokemonPageKey = (page, previousPage) => {
  if (previousPage && !previousPage.next) return null;
  return `${BASE_URL}/pokemon?limit=20&offset=${page * 20}`;
};
export function usePokemonPages() {
  const { data, isLoading, setSize } = useSWRInfinite(getPokemonPageKey, jsonFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateFirstPage: false,
    revalidateOnReconnect: false
  });
  return { data, setSize, isLoading };
}

export function usePokemonDetails(pokemonName) {
  const { data, error, isLoading } = useSWRImmutable(
    pokemonName.trim().length > 0 ? `${BASE_URL}/pokemon/${pokemonName}` : null,
    jsonFetcher
  );
  return { data, error, isLoading };
}
