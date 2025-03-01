import React from "react";
import { FaPlus, FaMobileAlt, FaLaptop } from "react-icons/fa";

const AccessoriesTab = ({ showModal, handleSelection, selectedItems, handleNextTab }) => {
  const accessoriesData = {
    mobile: [
      { id: 1, name: "Screen Protector", price: 20, image: "https://img.freepik.com/free-photo/hand-holding-shattered-smart-phone-communication-lost-generated-by-ai_188544-33964.jpg" },
      { id: 2, name: "Phone Cover", price: 15, image: "https://img.freepik.com/premium-vector/premium-creative-simple-mockup-screen-iphone-16-soft-pink-gradient-vector_171508-4143.jpg" },
      { id: 3, name: "Screen Protector", price: 20, image: "https://img.freepik.com/free-photo/hand-holding-shattered-smart-phone-communication-lost-generated-by-ai_188544-33964.jpg" },
      // { id: 4, name: "Phone Case", price: 15, image: "https://img.freepik.com/premium-vector/premium-creative-simple-mockup-screen-iphone-16-soft-pink-gradient-vector_171508-4143.jpg" },
    ],
    laptop: [
      { id: 5, name: "Laptop Bag", price: 50, image: "https://img.freepik.com/free-photo/old-brown-leather-briefcase_1101-764.jpg" },
      { id: 6, name: "USB Hub", price: 30, image: "https://img.freepik.com/free-photo/pendrive-isolated-white_1368-6389.jpg" }
    ]
  };

  return (
    <div className="tab-pane fade show active">
      <div className="d-flex flex-wrap justify-content-center">
        <div className="col-12 mb-3">
          <button className="btn btn-dark" onClick={showModal}>
            <FaPlus size={16} /> ADD NEW
          </button>
        </div>
        {Object.keys(accessoriesData).map((category) => (
          <div key={category} className="col-12 mb-3">
            <h5 className="text-start">{category === "mobile" ? <FaMobileAlt /> : <FaLaptop />} {category.charAt(0).toUpperCase() + category.slice(1)} Accessories</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {accessoriesData[category].map((item) => (
                <div key={item.id} className="m-2" onClick={() => handleSelection("accessories", item)}>
                  <div className={`card category-card ${selectedItems.some((acc) => acc.id === item.id) ? "border border-primary shadow" : ""}`} style={{ width: "150px", textAlign: "center", cursor: "pointer" }}>
                    <img src={item.image} alt={item.name} className="card-img-top p-2" style={{ height: "100px", objectFit: "cover" }} />
                    <div className="card-body">
                      <p className="card-title font-weight-bold" style={{ fontSize: "14px" }}>{item.name}</p>
                      <p className="card-text text-muted" style={{ fontSize: "12px" }}>A${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleNextTab}>Next</button>
      </div>
    </div>
  );
};

export default AccessoriesTab;
