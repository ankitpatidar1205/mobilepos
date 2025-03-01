import React from "react";

const CreateTicket = () => {
  return (
    <div>
      <div className="mx-4 mt-5 p-3 mb-4 shadow">
        {/* Header */}
        <h3 className="fw-semibold mb-4">Create Ticket</h3>
        {/* Form Section */}
        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white" id="basic-addon1">
                Customer
              </span>
              <input
                type="text"
                className="form-control"
                id="customer"
                placeholder="Search customer..."
              />
              <button
                className="btn text-white"
                style={{ backgroundColor: "#ff9f43" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create Customer
              </button>
            </div>
          </div>
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
                  Add New Customer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="Deo"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="John@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="number" className="form-label">
                        Phone
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="number"
                        placeholder="1123 456 789"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        Postcode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="Postcode"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected="">India</option>
                      <option value={1}>Australia</option>
                      <option value={2}>USA</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#06223a", color: "white" }}
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-6">
            <div>
              <span className="input-group-text pe-5" id="basic-addon1">
                Walkin Customer
              </span>
            </div>
          </div>
        </div>
        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <span
                className="input-group-text bg-white pe-5"
                id="basic-addon1"
              >
                Date
              </span>
              <input
                type="date"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="date"
                defaultValue="2025-01-15"
              />
            </div>
          </div>
        </div>
        {/* Table Section */}
        <div
          className="table-responsive py
        -3 mb-4"
        >
          <table className="table align-middle table-bordered">
            <thead>
              <tr>
                <th>ITEM NAME</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>DISCOUNT</th>
                <th>TAX</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  No Data Available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Add Item Button */}
        <div className="d-flex justify-content-end me-3 mb-4">
          <button
            className="add-item-btn rounded-pill px-4 py-1 fw-semibold"
            style={{ backgroundColor: "#06223a", color: "white" }}
          >
            Add Item
          </button>
        </div>
        {/* Summary Section */}
        <div className="row">
          <div className="col-md-4 ms-auto">
            <div className="summary-section">
              <span>Total Items:</span>
              <span className="mt-2 me-3 d-flex justify-content-between">
                Discount: <span>$0.00</span>
              </span>
              <span className="mt-2 me-3 d-flex justify-content-between">
                Tax: <span>$0.00</span>
              </span>
              <span className="mt-2 me-3 d-flex justify-content-between">
                Sub Total: <span>$0.00</span>
              </span>
              <span className="mt-2 me-3 d-flex justify-content-between">
                TOTAL: <span>$0.00</span>
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end me-3 mt-5 mb-4">
          <button
            className="add-item-btn rounded-pill px-4 py-1 fw-semibold"
            style={{ backgroundColor: "#06223a", color: "white" }}
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
