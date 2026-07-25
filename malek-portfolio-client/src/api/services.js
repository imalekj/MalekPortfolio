import apiClient from "./client";

export async function getServices() {
  const { data } = await apiClient.get("/services");
  return data;
}

export async function createService(service) {
  const { data } = await apiClient.post("/services", service);
  return data;
}

export async function updateService(id, service) {
  const { data } = await apiClient.put(`/services/${id}`, service);
  return data;
}

export async function deleteService(id) {
  await apiClient.delete(`/services/${id}`);
}
