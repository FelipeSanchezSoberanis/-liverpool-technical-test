/**
 * @file API calls related to the dynamic inputs.
 */

import useSWRImmutable from "swr/immutable";

const jsonFetcher = (...args) => fetch(...args).then((res) => res.json());
const BASE_URL = "https://run.mocky.io/v3/2a5049a2-c09b-49e6-8fd1-09aa4f0bc7bb";

/**
 * @description Get dynamic input data.
 *
 * @typedef {Object} UseDynamicInputsReturn
 * @property {Object} data
 * @property {import("@/components/dynamic-input").DynamicInputData[]} data.items
 * @property {Any} error
 * @property {Boolean} isLoading
 *
 * @returns {UseDynamicInputsReturn}
 */
export function useDynamicInputs() {
  const { data, error, isLoading } = useSWRImmutable(BASE_URL, jsonFetcher);
  return { data, error, isLoading };
}
