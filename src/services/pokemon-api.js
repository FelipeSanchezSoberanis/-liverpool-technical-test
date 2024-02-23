/**
 * @file API calls related to the pokemons' information.
 */

import useSWRInfinite from "swr/infinite";
import useSWRImmutable from "swr/immutable";

const jsonFetcher = (...args) => fetch(...args).then((res) => res.json());
const BASE_URL = "https://pokeapi.co/api/v2";

const getPokemonPageKey = (page, previousPage) => {
  if (previousPage && !previousPage.next) return null;
  return `${BASE_URL}/pokemon?limit=20&offset=${page * 20}`;
};

/**
 * @description Get pokemon pages.
 *
 * @typedef {Object} PokemonPage
 * @property {import("@/components/pokemon-card").PokemonListItem[]} results
 *
 * @typedef {Object} UsePokemonPagesReturn
 * @property {PokemonPage[]} data
 *
 * @returns {UsePokemonPagesReturn}
 */
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

/**
 * @typedef {Object} PokemonDetails
 * @property {Number} id - Pokemon's id.
 * @property {Number} height - Pokemon's height.
 * @property {Number} weight - Pokemon's weight.
 * @property {PokemonDetailsSprite} sprites - Pokemon's sprites.
 * @property {PokemonDetailsType[]} types - Pokemon's types.
 * @property {{[key: string]: string}} cries - Pokemon's cries.
 *
 * @typedef {Object} PokemonDetailsSprite
 * @property {String} front_default - Front default sprite.
 *
 * @typedef {Object} PokemonDetailsTypeType
 * @property {String} name - Type's name.
 *
 * @typedef {Object} PokemonDetailsType
 * @property {PokemonDetailsTypeType} type
 *
 * @typedef {Object} UsePokemonDetailsReturn
 * @property {PokemonDetails} data
 *
 * @returns {UsePokemonDetailsReturn}
 */
export function usePokemonDetails(pokemonName) {
  const { data, error, isLoading } = useSWRImmutable(
    pokemonName.trim().length > 0
      ? `${BASE_URL}/pokemon/${pokemonName.trim().toLowerCase()}`
      : null,
    jsonFetcher
  );
  return { data, error, isLoading };
}
