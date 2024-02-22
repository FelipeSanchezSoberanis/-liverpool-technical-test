"use client";

import { usePokemonDetails, usePokemonPages } from "@/services/pokemon-api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

export default function PokemonList() {
  const [searchTermUi, setSearchTermUi] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, setSize } = usePokemonPages();
  const { data: pokemonDetails } = usePokemonDetails(searchTerm);

  const pokemonFound = pokemonDetails && searchTermUi && searchTermUi === pokemonDetails.name;

  const loadNextPageDebounced = debounce(() => setSize((size) => size + 1), 200, {
    leading: true,
    trailing: false
  });

  useEffect(() => {
    if (!searchTermUi || !searchTermUi.length) return;
    const timeout = setTimeout(() => setSearchTerm(searchTermUi), 500);
    return () => clearTimeout(timeout);
  }, [searchTermUi]);

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

      <div className="row justify-content-center">
        <div className="col-12, col-md-5">
          <input
            value={searchTermUi}
            onChange={(e) => setSearchTermUi(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
      </div>

      <div className="d-flex flex-wrap pt-2 pb-2">
        {pokemonFound && (
          <Link href={"/pokemons/" + pokemonDetails.name} className="col-12 col-md-6 col-lg-3 p-1">
            <div className="card p-3">
              <h2 className="text-center">{pokemonDetails.name}</h2>
            </div>
          </Link>
        )}
        {!pokemonFound &&
          data &&
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
