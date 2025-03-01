import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const ManageInvoices = () => {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div>
      <div className="mx-md-5 mt-5 m-3">
        <div className="shadow p-4">
          <h3 className="mb-4 fw-semibold">Manage Repair</h3>
          {/* <form className="row g-3 mt-4">
            <div className="col-md-6 col-lg-3">
              <label htmlFor="customerName" className="form-label fw-semibold">
                Customer Name
              </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="Customer Name"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label htmlFor="invoiceId" className="form-label fw-semibold">
                Invoice ID
              </label>
              <input
                type="text"
                className="form-control"
                id="invoiceId"
                placeholder="Invoice ID"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label htmlFor="invoiceStatus" className="form-label fw-semibold">
                Invoice Status
              </label>
              <select id="invoiceStatus" className="form-select">
                <option selected="">Invoice Status</option>
                <option value={1}>Paid in Full</option>
                <option value={2}>Partial Paid</option>
                <option value={3}>Pending</option>
              </select>
            </div>
            <div className="col-md-6 col-lg-3">
              <label htmlFor="employee" className="form-label fw-semibold">
                Employee
              </label>
              <select id="employee" className="form-select">
                <option selected="">Select Employee</option>
                <option value={1}>Jay</option>
                <option value={2}>Zyan</option>
                <option value={3}>Mayna</option>
              </select>
            </div>
          </form> */}
          {/* Quick Filters */}
          {/* <Row className="justify-content-center text-center mb-4 mt-5">
            <Col md={10}>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {[
                  "Today",
                  "Yesterday",
                  "Last 7 Days",
                  "This Month",
                  "Last Month",
                  "All",
                  "Custom",
                ].map((filter) => (
                  <Button
                    key={filter}
                    className="w-15"
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
          </Row> */}
          {/* <button
            type="button"
            className="btn text-white rounded px-4 py-2 fw-semibold mt-3"
            style={{ backgroundColor: "#06223a" }}
          >
            Search
          </button> */}
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Select Date Range
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="fromDate" className="form-label">
                    From
                  </label>
                  <input type="date" className="form-control" id="fromDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="toDate" className="form-label">
                    To
                  </label>
                  <input type="date" className="form-control" id="toDate" />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#06223a", color: "white" }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive mt-2 shadow p-3">
          <table className="table align-middle table-border table-striped">
            <thead className="table-dark">
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Branch</th>
                <th>User</th>
                <th>Customer Name</th>
                <th>Device/Items</th>
                <th>Status</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>813530</td>
                <td>
                  15 Jan 2025, <br /> 05:44 PM
                </td>
                <td>Phone Phix Malvern</td>
                <td>nitin</td>
                <td>Walk-in Customer</td>
                <td>
                  <strong className="text-secondary">Non-repair Items:</strong>
                  <br />
                  <strong>
                    Eftpos accessories extra
                    <br />
                    (variation: Default)
                  </strong>
                </td>
                <td>Paid in Full</td>
                <td>A$953.66</td>
                <td>A$953.66</td>
                <td>A$0.00</td>
                <td>
                  <button
                    className="btn px-3 py-1 rounded-circle"
                    style={{ backgroundColor: "#06223a", color: "white" }}
                  >
                    <i className="fa-solid fa-ellipsis-vertical" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>813529</td>
                <td>
                  15 Jan 2025, <br /> 05:42 PM
                </td>
                <td>Phone Phix Malvern</td>
                <td>nitin</td>
                <td>Walk-in Customer</td>
                <td>
                  <strong className="text-secondary">Non-repair Items:</strong>
                  <br />
                  <strong>
                    Cash accessories extra
                    <br />
                    (variation: Default)
                  </strong>
                </td>
                <td>Paid in Full</td>
                <td>A$540.00</td>
                <td>A$540.00</td>
                <td>A$0.00</td>
                <td>
                  <button
                    className="btn px-3 py-1 rounded-circle"
                    style={{ backgroundColor: "#06223a", color: "white" }}
                  >
                    <i className="fa-solid fa-ellipsis-vertical" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageInvoices;
