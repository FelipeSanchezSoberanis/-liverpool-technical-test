import useSWRImmutable from "swr/immutable";

const jsonFetcher = (...args) => fetch(...args).then((res) => res.json());
const BASE_URL = "https://run.mocky.io/v3/2a5049a2-c09b-49e6-8fd1-09aa4f0bc7bb";

export function useDynamicInputs() {
  const { data, isLoading } = useSWRImmutable(BASE_URL, jsonFetcher);
  return { data, isLoading };
}
