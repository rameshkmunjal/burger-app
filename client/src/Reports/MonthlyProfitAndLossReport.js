import React, { useState, useCallback } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import DateSearchBar from "../Component/DateSerachBar";
import ProfitAndLossTable from "../Component/ProfitAndLossTable";
import useProfitAndLossReport from "../Hooks/useProfitAndLossReport";
import { MonthsArray } from "../Component/MonthsArray";
import { Link } from "react-router-dom";

const MonthlyProfitAndLossReport = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [monthName, setMonthName] = useState(MonthsArray[today.getMonth()].monthName);

  const { list, loading, error } = useProfitAndLossReport(month, year);

  const handleDownload = useCallback(() => {
    console.log("Downloading report for", monthName, year);
  }, [monthName, year]);

  const handleInput = (obj) => {
    setMonth(obj.month);
    setMonthName(obj.monthName);
    setYear(obj.year);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="back-btn-div">
        <button className="btn-div">
          <Link className="link-btn" to={"/admin"}>Back</Link>
        </button>
      </div>
      <div className="search-div">
        <DateSearchBar onSearch={handleInput} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ProfitAndLossTable
          monthName={monthName}
          year={year}
          list={list}
          onDownload={handleDownload}
        />
      )}

      <Footer />
    </div>
  );
};

export default MonthlyProfitAndLossReport;
