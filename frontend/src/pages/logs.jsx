import { useEffect, useState } from "react";
import axios from "axios";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/logs"
      );

      setLogs(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      
      <h1 className="text-4xl font-bold mb-8">
        Security Logs
      </h1>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-700 rounded-xl p-5"
          >
            <p>
              <span className="font-bold">Prompt:</span>{" "}
              {log.input}
            </p>

            <p>
              <span className="font-bold">Score:</span>{" "}
              {log.score}
            </p>

            <p>
              <span className="font-bold">Status:</span>{" "}
              <span
                className={
                  log.status === "BLOCKED"
                    ? "text-red-500"
                    : "text-green-400"
                }
              >
                {log.status}
              </span>
            </p>

            <p className="text-slate-400 text-sm mt-2">
              {log.timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Logs;