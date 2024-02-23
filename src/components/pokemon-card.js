import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/stores/favorites-slice";

export default function PokemonCard({ pokemon }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="p-1" key={pokemon.name}>
      <div style={{ height: 150 }} className="card p-3 position-relative overflow-hidden">
        {favorites[pokemon.name] ? (
          <div
            onClick={() => dispatch(removeFavorite(pokemon.name))}
            style={{ zIndex: 4 }}
            className="position-absolute end-0 top-0 p-2"
          >
            <i className="bi bi-bookmark-star-fill fs-2 text-warning"></i>
          </div>
        ) : (
          <div
            onClick={() => dispatch(addFavorite(pokemon.name))}
            style={{ zIndex: 4 }}
            className="position-absolute end-0 top-0 p-2"
          >
            <i className="bi bi-bookmark-star fs-2 text-warning"></i>
          </div>
        )}

        <div
          style={{ zIndex: 1, translate: "-50% -50%", borderRadius: 10 }}
          className="position-absolute start-50 top-50 fs-3 bg-white p-1"
        >
          {pokemon.name}
        </div>
        <Image
          style={{ zIndex: 0, translate: "-50% -50%" }}
          className="position-absolute start-50 top-50 opacity-75"
          src="/pokeball.png"
          height={400}
          width={400}
          alt="Pokeball background image"
        />
      </div>
    </div>
  );
}
