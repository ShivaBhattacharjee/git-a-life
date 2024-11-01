"use server";

import { GitHubResponse } from "@/types";
import axios from "axios";

interface ApiResponse {
  message: string;
  data: GitHubResponse;
  roast: string;
}

export async function getInfectedRepos(formData: FormData) {
  const username = formData.get("username") as string;
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    const response = await axios.post<ApiResponse>(
      `${process.env.DOMAIN_URL}/api/get-env`,
      {
        username,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw new Error(
      "Github account so bad even our servers refused to process your data"
    );
  }
}
