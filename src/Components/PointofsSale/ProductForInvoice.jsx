import React, { useState } from "react";
import AddRepairModal from "./AddRepairModal";
import RepairTab from "./RepairTab";
import AccessoriesTab from "./AccessoriesTab";
import ProductCategory from "./ProductCategory";

const ProductForInvoice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("product-category");
  const [selectedItems, setSelectedItems] = useState({
    "product-category": null,
    "repair": [],
    "accessories": [], 
  });
  console.log("selectedItems", selectedItems,currentTab)
  const [totalPrice, setTotalPrice] = useState(0);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const closeInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
  };
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelection = (category, item) => {
    console.log("-----",category)
    setSelectedItems((prev) => {
      let updatedItems = { ...prev };
      if (category === "product-category") {
        updatedItems[category] = item;
      
      } else {
        if (updatedItems[category].some((i) => i.id === item.id)) {
          updatedItems[category] = updatedItems[category].filter((i) => i.id !== item.id); 
        } else {
          updatedItems[category] = [...updatedItems[category], item]; 
        }
      }
      return updatedItems;
    });
    updateTotalPrice();
  };

  const handleNextTab = () => {
    const tabSequence = ["Product-Category","repair", "accessories", "summary"];
    const currentIndex = tabSequence.indexOf(currentTab);
  
    if (currentIndex < tabSequence.length - 1) {
      setCurrentTab(tabSequence[currentIndex + 1]); 
    }
  };
  const updateTotalPrice = () => {
    let total = 0;
    if (selectedItems["product-category"]) {
      total += selectedItems["product-category"].price;
    }
    selectedItems["repair"].forEach((item) => (total += item.price));
    selectedItems["accessories"].forEach((item) => (total += item.price));
    setTotalPrice(total);
  };

  return (
    <div className="ProductForInvoice">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="tabs-container mb-3">
              <ul className="nav nav-tabs">
                {["product-category", "repair", "accessories", "summary"].map((tab) => (
                  <li key={tab} className="nav-item">
                    <a
                      className={`nav-link ${currentTab === tab ? "active" : ""}`}
                      onClick={() => setCurrentTab(tab)}
                      style={{ cursor: "pointer" }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content">
              {currentTab === "product-category" && (
                <ProductCategory handleSelection={handleSelection} handleNextTab={handleNextTab} showModal={showModal} />
              )}
              {currentTab === "repair" && (
               <RepairTab handleSelection={handleSelection} handleNextTab={handleNextTab} showModal={showModal} selectedItems={selectedItems["repair"] || []} />

              )}
              {currentTab === "accessories" && (
                <AccessoriesTab handleSelection={handleSelection} handleNextTab={handleNextTab}  selectedItems={selectedItems["accessories"] || []}  showModal={showModal} />
              )}
            </div>
            <div className="mt-3">
              <h4>Total Price: ${totalPrice}</h4>
            </div>
          </div>
        </div>
        {isModalOpen && <AddRepairModal isOpen={isModalOpen} onClose={closeModal} />}
        {isInvoiceModalOpen && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Invoice Summary</h5>
                  <button
                    className="btn-close"
                    onClick={closeInvoiceModal}
                  ></button>
                </div>
                <div className="modal-body"></div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={closeInvoiceModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductForInvoice;

