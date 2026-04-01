export interface Doubt {
  id: number;
  title: string;
  subject: string;
  priority: "Alta" | "Média" | "Baixa";
  description: string;
  createdAt: string;
  resolved: boolean;
}