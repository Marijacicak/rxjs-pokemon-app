import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import { pokemonsWithPower$, PokemonType } from "./store";

// Making Search component
const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [name, setName] = useState<string>("");

  //Set pokemons - subscribe to the observable/subject and set the value
  useEffect(() => {
    const subscription = pokemonsWithPower$.subscribe(setPokemons);
    // default, reset with unsubscribe. It has to be Function that calls unsubscribe
    return () => subscription.unsubscribe();
  }, [search]);

  // // filter pokemons
  const filtered = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, pokemons]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <div>
        {filtered.map((p) => (
          <div>{p.name}</div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Search />
    </div>
  );
}

export default App;
