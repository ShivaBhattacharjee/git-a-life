"use client";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [roast, setRoast] = useState<string>("");

  const getInfectedRepos = async () => {
    if (!username) {
      alert("Username is required");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/get-env", { username });
      setData(response.data.data);
      setRoast(response.data.roast);
    } catch (error) {
      console.log(error);
      alert(
        "Github so bad even your apis refused to answer please dont try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex p-4 justify-center gap-12 items-center min-h-screen flex-col">
      <h1 className=" text-2xl md:text-3xl font-bold ">
        Find hot envs near my <span className=" text-purple-700">GIT</span>
      </h1>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className=" bg-transparent rounded-full md:w-1/2 w-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-600 border-2 border-white focus:border-transparent font-bold placeholder:font-bold"
        placeholder="Enter Your Github Username"
      />
      <button
        onClick={getInfectedRepos}
        className=" bg-white rounded-md p-3 text-black font-bold text-sm"
      >
        {loading ? "Searching..." : "Search hot .envs"}
      </button>
      {data && (
        <div className="bg-white/5 md:w-[50%] rounded-md p-4">
          <h2>
            Total number of times you had skill issues: {data.total_count}
          </h2>
          <ul>
            {data.items.map((item: any, index: number) => (
              <div key={index}>
                <li>
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name} in {item.repository.full_name}
                  </a>
                </li>

                <h1>Code Review</h1>
                <h1>{roast}</h1>
              </div>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Page;
