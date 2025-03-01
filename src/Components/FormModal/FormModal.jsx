import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { addCategory, addBrand,  fetchMetaData } from "../../redux/slices/metaSlice";
// import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

const AddNewItemModal = ({ type, closeModal }) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState(""); // Only one value now
  const [loading, setLoading] = useState(false);

  // Determine input name dynamically
  const inputName =
    type === "category" ? "category_name" :
      type === "brand" ? "brand_name" :
        type === "device" ? "device_name" :
          "";

  // Handle input change
  const handleChange = (e) => {
    setNewItem(e.target.value); // Only store the new item value
  };

  // Handle form submission
  // const handleAddItem = async () => {
  //   if (!newItem.trim()) {
  //     showErrorToast(`Please enter a valid ${type} name.`);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     console.log("Submitting data:", { [inputName]: newItem });

  //     let response;
  //     console.log(response)

  //     switch (type) {
  //       case "category":
  //         response = await dispatch(addCategory({ [inputName]: newItem })).unwrap();
  //         break;
  //       case "brand":
  //         response = await dispatch(addBrand({ [inputName]: newItem })).unwrap();
  //         break;
  //       case "device":
  //         response = await dispatch(addDevice({ [inputName]: newItem })).unwrap();
  //         break;
  //       default:
  //         throw new Error("Invalid type.");
  //     }

  //     showSuccessToast(`${type} added successfully!`);
  //     setNewItem(""); // Reset input field

  //     // ✅ **Re-fetch updated categories, brands, or devices**
  //     dispatch(fetchMetaData());

  //     closeModal(); // Close modal
  //   } catch (error) {
  //     showErrorToast(`Failed to add ${type}. Please try again.`);
  //     console.error(`Error adding ${type}:`, error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New {type}</h5>
            <button type="button" className="btn-close" onClick={closeModal} disabled={loading}></button>
          </div>
          <div className="modal-body">
            <input type="text" name={inputName} 
              className="form-control"
              placeholder={`Enter new ${type}`}
              value={newItem}
              onChange={handleChange}
              disabled={loading}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal} disabled={loading}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddItem} disabled={loading}>
              {loading ? "Adding..." : `Add ${type}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewItemModal;
