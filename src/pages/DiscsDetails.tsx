import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

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

export default function DiscDetailPage() {
  const { id } = useParams<{ id: string }>(); // get the id from the URL
  const [disc, setDisc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchDisc() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/disc/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch disc");
        }

        const data = await res.json();
        setDisc(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDisc();
  }, [id]); // run effect when id changes

  if (loading) return <div className="p-6 text-white">Loading disc</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Image */}
        <div className="col-span-2 flex justify-center">
          <img
            src={disc.Icon}
            alt={disc.Name}
            className="w-96 h-auto object-contain rounded-lg mb-6"
          />
        </div>

        {/* Right: Descriptors */}
        <div className="col-span-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold mb-2">{disc.Name}</h1>

          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-400">2-Pc: </span>
              {formatDescription(disc.Desc2)}
            </div>

            <div>
              <span className="font-semibold text-gray-400">4-Pc: </span>
              {formatDescription(disc.Desc4)}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-1">Story</h2>
              {formatDescription(disc.Story)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
