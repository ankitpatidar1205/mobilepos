import React, { useState } from "react";
import {
  FaPlus,
  FaMobileAlt,
  FaTabletAlt,
  FaLaptop,
  FaHeadphones,
  FaClock,
} from "react-icons/fa";

const RepairTab = ({ showModal, handleSelection, selectedItems = [] }) => {
  const repairCategories = [
    { id: 1, name: "Screen Repair", icon: <FaMobileAlt size={40} color="#1c202b" />, price: 50 },
    { id: 11, name: "Battery Repair", icon: <FaTabletAlt size={40} color="#1c202b" />, price: 70 },
    { id: 7, name: "Charger Repair", icon: <FaTabletAlt size={40} color="#1c202b" />, price: 30 },
    { id: 9, name: "Software Repair", icon: <FaHeadphones size={40} color="#1c202b" />, price: 40 },
    { id: 13, name: "Hard Disk Repair", icon: <FaLaptop size={40} color="#1c202b" />, price: 100 },
    { id: 14, name: "Watch Repair", icon: <FaClock size={40} color="#1c202b" />, price: 60 },
    { id: 51, name: "Other Issue", icon: <FaLaptop size={40} color="#1c202b" />, price: 80 },
  ];

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
                  <h6 className="card-title" style={{ color: "whitesmoke", marginBottom: 8 }}>ADD NEW</h6>
                  <FaPlus size={25} color="whitesmoke" />
                </div>
              </div>
            </div>

            {repairCategories.map((category) => (
              <div
                key={category.id}
                className="col-6 col-sm-6 col-md-6 col-lg-3 mb-3"
                onClick={() => handleSelection("repair", category)}
              >
                <div
                  className={`card category-card pos-sort-items get_manufacture ${selectedItems && selectedItems.some((i) => i.id === category.id) ? "selected" : ""}`}
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
                    transition: "all 0.3s ease-in-out",
                    backgroundColor: (selectedItems && Array.isArray(selectedItems) && selectedItems.some((i) => i.id === category.id)) 
                    ? "#f0f0f0" 
                    : "#fff",
                
                  
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
      </div>
    </div>
  );
};

export default RepairTab;
