import React, { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FiEye } from "react-icons/fi";
const employeeTableData = [
  {
    id: 1,
    invoce: <FiEye />,
    name: "Phone Phix Malvern",
    item: "Eftpos accesories extra",
    type: "Product",
    Quantity: "1",
  },
  {
    id: 2,
    invoce: <FiEye />,
    name: "Phone Phix Malvern",
    item: "cash accesories extra",
    type: "Product",
    Quantity: "1",
  },
];
function SalesByItemsType() {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);

    const handleFilterClick = (filter) => {
      setSelectedFilter(filter);
    };
  };
  //   const [activeButton, setActiveButton] = useState(null);

  //     const buttons = [
  //       { label: 'Today', id: 1 },
  //       { label: 'Yesterday', id: 2 },
  //       { label: 'Last 7 Days', id: 3 },
  //       { label: 'This Month', id: 4 },
  //       { label: 'Last Month', id: 5 },
  //       { label: 'This Year', id: 6 },
  //       { label: 'Last Year', id: 7 },
  //     ];

  //     const handleButtonClick = (id) => {
  //       setActiveButton(id);
  //     };
  return (
    <>
      <div className="container my-5">
        <div className="card shadow bg-white my-2">
          <div className="card-body">
            <h4 className="card-title mb-4">Sale By Item and Type Report</h4>
            <form>
              <div className="row g-3">
                {/* Select Store */}
                <div className="col-md-3">
                  <label htmlFor="selectStore" className="form-label">
                    Select Store
                  </label>
                  <select className="form-select" id="selectStore">
                    <option value="" disabled selected>
                      Nothing selected
                    </option>
                    <option value="1">Store 1</option>
                    <option value="2">Store 2</option>
                  </select>
                </div>

                {/* Select Type */}
                <div className="col-md-3">
                  <label htmlFor="selectType" className="form-label">
                    Select Type
                  </label>
                  <select className="form-select" id="selectType">
                    <option value="" disabled selected>
                      Select type
                    </option>
                    <option value="1">Repair</option>
                    <option value="2">Unlocking</option>
                    <option value="3">Other</option>
                  </select>
                </div>

                {/* Select Item */}
                <div className="col-md-3">
                  <label htmlFor="selectItem" className="form-label">
                    Select Item
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="selectItem"
                    placeholder="Enter item name"
                  />
                </div>

                {/* From Date */}
                <div className="col-md-3">
                  <label htmlFor="fromDate" className="form-label">
                    From Date
                  </label>
                  <input type="date" className="form-control" id="fromDate" />
                </div>

                {/* To Date */}
                <div className="col-md-3">
                  <label htmlFor="toDate" className="form-label">
                    To Date
                  </label>
                  <input type="date" className="form-control" id="toDate" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2 my-3">
                <button type="button" className="btn btn-primary set_btn">
                  Search
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleFilterClick}
                >
                  Clear Filters
                </button>
                <button type="button" className="btn btn-success ms-auto">
                  Export
                </button>
              </div>

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
            </form>
          </div>
        </div>
        <div className="card p-2">
          <Table bordered hover>
            <thead className="table-dark">
              <tr className="set_btn ">
                <th>Invoice</th>
                <th> Branch</th>
                <th style={{ border: "none" }}>Item</th>
                <th style={{ border: "none" }}>Type</th>
                <th style={{ border: "none" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {employeeTableData.map((employee) => (
                <tr key={employee.id}>
                  <td style={{ border: "none" }} className="text-center">
                    <i
                      className="bi bi-eye"
                      style={{ fontSize: "1.rem", color: "#6f42c1" }}
                    ></i>
                    {employee.invoce}
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.item}</td>
                  <td>
                    <Button
                      variant="link"
                      className="text-primary"
                      style={{
                        outline: "none",
                        border: "none",
                        backgroundColor: "pink",
                        borderRadius: "30px",
                        fontStyle: "none",
                      }}
                    >
                      {employee.type}
                    </Button>
                  </td>
                  <td style={{ border: "none" }}>{employee.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default SalesByItemsType;
