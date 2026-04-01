import { useEffect, useState } from "react";
import type { Doubt } from "./types/Doubt";
import {
  getDoubts,
  createDoubt,
  updateDoubt,
  deleteDoubt,
} from "./services/doubtService";
import DoubtForm from "./components/DoubtForm";
import "./App.css";

function App() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "resolved">("all");

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const data = await getDoubts();
        setDoubts(data);
      } catch {
        setError("Erro ao carregar dúvidas");
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, []);

  const handleAddDoubt = async (newDoubt: Omit<Doubt, "id">) => {
    try {
      const createdDoubt = await createDoubt(newDoubt);
      setDoubts((prev) => [...prev, createdDoubt]);
    } catch {
      alert("Erro ao adicionar dúvida.");
    }
  };

  const handleToggleResolved = async (doubt: Doubt) => {
    try {
      const updatedDoubt = { ...doubt, resolved: !doubt.resolved };

      setDoubts((prev) =>
        prev.map((item) => (item.id === doubt.id ? updatedDoubt : item))
      );

      await updateDoubt(doubt.id, { resolved: !doubt.resolved });
    } catch {
      alert("Erro ao atualizar dúvida.");
    }
  };

  const handleDeleteDoubt = async (id: number) => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta dúvida?"
    );
    if (!confirmed) return;

    try {
      setDoubts((prev) => prev.filter((item) => item.id !== id));
      await deleteDoubt(id);
    } catch {
      alert("Erro ao excluir dúvida.");
    }
  };

  const totalDoubts = doubts.length;
  const resolvedDoubts = doubts.filter((doubt) => doubt.resolved).length;
  const pendingDoubts = doubts.filter((doubt) => !doubt.resolved).length;

  const filteredDoubts = doubts.filter((doubt) => {
    if (filter === "pending") return !doubt.resolved;
    if (filter === "resolved") return doubt.resolved;
    return true;
  });

  return (
    <main className="app">
      <section className="container">
        <header className="header">
          <h1>StudyDoubt</h1>
          <p>Organize e revise suas dúvidas de estudo em um só lugar.</p>
        </header>

        <section className="summary-section">
          <div className="summary-card">
            <span>Total</span>
            <strong>{totalDoubts}</strong>
          </div>

          <div className="summary-card">
            <span>Pendentes</span>
            <strong>{pendingDoubts}</strong>
          </div>

          <div className="summary-card">
            <span>Resolvidas</span>
            <strong>{resolvedDoubts}</strong>
          </div>
        </section>

        <section className="form-section">
          <h2>Nova dúvida</h2>
          <DoubtForm onAddDoubt={handleAddDoubt} />
        </section>

        <section className="list-section">
          <h2>Minhas dúvidas</h2>

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
            >
              Todas
            </button>

            <button
              className={filter === "pending" ? "active-filter" : ""}
              onClick={() => setFilter("pending")}
            >
              Pendentes
            </button>

            <button
              className={filter === "resolved" ? "active-filter" : ""}
              onClick={() => setFilter("resolved")}
            >
              Resolvidas
            </button>
          </div>

          {loading && <p className="message">Carregando...</p>}
          {error && <p className="message error">{error}</p>}
          {!loading && filteredDoubts.length === 0 && (
            <p className="message">Nenhuma dúvida encontrada</p>
          )}

          <ul className="doubt-list">
            {filteredDoubts.map((doubt) => (
              <li key={doubt.id} className="doubt-card">
                <div className="doubt-content">
                  <h3>{doubt.title}</h3>
                  <p>
                    <strong>Matéria:</strong> {doubt.subject}
                  </p>
                  <p>
                    <strong>Prioridade:</strong> {doubt.priority}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        doubt.resolved ? "status resolved" : "status pending"
                      }
                    >
                      {doubt.resolved ? "Resolvida" : "Pendente"}
                    </span>
                  </p>
                </div>

                <div className="card-actions">
                  <button onClick={() => handleToggleResolved(doubt)}>
                    {doubt.resolved
                      ? "Marcar como pendente"
                      : "Marcar como resolvida"}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDeleteDoubt(doubt.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default App;