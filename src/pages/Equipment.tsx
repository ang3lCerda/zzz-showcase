import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../SearchBar";

interface DriveDisc {
  Id: number;
  Name: string;
  Desc2: string;
  Desc4: string;
  Icon: string;
}

const formatDescription = (text?: string) => {
  if (!text) return null;

  const parts = text.split(/(<color=#[0-9A-Fa-f]{6}>.*?<\/color>)/g);

  return parts.map((part, index) => {
    if (part.startsWith("<color=")) {
      const color = part.match(/<color=(#[0-9A-Fa-f]{6})>/)?.[1];
      const content = part.replace(/<color=.*?>|<\/color>/g, "");
      return (
        <span key={index} style={{ color, fontWeight: "bold" }}>
          {content}
        </span>
      );
    }
    return part;
  });
};

export default function Equipment() {
  const { id: routeId } = useParams(); // Detects URL changes for navigation
  const [allDiscs, setAllDiscs] = useState<DriveDisc[]>([]);
  const [displayDiscs, setDisplayDiscs] = useState<DriveDisc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDiscs() {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/disc");
        if (!res.ok) throw new Error("Failed to fetch drive discs");

        const data = await res.json();
        // Convert dictionary response to array for consistent searching and rendering
        const discArray = Object.values(data) as DriveDisc[];
        
        setAllDiscs(discArray);
        setDisplayDiscs(discArray);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscs();
  }, [routeId]); // Re-run when the URL changes

  if (loading) return <div className="text-white p-8">Loading…</div>;
  if (error) return <div className="text-red-400 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-[#0b0b15] p-8 text-white">
      {/* Search bar centered */}
      <div className="flex justify-center mb-8">
        <div className="w-[28rem]">
          <SearchBar
            data={allDiscs}
            field="Name"
            onResults={setDisplayDiscs}
            placeholder="Search Drive Discs..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
        {displayDiscs.map((disc) => (
          <div key={disc.Id} className="flex items-start gap-5">
            <Link
              to={`/disc/${disc.Id}`}
              className="w-20 h-20 rounded-full border-2 border-[#b08b55] overflow-hidden bg-gray-800 shrink-0"
            >
              <img
                src={disc.Icon}
                alt={disc.Name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </Link>

            <div className="flex-1 space-y-2">
              <Link
                to={`/disc/${disc.Id}`}
                className="text-xl font-bold hover:underline hover:text-gray-300"
              >
                {disc.Name}
              </Link>

              <div className="text-gray-300">
                <span className="font-semibold text-gray-400">2-Pc: </span>
                {formatDescription(disc.Desc2)}
              </div>

              <div className="text-gray-300">
                <span className="font-semibold text-gray-400">4-Pc: </span>
                {formatDescription(disc.Desc4)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}