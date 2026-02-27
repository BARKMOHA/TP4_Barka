import { useEffect, useState } from "react";
import { getHistory } from "../api/history";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };

    fetchHistory();
  }, []);

  const relaunchSearch = (ingredient: string) => {
    navigate(`/search?ingredient=${ingredient}`);
  };

  return (
    <div>
      <h1>Search History</h1>

      {history.length === 0 && <p>No history yet.</p>}

      <ul>
        {history.map((item) => (
          <li key={item.id}>
            <strong>{item.ingredient}</strong> — 
            {item.results_count} results — 
            {new Date(item.searched_at).toLocaleString()}
            <button onClick={() => relaunchSearch(item.ingredient)}>
              Search Again
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}