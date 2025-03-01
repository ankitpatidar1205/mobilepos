import { Line } from "react-chartjs-2";
import { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";

import {
  FaChartLine,
  FaCalendarDay,
  FaMoneyBill,
  FaReceipt,
  FaPercentage,
  FaBalanceScale,
  FaPiggyBank,
  FaHandHoldingUsd,
} from "react-icons/fa"; // Import Icons
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const monthlySalesData = {
    labels: [
      "February 2024",
      "March 2024",
      "April 2024",
      "May 2024",
      "June 2024",
      "July 2024",
      "August 2024",
      "September 2024",
      "October 2024",
      "November 2024",
      "December 2024",
      "January 2025",
    ],
    datasets: [
      {
        label: "Monthly Sale Amount",
        data: [
          0, 20000, 25000, 23000, 22000, 24000, 26000, 27000, 29000, 32000,
          40000, 10000,
        ],
        borderColor: "#06223a",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const dailySalesData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Daily Sales Amount",
        data: [500, 800, 700, 900, 650, 800, 750],
        borderColor: "#28a745",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  const data = [
    { title: "Total Invoice Amount", amount: "A$1493.66", icon: <FaReceipt /> },
    { title: "Amount Paid", amount: "A$1693.66", icon: <FaMoneyBill /> },
    { title: "Receivable", amount: "A$1493.66", icon: <FaHandHoldingUsd /> },
    { title: "Total Receivable", amount: "A$1293.66", icon: <FaPiggyBank /> },
    { title: "Tax", amount: "A$1493.66", icon: <FaBalanceScale /> },
    { title: "Discount", amount: "A$149.66", icon: <FaPercentage /> },
    { title: "Cogs", amount: "A$1445.66", icon: <FaChartLine /> },
    { title: "Net Profit", amount: "A$1293.66", icon: <FaMoneyBill /> },
  ];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="container-fluid mt-5 px-md-5 px-3">
      {/* Filters Section */}

      <Row className="justify-content-center text-center mb-5">
        <Col md={12}>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {[
              "Today",
              "Yesterday",
              "Last 7 Days",
              "This Month",
              "Last Month",
              "This Year",
              "Last Year",
              "All",
            ].map((filter) => (
              <Button
                key={filter}
                variant={
                  selectedFilter === filter ? "warning" : "outline-primary"
                }
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Cards Section */}
      <section className="row g-4 mb-4">
        {data.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card text-center shadow-sm p-4 border-0 rounded-3 card-hover">
              <div className="card-icon text-primary">{item.icon}</div>
              <h5 className="card-title mt-2">{item.title}</h5>
              <p className="card-text fs-5 fw-bold text-dark">{item.amount}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 p-4 chart-card">
            <h4 className="text-center mb-3 text-primary">
              <FaChartLine className="me-2" /> Monthly Sales Amount
            </h4>
            <div className="chart-wrapper">
              <Line data={monthlySalesData} options={options} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 p-4 chart-card">
            <h4 className="text-center mb-3 text-primary">
              <FaCalendarDay className="me-2" /> Daily Sales Amount
            </h4>
            <div className="chart-wrapper">
              <Line data={dailySalesData} options={options} />
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>
        {`
          .card-hover {
            height: 160px; /* Set a fixed height for cards */
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .card-hover:hover {
            transform: scale(1.05);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }
          .card-icon {
            font-size: 1.8rem;
          }
          .chart-card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .chart-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }
          .chart-wrapper {
            height: 300px; /* Fixed height for charts */
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;
