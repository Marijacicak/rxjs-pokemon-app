// store is the place to store GLOBAL state
import { BehaviorSubject, map } from "rxjs";
// SUBJECT can be any piece of data you want to store
// You give it a new value with NEXT

// OBSERVER vs SUBJECT -> Subjects is similar to event-emitter and it does not invoke for each subscription. -> Subject has same state for each new subscribtion
// SUBJECT vs BEHAVIOUR SUBJECT -> Obican Subject nema inicijalnu vrednost i nece ti uvek drzati state, tipa ispucace ga jednom kad pozoves, ako je dobio novi. Behaviour uvek drzi, i samo ceka da ispali vrednost

// BEHAVIOUR SUBJECT - stores MOST RECENT value, “current value”.
// RELAY SUBJECT - stores multiple values. Example: new ReplaySubject(2); // buffer 2 values for new subscribers
// ASYNC SUBJECT - emit the last value to observers when the sequence is completed.  Example: subject.subscribe({  next: (v) => console.log(`observer B: ${v}`)}); subject.next(5); subject.complete();

// ....observable - value can change over time, and you could subscribe to it
// SUBSCRIBERS - the ones who are seeing the values and using it

export interface PokemonType {
  id: number;
  name: string;
  type: string[];
  speed: number;
  power?: number;
}

export const rawPokemons$ = new BehaviorSubject<PokemonType[]>([]);

export const pokemonsWithPower$ = rawPokemons$.pipe(
  // OUTPUT of the pipe is making new OBSERVABLE
  map((pokemons) => pokemons.map((p) => ({ ...p, power: p.id + p.speed })))
);

fetch("/pokemonJson.json")
  .then((res) => res.json())
  // added new data with NEXT
  .then((data) => rawPokemons$.next(data));
