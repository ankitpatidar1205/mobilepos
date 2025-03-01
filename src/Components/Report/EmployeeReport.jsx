import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card, Table } from "react-bootstrap";

const EmployeeReport = () => {
  const [fromDate, setFromDate] = useState("2025-01-15");
  const [toDate, setToDate] = useState("2025-01-15");
  const [selectedFilter, setSelectedFilter] = useState("Today");

  // Employee data for cards
  const employees = [
    { rank: 1, name: "murtaza rasool", salesAmount: "A$ 4,468.61" },
    { rank: 2, name: "Abdul", salesAmount: "A$ 3,141.46" },
    { rank: 3, name: "Mujtaba", salesAmount: "A$ 3,000.35" },
  ];

  // Employee data for table
  const employeeTableData = [
    { id: 123, name: "murtaza rasool", salesAmount: "A$ 4,468.61" },
    { id: 33, name: "Abdul", salesAmount: "A$ 3,141.46" },
    { id: 7,  name: "Mujtaba", salesAmount: "A$ 3,000.35" },
    { id: 25, name: "Khair", salesAmount: "A$ 2,880.57" },
    { id: 40, name: "Punnet", salesAmount: "A$ 2,455.64" },
    { id: 29, name: "Nizam", salesAmount: "A$ 2,069.47" },
    { id: 42, name: "Tamim", salesAmount: "A$ 2,036.09" },
    { id: 64, name: "Yajat", salesAmount: "A$ 2,022.36" },
  ];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = () => {
    console.log("Search Clicked!", { fromDate, toDate, selectedFilter });
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    setSelectedFilter("");
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Employee Report</h2>

      {/* Date Filters */}
      <Row className="align-items-center mb-4">
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

      {/* Search and Clear Filters */}
      <Row className="mb-4 align-items-center">
  {/* Left Buttons: Search and Clear Filters */}
  <Col md={10} className="d-flex align-items-end gap-3">
    <Button variant="primary" className="set_btn" onClick={handleSearch}>
      Search
    </Button>
    <Button variant="danger" onClick={handleClearFilters}>
      Clear Filters
    </Button>
  </Col>

  {/* Right Button: Export */}
  <Col md={2} className="text-end">
    <Button variant="success">Export</Button>
  </Col>
</Row>

 {/* Export Button */}
 {/* <Row className="justify-content-end mb-4">
        <Col md={2} className="text-end">
          <Button variant="success">Export</Button>
        </Col>
      </Row> */}
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

      {/* Employee Cards */}
      <Row className="mb-5">
        {employees.map((employee) => (
          <Col md={4} className="mb-4" key={employee.rank}>
            <Card className="shadow-sm">
              <Card.Header className="set_btn">
                Rank #{employee.rank}
              </Card.Header>
              <Card.Body >
                <h5>{employee.name}</h5>
                <p>
                  <strong>Sales Amount:</strong> {employee.salesAmount}
                </p>
                <Button variant="primary "className="set_btn">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Employee Table */}
      <Table bordered hover>
        <thead className="table-dark" style={{ backgroundColor: "black", color: "white" }}>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Sale Amount:</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeTableData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.salesAmount}</td>
              <td>
                <Button variant="link" className="text-primary">
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeReport;
