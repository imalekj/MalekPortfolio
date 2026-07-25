import apiClient from "./client";

export async function getProjects() {
  const { data } = await apiClient.get("/projects");
  return data;
}

export async function createProject(project) {
  const { data } = await apiClient.post("/projects", project);
  return data;
}

export async function updateProject(id, project) {
  const { data } = await apiClient.put(`/projects/${id}`, project);
  return data;
}

export async function deleteProject(id) {
  await apiClient.delete(`/projects/${id}`);
}
