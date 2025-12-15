import { useState } from "react";
import character_data from "./character.json";
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

const mock = {
  Name: "Luminara",
  Icon: "LuminaraIcon",
  ElementType: {
    "205": "Ether"
  },
  Rarity: 5,
  WeaponType: "Sword",
  BaseATK: 48,
  SecondaryStat: 10,
  HP: 1000,
  DEF: 50,
  CRITRate: 5,
  CRITDMG: 15
};
interface CharacterData {
  Rarity: number;
  WeaponType: Record<string, string>;
  ElementType: Record<string, string>;
  HitType: Record<string, string>;
  Camp: Record<string, string>;
}

export function getBasicValuesList(data: CharacterData): (number | string | null)[] {
  return [
    data.Rarity,
    Object.values(data.WeaponType)[0] ?? null,
    Object.values(data.ElementType)[0] ?? null,
    Object.values(data.HitType)[0] ?? null,
    Object.values(data.Camp)[0] ?? null,
  ];
}



export default function Characters() {
  const character = character_data;
  const values = getBasicValuesList(character); 
  const stats = character.Stats ?? {};

  const [option, setOption] = useState<1 | 2 | 3>(1);

  const optionImages: Record<number, string> = {
    1: `https://api.hakush.in/zzz/UI/Mindscape_${character.Id}_1.webp`,
    2: `https://api.hakush.in/zzz/UI/Mindscape_${character.Id}_2.webp`,
    3: `https://api.hakush.in/zzz/UI/Mindscape_${character.Id}_3.webp`,
  };

  return (
    <div className="p-6 text-white px-8">
      {/* Main grid: character image + overlay + table */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Image + overlay */}
        <div className="col-span-1 lg:col-span-4 relative flex justify-center">
          <img
            src={`https://api.hakush.in/zzz/UI/${character.Icon}.webp`}
            alt={character.Name}
            className="w-full max-w-sm h-auto object-contain rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-3 rounded-md">
            <h1 className="text-4xl font-bold mb-2">{character.Name}</h1>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold mb-2">
                {Object.values(character.ElementType)[0]}
              </h1>
              <img
                src={`https://api.hakush.in/zzz/UI/Icon${Object.values(
                  character.ElementType
                )[0]}.webp`}
                alt={Object.values(character.ElementType)[0]}
                className="h-6 w-6"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="col-span-1 lg:col-span-2 lg:mt-0 mt-6">
          <CharacterSliderTable character={mock} />
        </div>
      </div>

      {/* Talents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-18 px-8">
        {Object.values(character.Talent).map((talent) => (
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
          className="w-full h-auto object-contain  bg-white"
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
          onChange={(e) => setOption(parseInt(e.target.value) as 1 | 2 | 3)}
          className="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Slider labels */}
      <div className="flex justify-between w-64 text-sm text-gray-300 mt-2 px-4 lg:px-8">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
    </div>
  );
}
