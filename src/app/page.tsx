"use client";

import { getInfectedRepos } from "@/actions/getInfectedRepos";
import { GitHubResponse } from "@/types";
import { SearchIcon, Share2 } from "lucide-react";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import Markdown from "react-markdown";
import { PacmanLoader } from "react-spinners";

export default function Page() {
  const [data, setData] = useState<GitHubResponse | null>(null);
  const [roast, setRoast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      const result = await getInfectedRepos(formData);
      setData(result.data);
      setRoast(result.roast);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setData(null);
      setRoast(null);
    }
  }

  return (
    <section className="flex p-4 justify-center  gap-5 items-center min-h-screen flex-col">
      <h1 className="text-3xl md:text-6xl font-bold text-center">
        Find hot envs near my <span className="text-purple-700">GIT</span>
      </h1>

      <form
        action={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-5"
      >
        <div className="relative w-full">
          <input
            type="text"
            name="username"
            className="bg-transparent rounded-md w-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-600 border-2 border-white/10 focus:border-transparent font-bold placeholder:font-bold"
            placeholder="Enter Your Github Username"
          />
        </div>

        <SubmitButton />
      </form>
      {error && (
        <p className=" bg-white/5 w-full max-w-2xl rounded-md p-6 space-y-4 text-red-600">
          {error}
        </p>
      )}
      {data && (
        <div className="bg-white/5 w-full max-w-2xl rounded-md p-6 ">
          <div className="float-right cursor-pointer">
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20your%20exposed%20env%20variables%20on%20GitHub

              https://git-a-life.theshiva.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Share2 />
            </a>
          </div>

          <h2 className="text-xl font-bold">
            Total number of times you had skill issues: {data.total_count}
          </h2>

          {data?.items?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold">Exposed .env Files:</h3>
              <ul>
                {data?.items?.map((item) => (
                  <li key={item.html_url} className="break-words">
                    <a
                      href={item.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:text-blue-400 transition-colors"
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
              <h3 className="text-lg font-semibold mb-2 font-mono">
                Code Review:
              </h3>
              <Markdown className="prose prose-invert font-mono">
                {roast}
              </Markdown>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-purple-500 md:mx-auto md:w-56 px-4 py-2 text-white hover:bg-purple-600"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-10">
          <PacmanLoader color="#fff" size={10} />
          Searching...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-4">
          <SearchIcon />
          Search hot .envs
        </span>
      )}
    </button>
  );
}
