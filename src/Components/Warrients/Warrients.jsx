import { Link } from "react-router-dom";

const Warrients = () => {
  return (
    <div>
      <>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Warranties</h2>
                <Link to="/AddWarrient">
                  {" "}
                  <button
                    style={{ backgroundColor: "#06223a", border: "none" }}
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <span>Add Warranty Manually</span>
                    <i className="ms-2 bi bi-gear" />
                  </button>
                </Link>
              </div>
              <form className="row g-3">
                <div className="col-md-2">
                  <label htmlFor="invoiceId" className="form-label">
                    Invoice ID
                  </label>
                  <input
                    type="text"
                    id="invoiceId"
                    className="form-control"
                    placeholder="Invoice ID"
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="customerName" className="form-label">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    className="form-control"
                    placeholder="Customer Name"
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="warrantyStatus" className="form-label">
                    Warranty Status
                  </label>
                  <select id="warrantyStatus" className="form-select">
                    <option selected="">Select Warranty Status</option>
                    <option value={1}>Active</option>
                    <option value={2}>Expired</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="fromDate" className="form-label">
                    From Date
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    className="form-control"
                    defaultValue="2025-01-15"
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="toDate" className="form-label">
                    To Date
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className="form-control"
                    defaultValue="2025-01-15"
                  />
                </div>
                <div className="col-12">
                  <button
                    style={{ backgroundColor: "#06223a", border: "none" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Warranty List</h2>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Invoice</th>
                      <th>Item</th>
                      <th>Customer</th>
                      <th>Warranty</th>
                      <th>Warranty Start Date</th>
                      <th>Warranty End Date</th>
                      <th>Warranty Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#" className="text-primary">
                          View Invoice
                        </a>
                      </td>
                      <td>
                        MUSO Tough Glass Extreme Protection Full TPG iPhone
                        (size: 16 Pro Max)
                      </td>
                      <td>Walk-In Customer</td>
                      <td>3 Month</td>
                      <td>15 Jan 2025</td>
                      <td>15 Apr 2025</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary rounded-pill btn-sm"
                          style={{ backgroundColor: "#06223a", border: "none" }}
                        >
                          <i className="fa-solid fa-ellipsis-vertical" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" className="text-primary">
                          View Invoice
                        </a>
                      </td>
                      <td>
                        Wekome 4-in-1 Charging Cable (Copy) (size: Default
                        Title)
                      </td>
                      <td>Walk-In Customer</td>
                      <td>3 Month</td>
                      <td>15 Jan 2025</td>
                      <td>15 Apr 2025</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary rounded-pill btn-sm"
                          style={{ backgroundColor: "#06223a", border: "none" }}
                        >
                          <i className="fa-solid fa-ellipsis-vertical" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" className="text-primary">
                          View Invoice
                        </a>
                      </td>
                      <td>
                        Apple iPad 10.2" 9th Generation
                        <br />
                        <small>
                          Category: iPad Repair
                          <br />
                          Problems: Touch Digitizer Glass
                          <br />
                          Part: iPad digitizer - (Variation: Default)
                        </small>
                      </td>
                      <td>Ajani</td>
                      <td>3 Month</td>
                      <td>15 Jan 2025</td>
                      <td>15 Apr 2025</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary rounded-pill btn-sm"
                          style={{ backgroundColor: "#06223a", border: "none" }}
                        >
                          <i className="fa-solid fa-ellipsis-vertical" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" className="text-primary">
                          View Invoice
                        </a>
                      </td>
                      <td>
                        Apple iPhone 12 Pro Max
                        <br />
                        <small>
                          Category: Mobile Repair
                          <br />
                          Problems: Screen (Digitizer+LCD) Replacement
                          <br />
                          Part: SERVICE PACK SCREEN - (Variation: Default)
                        </small>
                      </td>
                      <td>Rattandeep</td>
                      <td>3 Month</td>
                      <td>15 Jan 2025</td>
                      <td>15 Apr 2025</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary rounded-pill btn-sm"
                          style={{ backgroundColor: "#06223a", border: "none" }}
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
        </div>
      </>
    </div>
  );
};

export default Warrients;
