import React, { useState } from 'react'



const headers = [
    "#",
    "Store",
    "Repairs",
    "Unlocking",
    "Products",
    "Tradein",
    "Miscellaneous",
    "Quantity",
    "Sales (Amount Received)",
    "Discounts",
    "Cost",
    "Tax",
    "PROFIT",
    "PROFIT MARGIN"
  ];

  const rows = [
    {
      id: 1,
      store: "Phone Phix Malvern",
      repairs: "A$0.00",
      unlocking: "A$0.00",
      products: "A$1,483.28",
      tradein: "A$0.00",
      miscellaneous: "A$0.00",
      quantity: 2,
      sales: "A$1,493.66",
      discounts: "A$0.00",
      cost: "A$0.00",
      tax: "A$134.80",
      PROFIT: "$1,483.28",
      PROFIT_MARGIN :"200.00%"
    },
  ];


  const footer = {
    total: "TOTAL",
    repairs: "A$0.00",
    unlocking: "A$0.00",
    products: "A$1,483.28",
    tradein: "A$0.00",
    miscellaneous: "A$0.00",
    quantity: 2,
    sales: "A$1,493.66",
    discounts: "A$0.00",
    cost: "A$0.00",
    tax: "A$134.80",
    PROFIT: "A$1,483.28",
      PROFIT_MARGIN :"100.00%"
  };
function MultiStoreSaleSummaryReport() {
    const [activeButton, setActiveButton] = useState(null);
    
      const buttons = [
        { label: 'Today', id: 1 },
        { label: 'Yesterday', id: 2 },
        { label: 'Last 7 Days', id: 3 },
        { label: 'This Month', id: 4 },
        { label: 'Last Month', id: 5 },
        { label: 'This Year', id: 6 },
        { label: 'Last Year', id: 7 },
      ];
    
      const handleButtonClick = (id) => {
        setActiveButton(id);
      };


      const headerStyle = {
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        verticalAlign: "middle",
      };
    
      const cellStyle = {
        textAlign: "center",
        verticalAlign: "middle",
      };
    
      const footerStyle = {
        fontWeight: "bold",
        textAlign: "center",
      };

      
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
                    selecte All
                    </option>
                    <option value="1">Phone Phix Malvern</option>
                   
                  </select>
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
  <button type="button" className="btn btn-danger">
    Clear Filters
  </button>
  <div className="d-flex ms-auto gap-2">
    <button type="button" className="btn btn-success">
      Export PDF
    </button>
    <button type="button" className="btn btn-success">
      Export Excel
    </button>
  </div>
</div>


              {/* Date Range Quick Filters */}
              <div className="d-flex flex-wrap gap-2 mt-4 justify-content-center">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    className={`btn btn-outline-primary ${activeButton === button.id ? 'active' : ''
                      }`}
                    style={{
                      backgroundColor: activeButton === button.id ? '#ff8f25 ' : 'transparent',
                      color: activeButton === button.id ? 'white' : 'gray',
                    }}
                    onClick={() => handleButtonClick(button.id)}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>


        <div className="container my-5">
      {/* Add horizontal scrolling */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} style={headerStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={cellStyle}>{row.id}</td>
                <td style={cellStyle}>{row.store}</td>
                <td style={cellStyle}>{row.repairs}</td>
                <td style={cellStyle}>{row.unlocking}</td>
                <td style={cellStyle}>{row.products}</td>
                <td style={cellStyle}>{row.tradein}</td>
                <td style={cellStyle}>{row.miscellaneous}</td>
                <td style={cellStyle}>{row.quantity}</td>
                <td style={cellStyle}>{row.sales}</td>
                <td style={cellStyle}>{row.discounts}</td>
                <td style={cellStyle}>{row.cost}</td>
                <td style={cellStyle}>{row.tax}</td>
                <td style={cellStyle}>{row.PROFIT}</td>
                <td style={cellStyle}>{row.PROFIT_MARGIN}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td style={footerStyle} colSpan="2">
                {footer.total}
              </td>
              <td style={footerStyle}>{footer.repairs}</td>
              <td style={footerStyle}>{footer.unlocking}</td>
              <td style={footerStyle}>{footer.products}</td>
              <td style={footerStyle}>{footer.tradein}</td>
              <td style={footerStyle}>{footer.miscellaneous}</td>
              <td style={footerStyle}>{footer.quantity}</td>
              <td style={footerStyle}>{footer.sales}</td>
              <td style={footerStyle}>{footer.discounts}</td>
              <td style={footerStyle}>{footer.cost}</td>
              <td style={footerStyle}>{footer.tax}</td>
              <td style={footerStyle}>{footer.PROFIT}</td>
              <td style={footerStyle}>{footer.PROFIT_MARGIN}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    </div>
    </>
  )
}

export default MultiStoreSaleSummaryReport