import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const RepairTab = ({ showModal, handleSelection, selectedItems, repairParts = [] }) => {

  console.log("repaire parts ", selectedItems);
  return (
    <div className="tab-pane fade show active">
      <div className="row">
        <div className="lower-container-child" id="category-tab" style={{ flexGrow: 1 }}>
          <div className="repair_categories_section row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-3">
              <div
                className="card category-card text-white bg-dark"
                style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", cursor: "pointer" }}
                onClick={showModal}
              >
                <div className="card-body pt-3">
                  <h6 className="card-title" style={{ color: "whitesmoke"}}>  <Link
                   to="/create-product" style={{color: "white", textDecoration: "none"}}>  ADD New </Link></h6>
                  <FaPlus size={25} color="whitesmoke" />
                </div>
              </div>
            </div>

            {repairParts.map((part) => (
              <div
                key={part._id}
                className="col-6 col-sm-6 col-md-6 col-lg-3 mb-3"
                onClick={() => handleSelection("repair-parts", part)}
              >
                <div
                  className={`card category-card ${selectedItems?.some((i) => i._id === part._id) ? "border-2  shadow-md" : ""}`}
                  style={{
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: selectedItems?.some((i) => i._id === part._id) ? "#f0f0f0" : "#fff",
                  }}
                >
                  <div className="card-body text-center">
                    <p className="title_name mt-2">{part.partName}</p>
                    <p className="price">${part.partPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairTab;
