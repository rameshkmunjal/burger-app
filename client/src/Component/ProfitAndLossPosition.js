import React, { useCallback } from "react";
import { MonthsArray } from "../Component/MonthsArray";
import ProfitAndLossTable from "./ProfitAndLossTable";
import useProfitAndLossReport from "../Hooks/useProfitAndLossReport";

const ProfitAndLossPosition = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const monthName = MonthsArray[today.getMonth()].monthName;

  const { list, loading, error } = useProfitAndLossReport(month, year);

  // ✅ Memoized function: stays the same reference unless month/year changes
  const handleDownload = useCallback(() => {
    console.log("Downloading report for", monthName, year);
    // You can implement API or PDF download logic here
  }, [monthName, year]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ProfitAndLossTable
      monthName={monthName}
      year={year}
      list={list}
      onDownload={handleDownload}
    />
  );
};

export default ProfitAndLossPosition;
