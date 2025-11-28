import { useState } from "react";

interface CharacterSliderTableProps {
  character: Record<string, any>;
}

export default function CharacterSliderTable({
  character,
}: CharacterSliderTableProps) {
  const [level, setLevel] = useState<number>(0);
  const maxLevel = 60; // same as the other SliderTable
  const levels = [0, 10, 20, 30, 40, 50, 60];

  const scaleValue = (value: any): any => {
    if (typeof value === "number") {
      // simple scaling based on level
      return Math.floor(value * (1 + level / maxLevel));
    }
    return value;
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Character Stats (Lv.{level})</h1>
        <div className="text-indigo-400 uppercase tracking-wide font-semibold">
          Ascension Stats
        </div>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <input
          id="levelSlider"
          type="range"
          min={0}
          max={maxLevel}
          step={10}
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          className="w-full h-2 bg-indigo-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-300 mt-2">
          {levels.map((lvl) => (
            <span key={lvl}>{lvl}</span>
          ))}
        </div>
      </div>

      {/* Dynamic Stats Table */}
      <div className="space-y-4">
        {Object.entries(character).map(([key, value]) => {
          if (["Name", "Icon"].includes(key)) return null;

          // Handle ElementType specially
          if (key === "ElementType" && typeof value === "object") {
            value = Object.values(value)[0];
          }

          return (
            <div
              key={key}
              className="flex justify-between bg-indigo-950 p-4 rounded-md"
            >
              <span className="font-medium">{key}</span>
              <span className="font-semibold">{scaleValue(value)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
