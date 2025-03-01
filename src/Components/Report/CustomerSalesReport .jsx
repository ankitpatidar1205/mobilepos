import { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

const CustomerSalesReport = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const handleSearch = () => {
    console.log("Search Clicked!", { customerName, customerEmail, customerPhone });
  };

  const handleClearFilters = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
  };

  const customerData = [
    { name: "siobhan", phone: "0418348516", email: "-", totalSale: 2, totalAmount: "A$685.46", paid: "A$685.46", balance: "A$0.00" },
    { name: "adi", phone: "0424626940", email: "-", totalSale: 2, totalAmount: "A$129.49", paid: "A$129.50", balance: "A$-0.01" },
    { name: "avi maharaj", phone: "0452626039", email: "-", totalSale: 1, totalAmount: "A$45.00", paid: "A$45.00", balance: "A$0.00" },
    { name: "amber", phone: "0450073301", email: "-", totalSale: 1, totalAmount: "A$121.32", paid: "A$121.32", balance: "A$0.00" },
    { name: "brook", phone: "0400742700", email: "-", totalSale: 1, totalAmount: "A$220.00", paid: "A$220.00", balance: "A$0.00" },
    { name: "bernadette", phone: "0432634106", email: "-", totalSale: 1, totalAmount: "A$80.88", paid: "A$80.88", balance: "A$0.00" },
  ];

  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Customer Sales Report</h2>

      {/* Input Fields */}
      <Row className="align-items-center mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Customer Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Customer Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Customer Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Customer Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
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

      {/* Customer Table */}
      <Table bordered hover>
        <thead className="table-dark" style={{ backgroundColor: "#333", color: "#fff" }}>
          <tr>
            <th>Customer Name</th>
            <th>Customer Phone</th>
            <th>Customer Email</th>
            <th>Total Sale</th>
            <th>Total Amount</th>
            <th>Paid</th>
            <th>Balance</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.totalSale}</td>
              <td>{customer.totalAmount}</td>
              <td>{customer.paid}</td>
              <td>{customer.balance}</td>
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

export default CustomerSalesReport;
