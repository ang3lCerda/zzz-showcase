import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterSliderTable from "./CharacterSliderTable";

// Function to parse <color=#HEX> tags and apply color
const processDescription = (desc: string) => {
  if (!desc) return null;
  const parts = desc.split(/(<color=#[0-9A-Fa-f]+>.*?<\/color>)/g);

  return (
    <span>
      {parts.map((part, index) => {
        const match = part.match(/<color=(#[0-9A-Fa-f]+)>(.*?)<\/color>/);
        if (match) {
          return (
            <span key={index} style={{ color: match[1] }} className="font-bold">
              {match[2]}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

// Keeping the mock data for the table as requested
const mock = {
  Name: "Luminara",
  Icon: "LuminaraIcon",
  ElementType: { "205": "Ether" },
  Rarity: 5,
  WeaponType: "Sword",
  BaseATK: 48,
  SecondaryStat: 10,
  HP: 1000,
  DEF: 50,
  CRITRate: 5,
  CRITDMG: 15
};

export default function Character() {
  const { id } = useParams<{ id: string }>(); 
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [option, setOption] = useState<number>(1);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/character/${id}`);
        if (!res.ok) throw new Error("Failed to fetch character");
        const data = await res.json();
        setCharacter(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacter();
  }, [id]);

  if (loading) return <div className="p-6 text-white text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  // Updated to use character.old_id for image fetching
  const optionImages: Record<number, string> = {
    1: `https://api.hakush.in/zzz/UI/Mindscape_${character.old_id}_1.webp`,
    2: `https://api.hakush.in/zzz/UI/Mindscape_${character.old_id}_2.webp`,
    3: `https://api.hakush.in/zzz/UI/Mindscape_${character.old_id}_3.webp`,
  };

  return (
    <div className="p-6 text-white px-8">
      {/* Original Main Grid: portrait + table */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="col-span-1 lg:col-span-4 relative flex justify-center">
          <img
            src={character.Icon}
            alt={character.Name}
            className="w-full max-w-sm h-auto object-contain rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-3 rounded-md">
            <h1 className="text-4xl font-bold mb-2">{character.Name}</h1>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold mb-2">
                {Object.values(character.ElementType)[0] as string}
              </h1>
              <img
                src={`https://api.hakush.in/zzz/UI/Icon${Object.values(character.ElementType)[0]}.webp`}
                alt={Object.values(character.ElementType)[0] as string}
                className="h-6 w-6"
              />

              
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 lg:mt-0 mt-6">
          <CharacterSliderTable character={mock} />
        </div>
      </div>

      {/* Original Talents Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-18 px-8">
        {Object.values(character.Talent || {}).map((talent: any) => (
          <div key={talent.Level} className="p-4 bg-indigo-950 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Cinema {talent.Level}</h2>
            <h3 className="font-semibold mb-1 text-2xl">{talent.Name}</h3>
            <p className="text-l opacity-90 mb-2 font-bold">
              {processDescription(talent.Desc)}
            </p>
            <p className="text-m italic opacity-70 whitespace-pre-line">
              {talent.Desc2}
            </p>
          </div>
        ))}
      </div>

      {/* Slider image */}
      <div className="mt-8 flex flex-col items-start px-4 lg:px-8">
        <img
          src={optionImages[option]}
          alt={`Option ${option}`}
          className="w-full h-auto object-contain bg-white"
        />
      </div>

      {/* Slider input */}
      <div className="px-4 lg:px-8 mt-5">
        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={option}
          onChange={(e) => setOption(parseInt(e.target.value))}
          className="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Slider labels */}
      <div className="flex justify-between w-64 text-sm text-gray-300 mt-2 px-4 lg:px-8">
        {[1, 2, 3].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}