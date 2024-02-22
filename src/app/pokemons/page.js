"use client";

import { usePokemonDetails, usePokemonPages } from "@/services/pokemon-api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Navbar from "@/components/navbar";

export default function PokemonList() {
  const [searchTermUi, setSearchTermUi] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, setSize } = usePokemonPages();
  const {
    data: foundPokemon,
    error: errorFindingPokemon,
    isLoading: findingPokemon
  } = usePokemonDetails(searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTermUi);
  };

  useEffect(() => setSearchTerm(""), [searchTermUi]);

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
    <>
      <Navbar />

      <main className="container">
        <h1 className="text-center pt-2 pb-2">Pokemons</h1>

        <form onSubmit={handleSearch} className="row justify-content-center pt-2 pb-2">
          <div className="col col-md-6 col-lg-3">
            <input
              value={searchTermUi}
              onChange={(e) => setSearchTermUi(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-auto">
            <button style={{ width: 80.97 }} type="submit" className="btn btn-primary">
              {findingPokemon ? (
                <div className="spinner-border spinner-border-sm text-white"></div>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>

        {foundPokemon && (
          <div className="row justify-content-center">
            <Link className="col-3" href={"/pokemons/" + foundPokemon.name}>
              <div className="card p-3">
                <h2 className="text-center">{foundPokemon.name}</h2>
              </div>
            </Link>
          </div>
        )}
        {errorFindingPokemon && (
          <div className="row justify-content-center">
            <div className="col-3 card p-3">
              <h2 className="text-center">Pokemon not found</h2>
            </div>
          </div>
        )}
        {!foundPokemon && !errorFindingPokemon && (
          <div className="row flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-4">
            {data &&
              data.map((pokemonPage) =>
                pokemonPage.results.map((pokemon) => (
                  <Link href={"/pokemons/" + pokemon.name} className="p-1" key={pokemon.name}>
                    <div className="card p-3">
                      <h2 className="text-center">{pokemon.name}</h2>
                    </div>
                  </Link>
                ))
              )}
          </div>
        )}
      </main>
    </>
  );
}
