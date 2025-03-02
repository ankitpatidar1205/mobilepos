import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, updateProduct } from "../../../redux/slices/productSlice";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { fetchBrands } from "../../../redux/slices/brandSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { fetchTaxes } from "../../../redux/slices/taxSlice";

const AddProduct = () => {
  const [activeTab, setActiveTab] = useState("deviceInfo");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);
  const { taxes } = useSelector((state) => state.tax);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
      dispatch(fetchTaxes());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    brand: "",
    description: "",
    IMEI: "",
    warranty: "No Warranty",
    warrantyPeriod: "",
    status: "Pending",
    sku: "",
    taxid:"",
    images: [],
    serviceCharges: [{ servicename: "", serviceprice: "" }], 
    repairTypes: [{ partName: "", partPrice: "" }],
    accessories: [{ accessoriesName: "", accessoriesPrice: "" }],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  /** SERVICE CHARGE FUNCTIONS */
  const handleServiceChargeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServiceCharges = [...formData.serviceCharges];
    updatedServiceCharges[index] = { ...updatedServiceCharges[index], [name]: value };
    setFormData({ ...formData, serviceCharges: updatedServiceCharges });
  };

  const addServiceCharge = () => {
    setFormData({ 
      ...formData, 
      serviceCharges: [...formData.serviceCharges, { servicename: "", serviceprice: "" }]
    });
  };

  const removeServiceCharge = (index) => {
    const updatedServiceCharges = formData.serviceCharges.filter((_, i) => i !== index);
    setFormData({ ...formData, serviceCharges: updatedServiceCharges });
  };

  /** REPAIR TYPE FUNCTIONS */
  const handleRepairTypeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRepairTypes = [...formData.repairTypes];
    updatedRepairTypes[index] = { ...updatedRepairTypes[index], [name]: value };
    setFormData({ ...formData, repairTypes: updatedRepairTypes });
  };

  const handleAddRepairType = () => {
    setFormData((prev) => ({
      ...prev,
      repairTypes: [...prev.repairTypes, { partName: "", partPrice: "" }],
    }));
  };

  const removeRepairType = (index) => {
    const updatedRepairTypes = formData.repairTypes.filter((_, i) => i !== index);
    setFormData({ ...formData, repairTypes: updatedRepairTypes });
  };

  /** ACCESSORIES FUNCTIONS */
  const handleAccessoriesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAccessories = [...formData.accessories];
    updatedAccessories[index] = { ...updatedAccessories[index], [name]: value };
    setFormData({ ...formData, accessories: updatedAccessories });
  };

  const addAccessory = () => {
    setFormData({ 
      ...formData, 
      accessories: [...formData.accessories, { accessoriesName: "", accessoriesPrice: "" }]
    });
  };

  const removeAccessory = (index) => {
    const updatedAccessories = formData.accessories.filter((_, i) => i !== index);
    setFormData({ ...formData, accessories: updatedAccessories });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { 
      ...formData,
      serviceCharges: JSON.stringify(formData.serviceCharges),
      repairTypes: JSON.stringify(formData.repairTypes),
      accessories: JSON.stringify(formData.accessories),
    };
  
    try {
      if (id) {
        const res = await dispatch(updateProduct({ id, productData: finalData })).unwrap();
        showSuccessToast(res.message || "Product updated successfully!");
      } else {
        const res = await dispatch(createProduct(finalData)).unwrap();
        showSuccessToast(res.message || "Product created successfully!");
      }
      navigate("/products");
    } catch (error) {
      showErrorToast("Failed to process the request. Please try again.");
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="mx-5 mt-3">
      <div className="shadow p-4">
        <h3 className="mb-2 fw-semibold">{id ? "Edit Product" : "Add Service"}</h3>
         {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "deviceInfo" ? "active" : ""}`} onClick={() => setActiveTab("deviceInfo")}>
            Device Information
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "serviceCharge" ? "active" : ""}`} onClick={() => setActiveTab("serviceCharge")}>
            Service Charge
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "repairType" ? "active" : ""}`} onClick={() => setActiveTab("repairType")}>
            Repair Type
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "accessories" ? "active" : ""}`} onClick={() => setActiveTab("accessories")}>
            Accessories
          </button>
        </li>
      </ul>
        <form className="row g-3 mt-4 p-4" onSubmit={handleSubmit}>
      
      
     {/* Device Information Section */}
     {activeTab === "deviceInfo" && (
          <>
           <h5>Device Information</h5>
          {/* Name */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">Service Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          {/* Category Dropdown */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">Service Category</label>
            <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories && categories.map((cat) => (
                <option key={cat._id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Dropdown */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">Brand / Manufacturer</label>
            <select className="form-control" name="brand" value={formData.brand} onChange={handleChange}>
              <option value="">Select Brand</option>
              {brands && brands.map((brand) => (
                <option key={brand._id} value={brand.brand_name}>  {brand.brand_name} </option>
              ))}
            </select>
          </div>
            {/* Tax Dropdown */}
            <div className="col-md-6 col-lg-6">
  <label className="form-label fw-semibold"> Tax</label>
  <select 
    className="form-control" 
    name="taxid" 
    value={formData.taxid} 
    onChange={handleChange}
  >
    <option value="">Select Tax</option>
    {taxes && taxes.map((tax) => (
      <option key={tax._id} value={tax._id}> 
        {tax.taxClass} 
      </option>
    ))}
  </select>
</div>

          {/* Warranty Dropdown */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">Warranty</label>
            <select className="form-control" name="warranty" value={formData.warranty} onChange={handleChange}>
              <option value="No Warranty">No Warranty</option>
              <option value="Warranty">Warranty</option>
            </select>
          </div>

          {/* Warranty Period (Conditional) */}
          {formData.warranty === "Warranty" && (
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Warranty Period</label>
              <input type="text" className="form-control" name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} required />
            </div>
          )}

          {/* SKU */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">SKU</label>
            <input type="text" className="form-control" name="sku" value={formData.sku} onChange={handleChange} />
          </div>
        {/* SKU */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">IMEI No.</label>
            <input type="text" className="form-control" name="IMEI" value={formData.IMEI} onChange={handleChange} />
          </div>
          {/* Status Dropdown */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">Status</label>
            <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Repaired">Repaired</option>
              <option value="Not Repaired">Not Repaired</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-md-6 col-lg-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea className="form-control" rows={4} name="description" value={formData.description} onChange={handleChange} />
          </div>

          {/* Image Upload */}
          <div className="col-md-6 col-lg-6">
            <label className="form-label fw-semibold">Images</label>
            <input type="file" className="form-control" multiple onChange={handleImageChange} />
          </div>
          <div className="text-end">
          <button type="button" className="btn btn-primary" onClick={() => setActiveTab("serviceCharge")}>Next</button>
          </div>
          </>
        )}


    {/* Service Charge Section */}
   {activeTab === "serviceCharge" && (
          <>
            <h5>Service Charge</h5>
            {formData.serviceCharges.map((service, index) => (
              <div key={index} className="row">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Service Name</label>
                  <input type="text" className="form-control" name="servicename" value={service.servicename} onChange={(e) => handleServiceChargeChange(index, e)} required />
                </div>
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Service Price</label>
                  <input type="number" className="form-control" name="serviceprice" value={service.serviceprice} onChange={(e) => handleServiceChargeChange(index, e)} required />
                </div>
                <div className="col-md-1 d-flex align-items-end">
                  <button type="button" className="btn btn-danger" onClick={() => removeServiceCharge(index)}>X</button>
                </div>
              </div>
            ))}
            <button type="button" className="btn set_btn mt-3" onClick={addServiceCharge}>Add More Service Charge</button>
            <div className="col-12 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => setActiveTab("deviceInfo")}>Back</button>
              <button type="button" className="btn btn-primary" onClick={() => setActiveTab("repairType")}>Next</button>
            </div>
          </>
        )}
      {/* Repair Type Section */}
      {activeTab === "repairType" && (
          <>
            <h5>Repair Type</h5>
            {formData.repairTypes.map((repair, index) => (
              <div key={index} className="row">
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Parts Name</label>
                  <input type="text" className="form-control" name="partName" value={repair.partName} onChange={(e) => handleRepairTypeChange(index, e)} required />
                </div>
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Parts Price</label>
                  <input type="number" className="form-control" name="partPrice" value={repair.partPrice} onChange={(e) => handleRepairTypeChange(index, e)} required />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="button" className="btn btn-danger" onClick={() => removeRepairType(index)}>X</button>
                </div>
              </div>
            ))}
            <button type="button" className="btn set_btn mt-3" onClick={handleAddRepairType}>Add More Repair Type</button>
            <div className="col-12 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => setActiveTab("serviceCharge")}>Back</button>
              <button type="button" className="btn btn-primary" onClick={() => setActiveTab("accessories")}>Next</button>
            </div>
          </>
        )}

      {/* Accessories Section */}
    {/* Accessories Section */}
    {activeTab === "accessories" && (
          <>
            <h5>Accessories</h5>
            {formData.accessories.map((accessory, index) => (
              <div key={index} className="row">
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Accessories Name</label>
                  <input type="text" className="form-control" name="accessoriesName" value={accessory.accessoriesName} onChange={(e) => handleAccessoriesChange(index, e)} required />
                </div>
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Accessories Price</label>
                  <input type="number" className="form-control" name="accessoriesPrice" value={accessory.accessoriesPrice} onChange={(e) => handleAccessoriesChange(index, e)} required />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="button" className="btn btn-danger" onClick={() => removeAccessory(index)}>X</button>
                </div>
              </div>
            ))}
            <button type="button" className="btn set_btn mt-3" onClick={addAccessory}>Add Accessory</button>
            <div className="col-12 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => setActiveTab("repairType")}>Back</button>
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </>
        )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
