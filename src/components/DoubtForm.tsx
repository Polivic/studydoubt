import { useState } from "react";
import type { FormEvent } from "react";
import type { Doubt } from "../types/Doubt";

interface DoubtFormProps {
  onAddDoubt: (doubt: Omit<Doubt, "id">) => void;
}

function DoubtForm({ onAddDoubt }: DoubtFormProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"Alta" | "Média" | "Baixa">("Média");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !subject || !description) {
      alert("Preencha todos os campos.");
      return;
    }

    onAddDoubt({
      title,
      subject,
      priority,
      description,
      createdAt: new Date().toISOString().split("T")[0],
      resolved: false,
    });

    setTitle("");
    setSubject("");
    setPriority("Média");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título da dúvida</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="subject">Matéria</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="priority">Prioridade</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "Alta" | "Média" | "Baixa")
          }
        >
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>

      <div>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Adicionar dúvida</button>
    </form>
  );
}

export default DoubtForm;