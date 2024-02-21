"use client";

import { usePokemonDetails } from "@/services/pokemon-api";
import Link from "next/link";

export default function PokemonDetails({ params }) {
  const { data, isLoading } = usePokemonDetails(params.pokemonName);

  return (
    <main className="container">
      <Link href="/pokemons" className="btn btn-primary">
        Back
      </Link>

      <h1 className="text-center">{params.pokemonName}</h1>

      <h2 className="text-center">General information</h2>

      {data && (
        <div className="d-flex w-100 justify-content-center">
          <div className="card col-12 col-md-5 p-3">
            <h4 className="text-center">#{data.id}</h4>

            <div className="d-flex justify-content-center">
              {data.types.map((type) => (
                <div key={type.type.name} className="card p-1">
                  {type.type.name}
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center">
              <div className="ps-2 pe-2">Height: {data.height}</div>
              <div className="ps-2 pe-2">Weight: {data.weight}</div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-center">Sprites</h2>

      <div className="card">
        <div className="d-flex flex-wrap justify-content-center">
          {data &&
            Object.entries(data.sprites)
              .filter(([key, value]) => key !== "other" && key !== "versions" && value)
              .map(([key, value]) => <img className="col-6 col-md-auto" key={key} src={value} />)}
        </div>
      </div>

      <h2 className="text-center">Stats</h2>

      <div className="d-flex justify-content-center">
        <div className="card col-12 col-md-5 d-flex flex-wrap row">
          {data &&
            data.stats.map((stat) => (
              <div key={stat.stat.name} className="col-12 text-center">
                {stat.stat.name}: {stat.base_stat}
              </div>
            ))}
        </div>
      </div>

      <h2 className="text-center">Cries</h2>

      <div className="row justify-content-center">
        <div className="row card p-3 col-12 col-md-5">
          {data &&
            Object.entries(data.cries).map(([key, value]) => (
              <div key={key} className="row align-items-center justify-content-center">
                <div className="col-auto">{key}</div>
                <audio className="col" controls>
                  <source src={value} type="audio/ogg" />
                </audio>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
