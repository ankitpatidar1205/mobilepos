import React from "react";
import { Link } from "react-router-dom";

const UpComningNetwork = () => {
  return (
    <div>
      <div className="mx-md-5 m-3 mt-5">
        <div className="shadow p-4">
          <div className="row top d-flex justify-content-between">
            <div className="col-md-9">
              <h3 className="mb-md-4  mb-2 fw-semibold">
                Manage unlocking Products
              </h3>
            </div>
            <div className="col-md-3 text-md-end">
              <button
                type="button"
                className="btn text-white rounded px-4 py-2 fw-semibold mt-4"
                style={{ backgroundColor: "#06223a" }}
              >
                <i className="fa-solid fa-plus" />
                <Link
                  to="/BasicDetail"
                  className="text-decoration-none text-white ms-2"
                >
                  Create New
                </Link>
              </button>
            </div>
          </div>
          <form className="row g-3 mt-4">
            <div className="col-md-6 col-lg-4">
              <label htmlFor="customerName" className="form-label fw-semibold">
                Item ID
              </label>
              <input
                type="number"
                className="form-control"
                id="customerName"
                placeholder="Enter Item ID"
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="invoiceId" className="form-label fw-semibold">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="invoiceId"
                placeholder="Search Item"
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="invoiceStatus" className="form-label fw-semibold">
                Item Category
              </label>
              <select id="invoiceStatus" className="form-select">
                <option selected="">Select Category</option>
                <option value={1}>Case</option>
                <option value={2}>Battery</option>
                <option value={3}>TPG</option>
              </select>
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
          <table className="table align-middle table-striped">
            <thead className="table-dark">
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Supplier</th>
                <th>Variation (Phone Phix Malvern)</th>
                <th>Status</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>29658</td>
                <td>
                  <img
                    src="https://i.ibb.co/1Jq1f0q/Screenshot-2025-01-15-173651.png"
                    alt=""
                  />
                </td>
                <td>FRP Unlock</td>
                <td>Shopify Products</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <button
                    type="button"
                    className="btn text-white rounded-pill px-4 py-2 fw-semibold"
                    style={{ backgroundColor: "#06223a" }}
                  >
                    <span>
                      <i className="fa-solid fa-eye me-1" />
                    </span>{" "}
                    Manage
                  </button>
                </td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
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
                <td>29038</td>
                <td>
                  <img
                    src="https://i.ibb.co/1Jq1f0q/Screenshot-2025-01-15-173651.png"
                    alt=""
                  />
                </td>
                <td>lenovo laptop Service Charges</td>
                <td>Devices</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <button
                    type="button"
                    className="btn text-white rounded-pill px-4 py-2 fw-semibold"
                    style={{ backgroundColor: "#06223a" }}
                  >
                    <span>
                      <i className="fa-solid fa-eye me-1" />
                    </span>{" "}
                    Manage
                  </button>
                </td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
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
                <td>4036</td>
                <td>
                  <img
                    src="https://i.ibb.co/1Jq1f0q/Screenshot-2025-01-15-173651.png"
                    alt=""
                  />
                </td>
                <td>Plato Spears</td>
                <td>Accessories</td>
                <td>Cables</td>
                <td>Mobile</td>
                <td>
                  <button
                    type="button"
                    className="btn text-white rounded-pill px-4 py-2 fw-semibold"
                    style={{ backgroundColor: "#06223a" }}
                  >
                    <span>
                      <i className="fa-solid fa-eye me-1" />
                    </span>{" "}
                    Manage
                  </button>
                </td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
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

export default UpComningNetwork;
