import apiClient from "./client";

export async function getProfile() {
  const { data } = await apiClient.get("/profile");
  return data;
}

export async function updateProfile(profile) {
  const { data } = await apiClient.put("/profile", profile);
  return data;
}
