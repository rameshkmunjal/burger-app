// src/hooks/useProfitAndLossReport.js
import { useState, useEffect } from "react";
import axios from "axios";

const useProfitAndLossReport = (month, year) => {
  const url = "http://localhost:5000";

  const [list, setList] = useState({
    salesTotal: 0,
    consumptionTotal: 0,
    expensesTotal: 0,
    type: "",
    amount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${url}/general/profit/loss/report/${month}/${year}`
        );
        setList(response.data || {});
      } catch (err) {
        setError(err.response?.data || err.message);
        setList({});
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [month, year]);

  return { list, loading, error };
};

export default useProfitAndLossReport;
