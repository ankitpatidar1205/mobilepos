import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {  TextField, Container } from "@mui/material";
import { InputGroup, Form } from "react-bootstrap";
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
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchCustomer, setSearchCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { products, loading } = useSelector((state) => state.product);
  const { customers } = useSelector((state) => state.customer);

  const productList = Array.isArray(products?.data) ? products.data : [];

  const handleSearchChange = (e) => setSearch(e.target.value);


  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: 120,
      renderCell: (params) => {
        const images = params.row.images || [];
        const image1 =
          images.length > 0 ? images[0] : "https://via.placeholder.com/80";

        return (
          <img  src={image1}  alt={params.row.name}  style={{    width: 60,    height: 30,  objectFit: "cover",  cursor: "pointer", }}/>
        );
      },
    },
    { field: "sku", headerName: "SKU Id", width: 80 },
    { field: "name", headerName: "Service Name", width: 150,  },
    { field: "category", headerName: "Category", width: 80 ,height: 100},
    // { field: "brand", headerName: "Brand", width: 130 },
    // { field: "IMEI", headerName: "IMEI No", width: 130 },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 200,
    //   renderCell: (params) => (
    //     <div style={{ display: "flex", gap: "10px" }}>
    //        <Link to={`/view-product/${params.row._id}`} title="View Product">
    //         <Button variant="contained" color="success">
    //             <FaEye />
    //           </Button>
    //      </Link>
    //       <Link to="#" title="delete product">
    //         <Button  variant="contained"  color="error"  onClick={() => handleDeleteProduct(params.row._id)}>
    //           <FaTrash className="text-white" />
    //         </Button>
    //       </Link>
    //       <Link to={`/update-product/${params.row._id}`}>
    //         <Button variant="contained" color="primary">
    //           <FaPen />
    //         </Button>
    //       </Link>
    //        {/* View Product */}
 
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle product selection
  const handleSelectProduct = (updatedProducts) => {
    setSelectedProducts(updatedProducts);
  };

  // search customers
  const handleSearchCustomer = (e) => {
    setSearchCustomer(e.target.value);    
  };  

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
            {/* <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search Taxes..."
            value={search}
            onChange={handleSearchChange}
          />
          <Button variant="outline-primary" onClick={() => setShowModal(true)}> 
            <i className="fa-solid fa-plus" />
          </Button>
        </InputGroup> */}

          {/* Product Selection */}
          {/* <Productlistsel
            products={productList}
            onProductSelect={handleSelectProduct}
          /> */}
            <DataGrid
                      rows={filteredProducts.map((product) => ({
                        ...product,
                        id: product._id,
                      }))}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      loading={loading}
                      checkboxSelection
                      disableSelectionOnClick
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
