import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../redux/slices/productSlice";
import Swal from "sweetalert2";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

const Product = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productList = Array.isArray(products?.data) ? products.data : [];

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await dispatch(deleteProduct(productId)).unwrap(); // Unwrap to catch errors
          if (response) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            dispatch(fetchProducts());
          }
        } catch (error) {
          console.error("Delete Error:", error);
          Swal.fire("Error!", error || "Failed to delete product.", "error");
        }
      }
    });
  };
  
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        const images = params.row.images || [];
        const image1 =
          images.length > 0 ? images[0] : "https://via.placeholder.com/80";

        return (
          <img  src={image1}  alt={params.row.name}  style={{    width: 60,    height: 30,  objectFit: "cover",  cursor: "pointer", }}/>
        );
      },
    },
    { field: "sku", headerName: "SKU Id", width: 150 },
    { field: "name", headerName: "Service Name", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "IMEI", headerName: "IMEI No", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
           <Link to={`/view-product/${params.row._id}`} title="View Product">
            <Button variant="contained" color="success">
                <FaEye />
              </Button>
         </Link>
          <Link to="#" title="delete product">
            <Button  variant="contained"  color="error"  onClick={() => handleDeleteProduct(params.row._id)}>
              <FaTrash className="text-white" />
            </Button>
          </Link>
          <Link to={`/update-product/${params.row._id}`}>
            <Button variant="contained" color="primary">
              <FaPen />
            </Button>
          </Link>
           {/* View Product */}
 
        </div>
      ),
    },
  ];

  return (
    <div className=" mx-3 mx-md-5 my-5 card p-3">
      <div className="align-items-center mb-2">
        <div className="row d-flex justify-content-between mt-2 mb-2">
          <div className="col-md-9 mb-2">
            <h3>Service List</h3>
          </div>
          <div className="col-md-3 mb-2 text-md-end">
            <Link to={"/create-product"} title="Add new Product">
              <Button variant="contained" color="primary">
                + Create New Service
              </Button>
            </Link>
          </div>
        </div>

        <TextField
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px", width: "100%" }}
        />

        <div style={{ padding:"5px", width: "100%" }}>
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
      </div>
    </div>
  );
};

export default Product;
