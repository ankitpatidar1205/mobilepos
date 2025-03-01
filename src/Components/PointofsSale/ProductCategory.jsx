import React from "react";
import {
  FaPlus,
  FaMobileAlt,
  FaTabletAlt,
  FaLaptop,
} from "react-icons/fa";

const ProductCategory = ({ showModal, handleSelection, selectedItems, handleNextTab }) => {
  const categories = [
    { id: 1, name: "Mobile", icon: <FaMobileAlt size={40} color="#1c202b" />, price: 100 },
    { id: 2, name: "Tablet", icon: <FaTabletAlt size={40} color="#1c202b" />, price: 200 },
    { id: 3, name: "Laptop", icon: <FaLaptop size={40} color="#1c202b" />, price: 300 },
  ];

  return (
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
                <h6 className="card-title" style={{ color: "whitesmoke", marginBottom: 8 }}>ADD NEW</h6>
                <FaPlus size={25} color="whitesmoke" />
              </div>
            </div>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              className="col-6 col-sm-6 col-md-6 col-lg-3 mb-3"
              onClick={() => handleSelection("product-category", category)}
            >
              <div
                className={`card category-card pos-sort-items get_manufacture ${selectedItems?.id === category.id ? "selected" : ""}`}
                style={{
                  height: "140px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "15px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: selectedItems?.id === category.id ? "#f0f0f0" : "#fff",
                //   border: selectedItems?.id === category.id ? "2px solid #007bff" : "none",
                }}
              >
                <div className="card-body text-center">
                  {category.icon}
                  <p className="title_name mt-2">{category.name}</p>
                  <p className="price">${category.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleNextTab}>Next</button>
      </div>
    </div>
  );
};

export default ProductCategory;
