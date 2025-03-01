import React from "react";
import { Link } from "react-router-dom";

const ManageEstimates = () => {
  return (
    <div>
      <div className="mx-md-5 mt-5 m-3">
        <div className="shadow p-4">
          <div className="row top d-flex justify-content-between">
            <div className="col-md-9">
              <h3 className="mb-md-4 mb-2 fw-semibold">Manage Estimates</h3>
            </div>
            <div className="col-md-3 text-md-end">
              <button
                type="button"
                className="btn text-white rounded px-4 py-2 fw-semibold mt-4"
                style={{ backgroundColor: "#06223a" }}
              >
                <i className="fa-solid fa-plus" />
                <Link
                  to="/CreateTicket"
                  className="text-decoration-none text-white ms-2"
                >
                  Create New Tickets
                </Link>
              </button>
            </div>
          </div>
          <form className="row g-3 mt-4">
            <div className="col-md-6 col-lg-4">
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
            <div className="col-md-6 col-lg-4">
              <label htmlFor="invoiceId" className="form-label fw-semibold">
                Estimate ID
              </label>
              <input
                type="number"
                className="form-control"
                id="invoiceId"
                placeholder="Estimate ID"
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="invoiceStatus" className="form-label fw-semibold">
                Estimate Status
              </label>
              <select id="invoiceStatus" className="form-select">
                <option selected="">Select Status</option>
                <option value={1}>Cancelled</option>
                <option value={2}>Completed</option>
                <option value={3}>Customer Reply</option>
              </select>
            </div>
            <div className="col-md-6 col-lg-4">
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
            <div className="col-md-6 col-lg-4">
              <div className="mb-3">
                <label htmlFor="fromDate" className="form-label fw-semibold">
                  From Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fromDate"
                  defaultValue="2025-01-15"
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="mb-3">
                <label htmlFor="fromDate" className="form-label  fw-semibold">
                  To Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fromDate"
                  defaultValue="2025-01-15"
                />
              </div>
            </div>
          </form>
          <button
            type="button"
            className="btn text-white rounded px-4 py-2 fw-semibold mt-4"
            style={{ backgroundColor: "#06223a" }}
          >
            Search
          </button>
        </div>
        <div className="table-responsive mt-2 shadow p-3">
          <table className="table align-middle table-striped mx-2">
            <thead className="table-dark">
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Estimate ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Contact #</th>
                <th>Device</th>
                <th>Product</th>
                <th>Status</th>
                <th>Total</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={10} className="text-center text-muted">
                  No Data Available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEstimates;
