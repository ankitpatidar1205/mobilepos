import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createProduct, updateProduct } from '../../redux/slices/productSlice';
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
} from "../../../redux/slices/productSlice";
import AddNewItemModal from "../../FormModal/FormModal";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { fetchMetaData } from "../../../redux/slices/metaSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modalType, setModalType] = useState(null);
  // Get existing product if editing
  const { categories, brands } = useSelector((state) => state.meta); // ✅ Corrected

  console.log("-------------", categories, brands);
  const data = {
    categories: ["Laptop", "Mobile", "Tablet"],
    brands: ["Apple", "Samsung", "Dell"],
    modals:["A30", "A40", "S21"],
    devices: ["iPhone", "MacBook", "Galaxy"],
  };

  const { products, loading } = useSelector((state) => state.product);
  const productList = Array.isArray(products?.data) ? products.data : [];

  // const existingProduct = location.state?.product || products.find((p) => p._id === id);
  const existingProduct = id ? productList.find((p) => p._id === id) : null;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    brand: "",
    description: "",
    device: "",
    warrantyPeriod: "",
    sku: "",
    images: [],
  });
  useEffect(() => {
    dispatch(fetchMetaData());
  }, [dispatch]);
  // Load product data if updating
  useEffect(() => {
    if (existingProduct) {
      setFormData({ ...existingProduct, images: existingProduct.images || [] });
    }
  }, [existingProduct]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const imageUrls = files.map((file) => URL.createObjectURL(file));
  //   setFormData((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  // };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files })); // Store files directly
  };
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData };

    if (id) {
      try {
        const res = await dispatch(
          updateProduct({ id, productData: finalData })
        ).unwrap();
        console.log("response ", res);
        showSuccessToast(res.message || "Product updated successfully!");
        navigate("/products");
      } catch (error) {
        showErrorToast("Failed to update product. Please try again.");
        console.error("Failed to update product:", error);
      }
    } else {
      // If no id, create a new product
      try {
        const res = await dispatch(createProduct(finalData)).unwrap();
        showSuccessToast(res.message || "Product created successfully!");
        navigate("/products");
      } catch (error) {
        showErrorToast("Failed to create product. Please try again.");
        console.error("Failed to create product:", error);
      }
    }
  };
  if (loading) {
    return <div className="p-5 m-5 container-fluid"> ...loading</div>;
  }

  return (
    <div className="mx-5 mt-3">
      <div className="shadow p-4">
        <h3 className="mb-4 fw-semibold">
          {id ? "Edit Product" : "Add Product"}
        </h3>
        <form className="row g-3 mt-4 p-4 " onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Product Category</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Product Category</label>
            <div className="d-flex">
              <select
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {data.categories &&
                  data.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={() => setModalType("category")}
              >
                +
              </button>
            </div>
          </div>

          {/* Brand Dropdown */}
          <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Brand</label>
            <div className="d-flex">
              <select
                className="form-control"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              >
                <option value="">Select Brand</option>
                {brands &&
                  brands.map((brand) => (
                    <option key={brand._id} value={brand.brand_name}>
                      {brand.brand_name}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={() => setModalType("brand")}
              >
                +
              </button>
            </div>
          </div>

          {/* Device Dropdown */}
          <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Modal</label>
            <div className="d-flex">
              <select
                className="form-control"
                name="device"
                value={formData.device}
                onChange={handleChange}
              >
                <option value="">Select Device</option>
                {data.modals.map((device) => (
                  <option key={device} value={device}>
                    {device}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={() => setModalType("device")}
              >
                +
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Quantity */}
          {/* <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div> */}

          {/* Warranty Period */}
          {/* <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Warranty Period</label>
            <input
              type="text"
              className="form-control"
              name="warrantyPeriod"
              value={formData.warrantyPeriod}
              onChange={handleChange}
            />
          </div> */}

          {/* SKU */}
          {/* <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">SKU</label>
            <input
              type="text"
              className="form-control"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </div> */}

          {/* Description */}
          <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows={1}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="col-md-6 col-lg-4">
            <label className="form-label fw-semibold">Images</label>
            <input
              type="file"
              className="form-control"
              multiple
              onChange={handleImageChange}
            />
            <div className="mt-2 d-flex">
              {formData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`preview-${index}`}
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: 5,
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12 text-end">
            <button
              type="submit"
              className="btn text-white rounded px-4 py-2 fw-semibold mt-4"
              style={{ backgroundColor: "#06223a" }}
            >
              {id ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
      {/* Add New Item Modal */}
      {/* {modalType && (
        <AddNewItemModal
          type={modalType}
          closeModal={() => setModalType(null)}
        />
      )} */}
    </div>
  );
};

export default AddProduct;
