import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const SalesData = () => {
  const url = "http://localhost:5000";
  const [chartData, setChartData] = useState([]);
  const [message, setMessage] = useState("");

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  useEffect(() => {
    const getSalesList = async () => {
      try {
        const response = await axios.get(`${url}/sales/list/${month}/${year}`);
        console.log("Raw sales data:", response.data);

        if (response.data && response.data.length > 0) {
          processChartData(response.data);
          setMessage("");
        } else {
          setChartData([]);
          setMessage("No sales data to display.");
        }
      } catch (error) {
        console.error("Error fetching sales:", error);
        setChartData([]);
        setMessage("Failed to fetch sales data.");
      }
    };

    getSalesList();
  }, []);

  const processChartData = (sales) => {
    const dailyTotals = {};

    sales.forEach((item) => {
      const date = new Date(item.saleDate);  // ✅ FIXED
      const day = date.getDate();            // Extract correct day

      dailyTotals[day] = (dailyTotals[day] || 0) + item.amount;
    });

    const formatted = Object.keys(dailyTotals)
      .map((day) => ({
        day: Number(day),
        amount: dailyTotals[day],
      }))
      .sort((a, b) => a.day - b.day); // Sort by day (optional but clean)

    console.log("ChartData:", formatted); // Debug

    setChartData(formatted);
  };

  return (
    <>
      <div>{message}</div>

      {chartData.length > 0 && (
        <div
          style={{
            width: "100%",
            height: "320px",
            minWidth: 0,
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
            <h2 style={{fontSize:50}}>Sales in this month</h2>
          <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 30, right: 20, bottom: 5, left: 0 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="day" />
  <YAxis />
  <Tooltip />
  
  <Bar dataKey="amount" fill="#134686">
    <LabelList dataKey="amount" position="top" />
  </Bar>
</BarChart>

          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default SalesData;
