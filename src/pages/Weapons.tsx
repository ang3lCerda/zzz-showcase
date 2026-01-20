import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Weapon {
  Id: number;
  Name: string;
  Desc3: string;
  Rarity: number;
  Icon: string;
  WeaponType: number;
}

const WeaponType = Object.freeze({
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

interface WeaponResponse {
  [key: string]: Weapon;
}

export default function WeaponPage() {
  const [weapons, setWeapons] = useState<WeaponResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeapons() {
      try {
        const res = await fetch("http://127.0.0.1:8000/weapons");
        if (!res.ok) throw new Error("Failed to fetch weapons");

        const data: WeaponResponse = await res.json();
        setWeapons(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeapons();
  }, []);

  if (loading) return <div className="p-6 text-white">Loading weapons…</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!weapons) return null;

  const allWeapons = Object.entries(weapons);

  return (
    <div className="min-h-screen p-8 bg-[#0b0b15] text-white">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 ">
        {allWeapons.map(([id, weapon]) => (
          <Link
            key={id}
            to={`/weapon/${weapon.Id}`}
            className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200 bg-indigo-950 rounded-lg "
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={weapon.Icon}
                alt={weapon.Name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-center">{weapon.Name}</span>
              <span className="text-lg text-center">
                {WeaponType[weapon.WeaponType as keyof typeof WeaponType]}
              </span>
              <span>{Rank[weapon.Rarity as keyof typeof Rank]} Rank</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
