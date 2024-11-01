"use client";
import axios from "axios";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { PacmanLoader } from "react-spinners";

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
}

interface GitHubItem {
  name: string;
  path: string;
  html_url: string;
  repository: GitHubRepository;
}

interface GitHubResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubItem[];
}

interface ApiResponse {
  message: string;
  data: GitHubResponse;
  roast: string;
}

const Page: React.FC = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<GitHubResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [roast, setRoast] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim());
    setError(null);
  };

  const getInfectedRepos = async () => {
    if (!username) {
      setError("Username is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<ApiResponse>("/api/get-env", {
        username,
      });
      setData(response.data.data);
      setRoast(response.data.roast);
    } catch (error) {
      console.error("Error fetching repos:", error);
      setError("Failed to fetch repository data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex p-4 justify-center gap-12 items-center min-h-screen flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Find hot envs near my <span className="text-purple-700">GIT</span>
      </h1>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="relative w-full">
          <input
            type="text"
            onChange={handleUsernameChange}
            value={username}
            className="bg-transparent rounded-full w-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-600 border-2 border-white focus:border-transparent font-bold placeholder:font-bold"
            placeholder="Enter Your Github Username"
            disabled={loading}
          />
          {error && (
            <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={getInfectedRepos}
          disabled={loading || !username}
          className="bg-white rounded-md p-3 text-black font-bold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!loading ? (
            <span className="flex items-center justify-center gap-10">
              <PacmanLoader color="#000" size={10} />
              Searching...
            </span>
          ) : (
            "Search hot .envs"
          )}
        </button>
      </div>

      {data && (
        <div className="bg-white/5 w-full max-w-2xl rounded-md p-6 space-y-4">
          <h2 className="text-xl font-bold">
            Total number of times you had skill issues: {data.total_count}
          </h2>

          {data.items.length > 0 && (
            <>
              <h3 className="text-lg font-semibold">Exposed .env Files:</h3>
              <ul className="space-y-3">
                {data.items.map((item) => (
                  <li key={item.html_url} className="break-words">
                    <a
                      href={item.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      {item.name} in {item.repository.full_name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {roast && (
            <div className="mt-4 p-4 bg-white/5 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Code Review:</h3>
              <Markdown className="prose prose-invert">{roast}</Markdown>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Page;
