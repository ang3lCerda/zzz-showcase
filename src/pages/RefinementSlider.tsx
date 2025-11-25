import { useState } from 'react';

// Helper to process description text with HTML-like tags
const processDescription = (desc: string) => {
  if (!desc) return null;

  // Replace custom color tags with span elements
  // The format is usually <color=#HEX>text</color>
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

interface RefinementSliderProps {
  talents: any; // Using any to match the JSON structure flexibility
}

export default function RefinementSlider({ talents }: RefinementSliderProps) {
  // State for Refinement Slider (1-5)
  const [refinement, setRefinement] = useState(1);

  // Get talent data based on refinement level
  const talentData = talents ? talents[refinement] : null;

  if (!talentData) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-white">Refinements</h2>
          <h3 className="text-xl font-bold text-blue-400 mt-1 uppercase tracking-wide">
            Refinements
          </h3>
        </div>

        {/* Refinement Slider */}
        <div className="flex items-center gap-4 w-1/2 justify-end">
          <input
            type="range"
            min={1}
            max={5}
            value={refinement}
            onChange={(e) => setRefinement(parseInt(e.target.value))}
            className="w-32 h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex gap-2 font-mono text-lg">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <span
                key={lvl}
                className={`cursor-pointer ${
                  lvl === refinement
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-600'
                }`}
                onClick={() => setRefinement(lvl)}
              >
                {lvl}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#09011F] border border-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">{talentData.Name}</h3>
        <p className="text-gray-200 text-lg leading-relaxed">
          {processDescription(talentData.Desc)}
        </p>
      </div>
    </div>
  );
}