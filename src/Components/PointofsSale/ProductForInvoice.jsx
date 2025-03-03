import React, { useState, useEffect } from "react";
import AddRepairModal from "./AddRepairModal";
import RepairTab from "./RepairTab";
import AccessoriesTab from "./AccessoriesTab";
import ServicesPage from "./ServicesPage";
import SummaryPage from "./SummaryPage";
import { FaArrowRight } from "react-icons/fa";

const ProductForInvoice = ({ invoiceData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Services");
  const [selectedItems, setSelectedItems] = useState({
    products: [],
    Services: [],
    "repair-parts": [],
    accessories: [],
    tax: null,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [services, setServices] = useState([]);
  const [repairParts, setRepairParts] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    if (invoiceData) {
      handleProductSelection(invoiceData);
    }
  }, [invoiceData]);

  const updateTotalPrice = () => {
    let total = 0;
    selectedItems["Services"].forEach((item) => (total += parseFloat(item.serviceprice)));
    selectedItems["repair-parts"].forEach((item) => (total += parseFloat(item.partPrice)));
    selectedItems["accessories"].forEach((item) => (total += parseFloat(item.accessoriesPrice)));
    const tax = total * (taxRate / 100);
    total += tax; // Add tax
    setTotalPrice(total);
  };

  const handleProductSelection = (product) => {
    setServices(product.services || []);
    setRepairParts(product.repairParts || []);
    setAccessories(product.accessories || []);
    setSelectedItems({
      Services: [],
      "repair-parts": [],
      accessories: [],
    });
    updateTotalPrice();
  };

  const handleSelection = (category, item) => {
    setSelectedItems((prev) => {
      let updatedItems = { ...prev };
      if (category === "Services") {
        if (updatedItems[category].some((i) => i._id === item._id)) {
          updatedItems[category] = updatedItems[category].filter(
            (i) => i._id !== item._id
          );
        } else {
          updatedItems[category] = [...updatedItems[category], item];
        }
      } else if (category === "repair-parts" || category === "accessories") {
        if (updatedItems[category].some((i) => i._id === item._id)) {
          updatedItems[category] = updatedItems[category].filter(
            (i) => i._id !== item._id
          );
        } else {
          updatedItems[category] = [...updatedItems[category], item];
        }
      }
      return updatedItems;
    });
    updateTotalPrice();
  };

  const handleNextTab = () => {
    const tabSequence = ["Services", "repair-parts", "accessories", "summary"];
    const currentIndex = tabSequence.indexOf(currentTab);

    if (currentIndex < tabSequence.length - 1) {
      setCurrentTab(tabSequence[currentIndex + 1]);
    }
  };

  return (
    <div className="ProductForInvoice">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="tabs-container mb-3">
              <ul className="nav nav-tabs">
                {["Services", "repair-parts", "accessories", "summary"].map((tab) => (
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
              {currentTab !== "summary" && (
                <div className="my-2 d-flex justify-content-end ">
                  <button className="btn border-0 btn-primary d-flex align-items-center gap-2" onClick={handleNextTab}>
                    Next
                    <FaArrowRight />
                  </button>
                </div>
              )}

              {currentTab === "Services" && (
                <ServicesPage
                  handleSelection={handleSelection}
                  handleNextTab={handleNextTab}
                  selectedItems={selectedItems["Services"] || []}
                  services={services}
                />
              )}

              {currentTab === "repair-parts" && (
                <RepairTab
                  handleSelection={handleSelection}
                  handleNextTab={handleNextTab}
                  selectedItems={selectedItems["repair-parts"] || []}
                  repairParts={repairParts}
                />
              )}

              {currentTab === "accessories" && (
                <AccessoriesTab
                  handleSelection={handleSelection}
                  handleNextTab={handleNextTab}
                  selectedItems={selectedItems["accessories"] || []}
                  accessories={accessories}
                />
              )}

              {currentTab === "summary" && (
                <SummaryPage
                  selectedItems={selectedItems}
                  totalPrice={totalPrice}
                  setTaxRate={setTaxRate}
                />
              )}
            </div>


          </div>
        </div>
        {isModalOpen && <AddRepairModal isOpen={isModalOpen} />}
      </div>
    </div>
  );
};

export default ProductForInvoice;
