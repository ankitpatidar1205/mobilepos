import React, { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";

const employeeTableData = [
  {
    id: 1,
    name: "cash accesories extra (variation: Default)",
    salesAmount: "1",
  },
  {
    id: 2,
    name: "Eftpos accesories extra (variation: Default)",
    salesAmount: "1",
  },
];
function SalesByItem() {
  // const [activeButton, setActiveButton] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState("Today");
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };
  const handleClearFilters = () => {
    setSelectedFilter("");
  };

  // const buttons = [
  //   { label: "Today", id: 1 },
  //   { label: "Yesterday", id: 2 },
  //   { label: "Last 7 Days", id: 3 },
  //   { label: "This Month", id: 4 },
  //   { label: "Last Month", id: 5 },
  //   { label: "This Year", id: 6 },
  //   { label: "Last Year", id: 7 },
  // ];

  // const handleButtonClick = (id) => {
  //   setActiveButton(id);
  // };
  return (
    <>
      <div className="container my-5">
        <div className="card shadow bg-white my-2">
          <div className="card-body">
            <h4 className="card-title mb-4">Sale By Item Report</h4>
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
                  onClick={handleClearFilters}
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

              {/* Date Range Quick Filters */}
              {/* <div className="d-flex flex-wrap gap-2 mt-4 justify-content-center">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    className={`btn btn-outline-primary ${
                      activeButton === button.id ? "active" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeButton === button.id ? "yellow" : "transparent",
                      color: activeButton === button.id ? "white" : "gray",
                    }}
                    onClick={() => handleButtonClick(button.id)}
                  >
                    {button.label}
                  </button>
                ))}
              </div> */}
            </form>
          </div>
        </div>

        <div className="card p-2">
          <Table bordered hover>
            <thead className="table-dark">
              <tr className="">
                <th>#</th>
                <th>Item</th>
                <th>Total Sold Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employeeTableData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.salesAmount}</td>
                  <td className="text-center">
                    <Button
                      variant="link"
                      className="text-primary"
                      style={{ outline: "none", border: "none" }}
                    >
                      +
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default SalesByItem;
