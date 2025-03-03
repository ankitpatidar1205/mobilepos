import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container,  } from "@mui/material";
import { InputGroup, Form } from "react-bootstrap";
import { Alert, Card, Button as AntButton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductForInvoice from "./ProductForInvoice";
import CustomerList from "./CustomerList";
import { fetchProducts } from "../../redux/slices/productSlice";

const PointOfSale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const { products, loading } = useSelector((state) => state.product);
  const productList = Array.isArray(products?.data) ? products.data : [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = selectedProducts.reduce(
    (total, item) => total + (item.price * item.quantity || 0),
    0
  );

  const invoiceData = {
    customer: selectedCustomer,
    products: selectedProducts,
    totalAmount,
    repairParts: selectedProducts.flatMap(product => product.repairTypes || []),
    services: selectedProducts.flatMap(product => product.serviceCharges || []),
    accessories: selectedProducts.flatMap(product => product.accessories || []),
  };


  const handleCreateInvoice = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before generating an invoice.");
      return;
    }

    sessionStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    navigate("/invoice");
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.sku === product.sku);
      if (exists) {
        return prev.filter((p) => p.sku !== product.sku);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRowSelection = (newSelection) => {
    const selectedProducts = productList.filter((product) =>
      newSelection.includes(product._id)
    );
    setSelectedRowIds(newSelection);
    setSelectedProducts(selectedProducts);
  };

  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.row.images?.[0] || "https://via.placeholder.com/80"}
          alt={params.row.name}
          style={{ width: 60, height: 30, objectFit: "cover", cursor: "pointer" }}
        />
      ),
    },
    { field: "sku", headerName: "SKU Id", width: 80 },
    { field: "name", headerName: "Service Name", width: 150 },
    { field: "category", headerName: "Category", width: 100 },
  ];

  return (
    <Container fluid className="mt-4 p-3 rounded-4" style={{backgroundColor:"white"}}>
      <div className="row">
        <div className="col-md-6 px-2">
          <CustomerList onSelectCustomer={setSelectedCustomer} />
          {selectedCustomer && (
            <Alert
              message={`Selected Customer: ${selectedCustomer.first_name} ${selectedCustomer.last_name}`}
              type="info"
              className="mt-2"
            />
          )}

          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search Services..."
              value={search}
              onChange={handleSearchChange}
            />
          </InputGroup>

         <div className="">
         <DataGrid
            rows={filteredProducts.map((product) => ({ ...product, id: product._id }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelection}
            rowSelectionModel={selectedRowIds}
          />
         </div>
        </div>

        <div className="col-md-6 gap-2">
          <ProductForInvoice invoiceData={invoiceData} />
        </div>
      </div>
    </Container>
  );
};

export default PointOfSale;
