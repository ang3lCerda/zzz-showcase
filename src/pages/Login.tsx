import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password,setPassword]= useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in as:", username);

    // later:
    // - validate
    // - call backend
    // - store user in context
    // - redirect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0224] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#100233] p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <label className="block mb-2 text-sm font-semibold">
          Username
        </label>
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter username"
        />
        <label className="block mb-2 text-sm font-semibold">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 rounded font-semibold"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
