import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import ProfitAndLossPosition from "../Component/ProfitAndLossPosition";
import CurrentCashFlowPosition from "../Component/CurrentCashFlowPosition";

const Dashboard = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <h1 className="align-c pb-50 border-b-1">Dashboard</h1>
        <div className="info-container">
          <div className="info-div">
            <CurrentCashFlowPosition />
          </div>
          <div className="info-div">
            <ProfitAndLossPosition />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
