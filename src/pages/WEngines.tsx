import weaponData from "./output.json";
import SliderTable from "./SliderTable";

function calc_atk(level: number, w: any): number {
  const levelData = w.Level[level];
  if (!levelData) {
    console.warn(`Level ${level} not found in weapon data`);
    return 0;
  }
  let starLvl = Math.floor(level / 10);
  if (starLvl > 5) starLvl = 5;

  const starRate = w.Stars[starLvl].StarRate;
  const levelRate = levelData.Rate;
  const baseAtk = w.BaseProperty.Value;

  return Math.floor(baseAtk * (1 + starRate / 10000 + levelRate / 10000));
}

function calc_secstat(level: number, w: any): number {
  let starLvl = Math.floor(level / 10);
  if (starLvl > 5) starLvl = 5;

  const randRate = w.Stars[starLvl].RandRate;
  const baseSec = w.RandProperty.Value;

  return Math.floor(baseSec * (1 + randRate / 10000));
}

export default function WeaponPage() {
  const weapon = weaponData;
  const iconUrl = `https://api.hakush.in/zzz/UI/${weapon.CodeName}.webp`;

  return (
    // Added flex layout to root: Row on large screens, Column on mobile
    <div className="p-6 text-white flex flex-col lg:flex-row gap-12 justify-center items-start">
      
      {/* Left Column: Image and Info */}
      <div className="flex-1">
        {/* Weapon Image */}
        <img
          src={iconUrl}
          alt={weapon.Name}
          className="w-96 h-auto object-contain rounded-lg mb-6"
        />

        {/* Weapon Info */}
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-2">{weapon.Name}</h1>
          <p className="mb-4">{weapon.Desc2}</p>
          <p className="whitespace-pre-line">{weapon.Desc}</p>
        </div>
      </div>

      {/* Right Column: Slider Table */}
      {/* Centered horizontally in the right column, sticky on scroll */}
      <div className="w-full lg:w-auto flex justify-center lg:sticky lg:top-6 flex-shrink-0">
        <SliderTable
          maxLevel={Object.keys(weapon.Level).length - 1}
          data={weapon.Level}
          weapon={weapon}
          calcAtk={calc_atk}
          calcSecStat={calc_secstat}
        />
      </div>
    </div>
  );
}