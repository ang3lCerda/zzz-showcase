import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Character from "./CharacterDetails";

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

interface CharacterResponse {
  [key: string]: Character;
}

export default function CharacterPage() {
  const [characters, setCharacters] = useState<CharacterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await fetch("http://127.0.0.1:8000/characters");
        if (!res.ok) throw new Error("Failed to fetch characters");

        const data: CharacterResponse = await res.json();
        setCharacters(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  if (loading) return <div className="p-6 text-white">Loading Characters…</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!characters) return null;

  const allCharacters = Object.entries(characters);

  return (
    <div className="min-h-screen p-8 bg-[#0b0b15] text-white">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 ">
        {allCharacters.map(([id, character]) => (
          <Link
            key={id}
            to={`/character/${character.Id}`}
            className="relative flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200 bg-indigo-950 rounded-lg p-4"
          >
            <img
              src={`https://api.hakush.in/zzz/UI/Icon${
                Object.values(character.ElementType)[0]
              }.webp`}
              alt={Object.values(character.ElementType)[0]}
              className="absolute top-2 left-2 lg:w-12 h-12 w-8 h-8 object-contain z-10"
            />
            <img
              src={`https://api.hakush.in/zzz/UI/Icon${
                Object.values(character.WeaponType)[0]
              }.webp`}
              alt={Object.values(character.WeaponType)[0]}
              className="absolute bottom-2 left-2 lg:w-12 h-12  w-8 h-8 object-contain z-10"
            />

            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center overflow-hidden">
              <img
                src={character.Icon.replace("IconRole", "IconRoleCrop")}
                alt={character.Name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-center">
                {character.Name}
              </span>
              <span className="text-lg text-center">
                {
                  CharacterType[
                    character.characterType as keyof typeof CharacterType
                  ]
                }
              </span>
              <span>{Rank[character.Rarity as keyof typeof Rank]} Rank </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
