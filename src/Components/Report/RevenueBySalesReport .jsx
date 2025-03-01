import React, { useState } from "react";
import { Container, Row, Col, Button, Form,Table  } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";

const RevenueBySalesReport = () => {
  const [store, setStore] = useState("");
  const [interval, setInterval] = useState("Weekly");
  const [fromDate, setFromDate] = useState("2025-01-15");
  const [toDate, setToDate] = useState("2025-01-15");
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = () => {
    console.log("Search Clicked!", { store, interval, fromDate, toDate, selectedFilter });
  };

  const handleClearFilters = () => {
    setStore("");
    setInterval("Weekly");
    setFromDate("");
    setToDate("");
    setSelectedFilter("");
  };
  const storeName = "Phone Phix Malvern";
  const dateRange = "15-JAN-2025 - 15-JAN-2025";
  const revenueData = {
    revenue: "A$1,493.66",
    discount: "A$0.00",
    cost: "A$0.00",
    tax: "A$134.84",
    saleReturn: "A$0.00",
    profit: "A$1,493.66",
  };
  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Revenue By Sales Report</h2>

      {/* Input Fields */}
      <Row className="align-items-center mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Select Store</Form.Label>
            <Form.Select
              value={store}
              onChange={(e) => setStore(e.target.value)}
            >
              <option value="">Nothing selected</option>
              <option value="Store A">Store A</option>
              <option value="Store B">Store B</option>
              <option value="Store C">Store C</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Interval</Form.Label>
            <Form.Select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Buttons */}
      <Row className="align-items-center mb-4">
        <Col md={6} className="d-flex gap-3">
          <Button className="set_btn" variant="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="danger" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="success">Export</Button>
        </Col>
      </Row>

      {/* Quick Filters */}
      <Row className="justify-content-center text-center mb-5">
        <Col md={10}>
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
                variant={selectedFilter === filter ? "warning" : "outline-primary"}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
      <Table bordered>
      <thead className="table-dark"style={{ backgroundColor: "#333", color: "white" }}>
        <tr>
          <th>STORE</th>
          <th className="text-end">{dateRange}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* Store Name */}
          <td>{storeName}</td>

          {/* Revenue Data */}
          <td>
            <div className="d-flex flex-column align-items-center">
              <p>
                <strong>Revenue:</strong> {revenueData.revenue}
              </p>
              <p>
                <strong>Discount:</strong> {revenueData.discount}
              </p>
              <p>
                <strong>Cost:</strong> {revenueData.cost}
              </p>
              <p>
                <strong>Tax:</strong> {revenueData.tax}
              </p>
              <p>
                <strong>Sale Return:</strong> {revenueData.saleReturn}
              </p>
              <p>
                <strong>Profit:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "#d4edda",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  {revenueData.profit}
                </span>
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
    </Container>
  );
};

export default RevenueBySalesReport;
