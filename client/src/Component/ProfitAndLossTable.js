// src/components/ProfitAndLossTable.jsx
import React from "react";

const ProfitAndLossTable = ({ monthName, year, list, onDownload }) => {
  console.log("ProfitAndLossTable rendered:", monthName); // for testing re-renders

  return (
    <div className="page-container">
      <h3 className="flex-center">
        Profit And Loss : {monthName} {year}
      </h3>

      <table className="tbl">
        <thead>
          <tr>
            <th className="align-c fs-18 plr-50 w-200">Item</th>
            <th className="align-c fs-18 plr-50 w-200">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-c fs-18 plr-50 w-200">Sales</td>
            <td className="align-r fs-18 plr-50 w-200">{list.salesTotal?.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="align-c fs-18 plr-50 w-200">RM Consumed</td>
            <td className="align-r fs-18 plr-50 w-200">{list.consumptionTotal?.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="align-c fs-18 plr-50 w-200">Expenses</td>
            <td className="align-r fs-18 plr-50 w-200">{list.expensesTotal?.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="align-c fs-18 plr-50 w-200">{list.type}</td>
            <td className="align-r fs-18 plr-50 w-200">{list.amount?.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Action button */}
      {onDownload && (
        <button
          className="mt-4 px-3 py-1 bg-blue-600 text-white rounded"
          onClick={onDownload}
        >
          Download Report
        </button>
      )}
    </div>
  );
};

export default React.memo(ProfitAndLossTable);
