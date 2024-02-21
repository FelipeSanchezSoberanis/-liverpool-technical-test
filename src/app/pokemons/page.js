"use client";

import { usePokemonPages } from "@/services/pokemon-api";
import Link from "next/link";
import { useEffect } from "react";
import { debounce } from "lodash";

export default function PokemonList() {
  const { data, setSize } = usePokemonPages();

  const loadNextPageDebounced = debounce(() => setSize((size) => size + 1), 200, {
    leading: true,
    trailing: false
  });

  useEffect(() => {
    setSize(2);

    const loadNextPageWhenScrollBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight > scrollHeight * 0.9) loadNextPageDebounced();
    };

    const wheelEventListener = document.addEventListener("wheel", loadNextPageWhenScrollBottom);
    const scrollEventListener = document.addEventListener("scroll", loadNextPageWhenScrollBottom);

    return () => {
      removeEventListener(document, wheelEventListener);
      removeEventListener(document, scrollEventListener);
    };
  }, []);

  return (
    <main className="container">
      <h1 className="text-center p-2">Pokemons</h1>

      <div className="d-flex flex-wrap pt-2 pb-2">
        {data &&
          data.map((pokemonPage) =>
            pokemonPage.results.map((pokemon) => (
              <Link
                href={"/pokemons/" + pokemon.name}
                className="col-12 col-md-6 col-lg-3 p-1"
                key={pokemon.name}
              >
                <div className="card p-3">
                  <h2 className="text-center">{pokemon.name}</h2>
                </div>
              </Link>
            ))
          )}
      </div>
    </main>
  );
}
