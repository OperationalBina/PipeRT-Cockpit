import { SERVER_URL } from "../config";

export async function apiFetch(endpoint) {
  let response = await fetch(`${SERVER_URL}/api/${endpoint}`);

  if (response.ok) {
    return response.json();
  } else
    throw `An error when fetching from /api/${endpoint} - ${response.text}`;
}

export async function apiPost(endpoint, params) {
  let response = await fetch(`${SERVER_URL}/api/${endpoint}`, {
    method: "POST",
    body: JSON.stringify({
      ...params,
    }),
  });

  if (response.ok) return response.json();
  else throw `An error when fetching from /api/${endpoint} - ${response.text}`;
}
