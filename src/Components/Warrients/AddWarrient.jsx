

const AddWarrient = () => {
  return (
    <div>
      <div className="container mt-5">
  <div className="card">
    <div className="card-body">
      <h2 className="mb-4">Add Warranty Manually</h2>
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <form>
            <div className="mb-3">
              <label htmlFor="item" className="form-label">
                Item
              </label>
              <select id="item" className="form-select">
                <option selected="" disabled="">
                  Select Item
                </option>
                <option value={1}>Item 1</option>
                <option value={2}>Item 2</option>
                <option value={3}>Item 3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="customer" className="form-label">
                Customer (Optional)
              </label>
              <select id="customer" className="form-select">
                <option selected="" disabled="">
                  Select Customer
                </option>
                <option value={1}>Customer 1</option>
                <option value={2}>Customer 2</option>
                <option value={3}>Customer 3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="purchaseDate" className="form-label">
                Purchase Date
              </label>
              <input
                type="date"
                id="purchaseDate"
                className="form-control"
                defaultValue="2025-01-15"
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="warranty" className="form-label">
                  Warranty
                </label>
                <input
                  type="number"
                  id="warranty"
                  className="form-control"
                  defaultValue={0}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="warrantyType" className="form-label">
                  Warranty Type
                </label>
                <select id="warrantyType" className="form-select">
                  <option selected="">No Warranty</option>
                  <option value={1}>1 Year</option>
                  <option value={2}>2 Years</option>
                  <option value={3}>3 Years</option>
                </select>
              </div>
            </div>
            <button
              style={{ backgroundColor: "#06223a", border: "none" }}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default AddWarrient
