import apiClient from "./client";

export async function sendContactMessage(message) {
  const { data } = await apiClient.post("/contact", message);
  return data;
}

export async function getContactMessages() {
  const { data } = await apiClient.get("/contact");
  return data;
}

export async function markMessageRead(id) {
  await apiClient.patch(`/contact/${id}/read`);
}

export async function deleteContactMessage(id) {
  await apiClient.delete(`/contact/${id}`);
}
