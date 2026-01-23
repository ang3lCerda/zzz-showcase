import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../SearchBar";

interface Character {
  Id: number;
  Name: string;
  Desc3: string;
  Rarity: number;
  Icon: string;
  characterType: number;
  Camp: Record<string, string>;
  ElementType: Record<string, string>;
  WeaponType: Record<string, string>;
}

const CharacterType = Object.freeze({
  1: "Attack",
  2: "Stun",
  3: "Anomaly",
  4: "Support",
  5: "Defense",
  6: "Rupture",
});

const Rank = Object.freeze({
  2: "B",
  3: "A",
  4: "S",
});

export default function CharacterPage() {
  const { id: routeId } = useParams(); // Hook into params to detect route changes
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [displayCharacters, setDisplayCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/characters");
        if (!res.ok) throw new Error("Failed to fetch characters");

        const data = await res.json();
        const charArray = Object.values(data) as Character[];
        
        setAllCharacters(charArray);
        setDisplayCharacters(charArray);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [routeId]); // Re-run if route changes

  if (loading) return <div className="p-6 text-white text-center">Loading Characters…</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen p-8 bg-[#0b0b15] text-white">
      <div className="mb-8 flex justify-center">
        <div className="w-[28rem] max-w-full mx-auto">
          <SearchBar
            data={allCharacters}
            field="Name"
            placeholder="Search characters..."
            onResults={setDisplayCharacters}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {displayCharacters.map((character) => (
          <Link
            key={character.Id}
            to={`/character/${character.Id}`}
            className="relative flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200 bg-indigo-950 rounded-lg p-4"
          >
            <img
              src={`https://api.hakush.in/zzz/UI/Icon${Object.values(character.ElementType)[0]}.webp`}
              alt="element"
              className="absolute top-2 left-2 lg:w-12 w-8 h-8 object-contain z-10"
            />

            <img
              src={`https://api.hakush.in/zzz/UI/Icon${Object.values(character.WeaponType)[0]}.webp`}
              alt="weapon type"
              className="absolute bottom-2 left-2 lg:w-12 w-8 h-8 object-contain z-10"
            />

            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center overflow-hidden">
              <img
                src={character.Icon.replace("IconRole", "IconRoleCrop")}
                alt={character.Name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-center">{character.Name}</span>
              <span className="text-lg text-center">
                {CharacterType[character.characterType as keyof typeof CharacterType]}
              </span>
              <span>{Rank[character.Rarity as keyof typeof Rank]} Rank</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}