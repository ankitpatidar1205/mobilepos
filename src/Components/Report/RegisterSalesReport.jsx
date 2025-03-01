import { useState } from "react";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { FiEye } from "react-icons/fi";

const RegisterSalesReport = () => {
  const [store, setStore] = useState("");
  const [fromDate, setFromDate] = useState("2025-01-15");
  const [toDate, setToDate] = useState("2025-01-15");
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = () => {
    console.log("Search Clicked!", { store, fromDate, toDate, selectedFilter });
  };

  const handleClearFilters = () => {
    setStore("");
    setFromDate("");
    setToDate("");
    setSelectedFilter("");
  };

  // Data for the table
  const salesData = [
    {
      invoice: <FiEye />,
      store: "Phone Phix Malvern",
      date: "15 Jan 2025, 05:44 PM",
      customer: "Walkin Customer",
      invoiceItems: 1,
      discount: "A$0.00",
      tax: "A$85.75",
      total: "A$953.66",
      received: "A$953.66",
      receivable: "A$0.00",
    },
    {
      invoice: <FiEye />,
      store: "Phone Phix Malvern",
      date: "15 Jan 2025, 05:42 PM",
      customer: "Walkin Customer",
      invoiceItems: 1,
      discount: "A$0.00",
      tax: "A$49.09",
      total: "A$540.00",
      received: "A$540.00",
      receivable: "A$0.00",
    },
  ];

  return (
    <div className="mt-4 mx-md-5 m-3">
      <div className=" my-5">
        <div className="card shadow bg-white my-2">
          <div className="card-body">
            <h2 className="mb-4">Register Sales Report</h2>

            {/* Input Fields */}
            <Row className="align-items-center mb-4">
              <Col md={3} xs={12} className="mb-3 mb-md-0">
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
              <Col md={3} xs={12} className="mb-3 mb-md-0">
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3} xs={12} className="mb-3 mb-md-0">
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
              <Col md={6} xs={12} className="d-flex gap-3 mb-3 mb-md-0">
                <Button
                  className="set_btn"
                  variant="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
                <Button variant="danger" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </Col>
              <Col md={6} xs={12} className="text-md-end text-center">
                <Button variant="success">Export</Button>
              </Col>
            </Row>

            {/* Quick Filters */}
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
                        selectedFilter === filter
                          ? "warning"
                          : "outline-primary"
                      }
                      onClick={() => handleFilterClick(filter)}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Sales Data Table */}
        <div className="card p-2">
          <Table bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>INVOICE</th>
                <th>STORE</th>
                <th>DATE</th>
                <th>CUSTOMER</th>
                <th>INVOICE ITEMS</th>
                <th>DISCOUNT</th>
                <th>TAX</th>
                <th>TOTAL</th>
                <th>RECEIVED</th>
                <th>RECEIVABLE</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.invoice}</td>
                  <td>{item.store}</td>
                  <td>{item.date}</td>
                  <td>{item.customer}</td>
                  <td>{item.invoiceItems}</td>
                  <td>{item.discount}</td>
                  <td>{item.tax}</td>
                  <td>{item.total}</td>
                  <td>{item.received}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        display: "inline-block",
                      }}
                    >
                      {item.receivable}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RegisterSalesReport;
