"use client";

import Navbar from "@/components/navbar";
import { useSelector } from "react-redux";
import PokemonCard from "@/components/pokemon-card";
import { useState } from "react";

/**
 * @file View in charge of displaying pokemons marked as favorites.
 */
export default function FavoritePokemons() {
  const [filter, setFilter] = useState("");

  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <>
      <Navbar />

      <main className="container">
        <h1 className="text-center pt-2 pb-2">Favorite pokemons</h1>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-4">
          {Object.entries(favorites)
            .filter(([favorite]) => favorite.includes(filter.trim().toLowerCase()))
            .map(([favorite]) => (
              <PokemonCard key={favorite} pokemon={{ name: favorite }} />
            ))}
        </div>
      </main>
    </>
  );
}
