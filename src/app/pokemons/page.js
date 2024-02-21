"use client";

import { usePokemonPages } from "@/services/pokemon-api";
import Link from "next/link";

export default function PokemonList() {
  const { data, setSize, isLoading } = usePokemonPages();

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

      <div className="d-flex w-100 justify-content-center p-2">
        <button
          className="btn btn-primary "
          disabled={isLoading}
          onClick={() => setSize((size) => size + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}
