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
    return {
      message: "Please enter a username",
      data: null,
      roast: null,
    };
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
    return {
      message:
        "Github account so bad even our servers refused to process your data",
      data: null,
      roast: null,
    };
  }
}
