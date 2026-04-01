import axios from "axios";
import type { Doubt } from "../types/Doubt";


const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Buscar dúvidas
export const getDoubts = async (): Promise<Doubt[]> => {
  const response = await api.get("/doubts");
  return response.data;
};

// Criar dúvida
export const createDoubt = async (
  newDoubt: Omit<Doubt, "id">
): Promise<Doubt> => {
  const response = await api.post("/doubts", newDoubt);
  return response.data;
};

// Atualizar dúvida
export const updateDoubt = async (
  id: number,
  updatedData: Partial<Doubt>
): Promise<Doubt> => {
  const response = await api.patch(`/doubts/${id}`, updatedData);
  return response.data;
};

// Deletar dúvida
export const deleteDoubt = async (id: number): Promise<void> => {
  await api.delete(`/doubts/${id}`);
};