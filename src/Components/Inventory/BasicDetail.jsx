import React from "react";

const BasicDetail = () => {
  return (
    <div>
      <div className="mx-5 mt-5 mb-4 shadow p-4">
        {/* Header */}
        <h3 className="fw-bold mb-4">Basic Details</h3>
        {/* Form Section */}
        <form>
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="device" className="form-label">
                  If Link with device? Please Select Device
                </label>
                <select className="form-select" id="device">
                  <option>Select Device</option>
                  {/* Options can be added here */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select className="form-select" id="category" required="">
                  <option>Select Category</option>
                  {/* Options can be added here */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="sub-category" className="form-label">
                  Sub Category
                </label>
                <input type="text" className="form-control" id="sub-category" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows={5}
                  defaultValue={""}
                />
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Item show only for my branch? (Phone Phix Malvern)
                </label>
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="description" className="form-label">
                  Device/ Model
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected="">None</option>
                  <option value={1}>Apple 11 </option>
                  <option value={2}>pixel 1</option>
                  <option value={3}>iphone 11</option>
                </select>
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="sub-category" className="form-label">
                  Warranty
                </label>
                <input type="text" className="form-control" id="sub-category" />
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="upccode" className="form-label">
                  UPC Code
                </label>
                <input type="text" className="form-control" id="upccode" />
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="quantity" className="form-label">
                  Quantity *
                </label>
                <input type="number" className="form-control" id="quantity" />
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="costprice" className="form-label">
                  Cost Price *
                </label>
                <input type="number" className="form-control" id="costprice" />
              </div>
              <button
                type="button"
                className="btn text-white rounded px-4 py-2 fw-semibold mt-2"
                style={{ backgroundColor: "#06223a" }}
              >
                Sumbit
              </button>
            </div>
            {/* Right Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="warranty" className="form-label">
                  Warranty
                </label>
                <div className="input-group">
                  <select className="form-select" id="warranty">
                    <option>No Warranty</option>
                    {/* Options can be added here */}
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter duration"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="supplier" className="form-label">
                  Supplier
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supplier"
                  placeholder="None"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="manufacturer" className="form-label">
                  Manufacturer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="manufacturer"
                  placeholder="None"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pricing" className="form-label">
                  Pricing *
                </label>
                <div className="input-group">
                  <span className="input-group-text">A$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="pricing"
                    placeholder={0.0}
                    required=""
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status *
                </label>
                <select className="form-select" id="status" required="">
                  <option>Active</option>
                  {/* Options can be added here */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="tax-class" className="form-label">
                  Tax Class
                </label>
                <select className="form-select" id="tax-class">
                  <option>GST</option>
                  {/* Options can be added here */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input type="text" className="form-control" id="tags" />
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">
                  Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="images"
                  multiple=""
                />
              </div>
              <div className="mb-3 mt-1">
                <label htmlFor="problem" className="form-label">
                  Problem *
                </label>
                <input type="text" className="form-control" id="problem" />
              </div>
              <div className="mb-3 mt-1">
                <label htmlFor="averagejobtime" className="form-label">
                  Average Job Time
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="averagejobtime"
                />
              </div>
              <div className="mb-3 mt-1">
                <label htmlFor="sku" className="form-label">
                  SKU
                </label>
                <input type="text" className="form-control" id="sku" />
              </div>
              <div className="mb-3 mt-1">
                <label htmlFor="retailprice" className="form-label">
                  Retail Price *
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="retailprice"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicDetail;
