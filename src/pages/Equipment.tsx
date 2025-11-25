import React from 'react';
// 1. Import the JSON file directly. 
// Ensure 'suits_english.json' is in the same folder as this component.
import diskSetsDats from './disk-sets-english.json';

// Helper function to parse the custom color tags from the JSON
const formatDescription = (text) => {
  if (!text) return "";
  const parts = text.split(/(<color=#[0-9A-Fa-f]{6}>.*?<\/color>)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('<color=')) {
      const colorMatch = part.match(/<color=(#[0-9A-Fa-f]{6})>/);
      const color = colorMatch ? colorMatch[1] : 'inherit';
      const content = part.replace(/<color=.*?>|<\/color>/g, '');
      return (
        <span key={index} style={{ color: color, fontWeight: 'bold' }}>
          {content}
        </span>
      );
    }
    return part;
  });
};

export default function Equipment() {
  // 2. Convert the imported JSON object into an array of [id, item] pairs
  const allSuits = Object.entries(diskSetsDats);

  return (
    <div className="min-h-screen bg-[#0b0b15] p-8 text-white">
    
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
        {allSuits.map(([id, item]) => (
          <div key={id} className="flex items-start gap-5">
            {/* Icon Column */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-[#b08b55] overflow-hidden bg-gray-800 relative">
            
                 <img 
                   src={item.icon} 
                   alt={item.EN.name} 
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     e.target.style.display='none'; 
                     e.target.parentElement.style.backgroundColor='#333';
                   }} 
                 />
              </div>
            </div>

            {/* Text Column */}
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-bold text-white">{item.EN.name}</h2>
              
              <div className="text-[2rem]leading-relaxed text-gray-300">
                <span className="text-gray-400 font-semibold">2-Pc: </span>
                {formatDescription(item.EN.desc2)}
              </div>

              <div className="text-[2rem]leading-relaxed text-gray-300">
                <span className="text-gray-400 font-semibold">4-Pc: </span>
                {formatDescription(item.EN.desc4)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}