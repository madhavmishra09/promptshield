import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(
        "http://localhost:11434/api/chat"
      );

      setLogs(res.data);
    };

    fetchLogs();
  }, []);

  const total = logs.length;

  const blocked = logs.filter(
    (log) => log.status === "BLOCKED"
  ).length;

  const safe = total - blocked;

  const detectionRate =
    total > 0
      ? ((blocked / total) * 100).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      
      <h1 className="text-4xl font-bold mb-8">
        Security Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Total Requests
          </h2>

          <p className="text-5xl mt-4">{total}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Blocked Prompts
          </h2>

          <p className="text-5xl mt-4 text-red-500">
            {blocked}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Safe Requests
          </h2>

          <p className="text-5xl mt-4 text-green-400">
            {safe}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Detection Rate
          </h2>

          <p className="text-5xl mt-4 text-blue-400">
            {detectionRate}%
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
