"use client";

import { usePokemonDetails } from "@/services/pokemon-api";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

const firstLetterUppercase = (text) => text.charAt(0).toUpperCase() + text.substring(1);

/**
 * @file View in charge of showing a pokemon's details.
 */
export default function PokemonDetails({ params }) {
  const { data, isLoading } = usePokemonDetails(params.pokemonName);

  return (
    <>
      <Navbar />

      <main className="container">
        <h1 className="text-center pt-2 pb-2">{firstLetterUppercase(params.pokemonName)}</h1>

        <div className="row justify-content-center">
          {isLoading && (
            <div
              className="col-12 col-md-6 placeholder-glow p-0 m-0"
              style={{ height: 300, width: 300 }}
            >
              <span className="placeholder" style={{ height: 300, width: 300 }}></span>
            </div>
          )}
          {data && (
            <Image
              className="col-12 col-md-6"
              src={data.sprites.front_default}
              width={300}
              height={300}
              alt={data.name + " front sprite"}
              style={{ objectFit: "contain" }}
            />
          )}
        </div>

        <div className="row row-cols-2 row-cols-md-auto gx-0 gx-md-5 gy-3 gy-md-0 justify-content-center">
          {isLoading &&
            ["HP", "Type", "Height", "Weight"].map((stat) => (
              <div key={stat} className="col">
                <div className="text-center placeholder-glow">
                  <span className="placeholder col-8 col-md-12"></span>
                </div>
                <div className="text-center fw-light">{stat}</div>
              </div>
            ))}
          {data && (
            <>
              <div className="col">
                <div className="text-center">
                  {data.stats.filter((stat) => stat.stat.name === "hp")[0].base_stat}
                </div>
                <div className="text-center fw-light">HP</div>
              </div>
              <div className="col">
                <div className="text-center">
                  {data.types.map((type) => firstLetterUppercase(type.type.name)).join(" / ")}
                </div>
                <div className="text-center fw-light">Type</div>
              </div>
              <div className="col">
                <div className="text-center">{data.height / 10} m</div>
                <div className="text-center fw-light">Height</div>
              </div>
              <div className="col">
                <div className="text-center">{data.weight / 10} kg</div>
                <div className="text-center fw-light">Weight</div>
              </div>
            </>
          )}
        </div>

        <h2 className="text-center p-3">Cries</h2>

        <div className="row row-cols-auto justify-content-center gy-3">
          {isLoading &&
            [1, 2].map((i) => (
              <div key={i} className="col placeholder-glow">
                <span className="placeholder" style={{ height: 54, width: 300 }}></span>
              </div>
            ))}
          {data &&
            Object.entries(data.cries).map(([name, url]) => (
              <div key={name} className="col">
                <audio controls>
                  <source src={url} type="audio/ogg" />
                </audio>
                <div className="text-center fw-light">{firstLetterUppercase(name)}</div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
