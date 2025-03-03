import React, { useState, useEffect } from "react";
import { Card, Button as AntButton, Row, Col, Select } from "antd";
import { FaPlus } from "react-icons/fa";
import { jsPDF } from "jspdf";

const { Option } = Select;

const SummaryPage = ({ selectedItems, totalPrice, setTaxRate }) => {
  const handleTaxSelection = (e) => {
    const taxRate = e === "USD" ? 5 : e === "AUS" ? 10 : e === "IND" ? 18 : 0;
    setTaxRate(taxRate);
  };

  // Calculate subtotal and tax
  const subtotal = () => {
    let total = 0;
    selectedItems["Services"].forEach((item) => (total += parseFloat(item.serviceprice)));
    selectedItems["repair-parts"].forEach((item) => (total += parseFloat(item.partPrice)));
    selectedItems["accessories"].forEach((item) => (total += parseFloat(item.accessoriesPrice)));
    return total;
  };

  const totalAmountWithTax = () => {
    const subTotal = subtotal();
    const tax = subTotal * (setTaxRate / 100);
    return subTotal + tax;
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.text('Invoice', 20, 20);

    // Subtotal
    doc.text('Subtotal: $' + subtotal().toFixed(2), 20, 30);

    // Tax
    doc.text('Tax: $' + (subtotal() * (setTaxRate / 100)).toFixed(2), 20, 40);

    // Total
    doc.text('Total: $' + totalAmountWithTax().toFixed(2), 20, 50);

    // Save as PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="summary-page">
      <div className="container mt-4">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="Invoice Summary" className="shadow-sm bg-light rounded p-4">
              {/* Total Items Summary */}
              <div className="d-flex justify-content-between pb-3 border-bottom">
                <span>Total Items</span>
                <span>{selectedItems["Services"].length + selectedItems["repair-parts"].length + selectedItems["accessories"].length}</span>
              </div>

              {/* Services Summary */}
              <div className="mt-3  border-bottom">
                <h5>Services</h5>
                {selectedItems["Services"].map((item) => (
                  <div key={item._id} className="d-flex justify-content-between">
                    <span>{item.servicename}</span>
                    <span>A${item.serviceprice}</span>
                  </div>
                ))}
              </div>

              {/* Repair Parts Summary */}
              <div className="mt-3  border-bottom">
                <h5>Repair Parts</h5>
                {selectedItems["repair-parts"].map((item) => (
                  <div key={item._id} className="d-flex justify-content-between">
                    <span>{item.partName}</span>
                    <span>A${item.partPrice}</span>
                  </div>
                ))}
              </div>

              {/* Accessories Summary */}
              <div className="mt-3  border-bottom">
                <h5>Selected Accessories</h5>
                {selectedItems["accessories"].map((item) => (
                  <div key={item._id} className="d-flex justify-content-between">
                    <span>{item.accessoriesName}</span>
                    <span>A${item.accessoriesPrice}</span>
                  </div>
                ))}
              </div>

              {/* Tax and Total Calculation */}
              <div className="mt-3 d-flex justify-content-between">
                <span>Subtotal</span>
                <span>A${subtotal().toFixed(2)}</span>
              </div>

              {/* Tax Select */}
              <div className="mt-3 d-flex justify-content-between">
                <span>Tax</span>
                <Select defaultValue="No Tax" onChange={handleTaxSelection} className=" mb-3" style={{ width: 150 }}>
                  <Option value="USD">USD Tax (5%)</Option>
                  <Option value="AUS">Australia Tax (10%)</Option>
                  <Option value="IND">India Tax (18%)</Option>
                  <Option value="No Tax">No Tax</Option>
                </Select>
              </div>

              <div className="mt-3 d-flex justify-content-between">
                <h5 className="fw-bold">Total Price</h5>
                <h5 className="fw-bold text-success">A${totalAmountWithTax().toFixed(2)}</h5>
              </div>

              {/* Button Section */}
              <div className="mt-4 d-flex gap-2 justify-content-center">
                <AntButton type="primary" onClick={generateInvoice}>
                  Generate Invoice 🧾
                </AntButton>
                <AntButton danger onClick={() => { /* Clear Selection Logic */ }} disabled={!selectedItems.length}>
                  Clear Selection ❌
                </AntButton>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SummaryPage;
