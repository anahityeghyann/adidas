import { apiRequest } from "./client";

export function subscribe(email) {
  return apiRequest("/subscribe/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
