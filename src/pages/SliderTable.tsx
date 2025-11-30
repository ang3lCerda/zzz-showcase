import { useState } from "react";

interface SliderTableProps {
  maxLevel: number;
  data: any;
  weapon: any; // full weapon object
  calcAtk: (level: number, weapon: any) => number;
  calcSecStat: (level: number, weapon: any) => number; // second stat
}

function getRarity(number: number): string {
  if (number === 2) return "B";
  else if (number === 3) return "A";
  else if (number === 4) return "S";
  else return "?"; // fallback
}




export default function SliderTable({
  maxLevel,
  weapon,
  calcAtk,
  calcSecStat,
}: SliderTableProps) {
  const [level, setLevel] = useState(0);

  return (
    <div className="bg-black text-white p-6 rounded-lg max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Ascension Stats (Lv.{level})</h1>
        <div className="text-indigo-400 uppercase tracking-wide font-semibold">
          Ascension Stats
        </div>
      </div>


      <div className="mb-8">
        <input
          id="levelSlider"
          type="range"
          min={0}
          max={maxLevel}
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          className="w-full h-2 bg-indigo-600 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-sm text-gray-300 mt-2">
          {[0, 10, 20, 30, 40, 50, maxLevel].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between bg-indigo-950 p-4 rounded-md">
          <span className="font-medium">Rarity</span>
          <span className="font-semibold">{getRarity(weapon.Rarity)}</span>
        </div>
    
      <div className="flex justify-between bg-indigo-950 p-4 rounded-md">
        <span className="font-medium">Type</span>
        <span className="font-semibold">{Object.values(weapon.WeaponType)[0]}</span>
      </div>

      <div className="flex justify-between bg-indigo-950 p-4 rounded-md">
        <span className="font-medium">Base ATK</span>
        <span className="font-semibold">{calcAtk(level, weapon)}</span>
      </div>

      <div className="flex justify-between bg-indigo-950 p-4 rounded-md">
        <span className="font-medium">Secondary Stat</span>
        <span className="font-semibold">{calcSecStat(level, weapon)}</span>
      </div>
    </div>
    </div >
  );
}
