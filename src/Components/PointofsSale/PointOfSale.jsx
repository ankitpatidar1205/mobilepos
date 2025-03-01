import { useEffect, useState } from "react";
import ProductForInvoice from "./ProductForInvoice";
import { fetchProducts } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomerList from "./CustomerList";
import Productlistsel from "./ProductList";
import { Button, Card, Alert } from "antd";

const PointOfSale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { products } = useSelector((state) => state.product);
  const productList = Array.isArray(products?.data) ? products.data : [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle product selection
  const handleSelectProduct = (updatedProducts) => {
    setSelectedProducts(updatedProducts);
  };

  // Calculate total price
  const totalAmount = selectedProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle Invoice Creation
  const handleCreateInvoice = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before generating an invoice.");
      return;
    }

    const invoiceData = {
      customer: selectedCustomer,
      products: selectedProducts,
      totalAmount,
    };

    sessionStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    navigate("/invoice");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6 px-2">
          {/* Customer Selection */}
          <CustomerList onSelectCustomer={setSelectedCustomer} />
          {selectedCustomer && (
            <Alert
              message={`Selected Customer: ${selectedCustomer.name}`}
              type="info"
              className="mt-2"
            />
          )}

          {/* Product Selection */}
          <Productlistsel
            products={productList}
            onProductSelect={handleSelectProduct}
          />
        </div>

        {/* Right Section */}
        <div className="col-md-6 gap-2">
          <ProductForInvoice />
          {/* Invoice Summary */}
          <Card className="shadow-sm bg-light rounded mt-3 p-3 mx-2">
            <h5 className="text-center fw-bold text-[#1d1b31]">
              Invoice Summary
            </h5>

            <div className="d-flex justify-content-between border-bottom pb-2">
              <span className="text-muted">Total Items</span>
              <span className="fw-bold">{selectedProducts.length}</span>
            </div>

            <div className="d-flex justify-content-between border-bottom py-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold text-dark">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span className="fw-bold text-uppercase fs-5">Total</span>
              <span className="fw-bold text-success fs-5">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-3 d-flex gap-2 flex-column flex-sm-row-reverse">
              <Button
                type="primary"
                onClick={handleCreateInvoice}
                disabled={selectedProducts.length === 0}
              >
                Generate Invoice 🧾
              </Button>
              <Button
                danger
                onClick={() => setSelectedProducts([])}
                disabled={selectedProducts.length === 0}
              >
                Clear Selection ❌
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
