// import React from "react";
import character_data from "./character.json";
import CharacterSliderTable from "./CharacterSliderTable";

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

export default function Characters() {
  const character = character_data;

  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-6 gap-6">
        {/* Image takes first 4 columns */}
        <div className="col-span-4 relative flex justify-center">
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

        {/* Slider table in last 2 columns */}
        <div className="col-span-2">
          <CharacterSliderTable character={mock} />
        </div>
      </div>
    </div>
  );
}
