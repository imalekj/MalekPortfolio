import apiClient from "./client";

export async function getSkills() {
  const { data } = await apiClient.get("/skills");
  return data;
}

export async function createSkill(skill) {
  const { data } = await apiClient.post("/skills", skill);
  return data;
}

export async function updateSkill(id, skill) {
  const { data } = await apiClient.put(`/skills/${id}`, skill);
  return data;
}

export async function deleteSkill(id) {
  await apiClient.delete(`/skills/${id}`);
}
