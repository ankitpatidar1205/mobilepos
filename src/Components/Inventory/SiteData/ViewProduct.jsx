import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../../../redux/slices/productSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../../../LayOut/Loader";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 

  const { products, loading } = useSelector((state) => state.product || {});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = products?.data?.find((item) => item._id === id);
  console.log(product);

  if (loading) return <Loader />;
  if (!products || !products.data?.length) return <p className="text-danger text-center">No products available</p>;
  if (!product) return <p className="text-warning text-center">Product not found</p>;

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Service Detail</h4>
        <Link to="/products">
          <button className="btn btn-primary">⬅ Back</button>
        </Link>
      </div>

      <div className="card shadow-lg">
        <div className="card-body">
          {/* Product Title */}
          <h2 className="card-title text-center">{product.name || "N/A"}</h2>

          {/* Product Image & Details */}
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              {product.images?.length > 0 ? (
                <img src={product.images[0]} alt={product.name} className="img-fluid rounded shadow" style={{ maxHeight: "200px" }} />
              ) : (
                <p className="text-muted">No Image Available</p>
              )}
            </div>
            <div className="col-md-8">
              <table className="table table-bordered">
                <tbody>
                  <tr><th>Brand</th><td>{product.brand || "N/A"}</td></tr>
                  <tr><th>Category</th><td>{product.category || "N/A"}</td></tr>
                  <tr><th>SKU</th><td>{product.sku || "N/A"}</td></tr>
                  <tr><th>Status</th><td>{product.status || "N/A"}</td></tr>
                  <tr><th>Warranty</th><td>{product.warranty ? `${product.warranty} (${product.warrantyPeriod || 0} months)` : "N/A"}</td></tr>
                  <tr><th>Description</th><td>{product.description || "N/A"}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Accessories Section */}
          {product.accessories?.length > 0 ? (
            <div className="mt-4">
              <h4 className="text-dark">Accessories</h4>
              <ul className="list-group">
                {product.accessories.map((acc) => (
                  <li className="list-group-item" key={acc._id}>
                    {acc.accessoriesName || "N/A"} - <strong>A${acc.accessoriesPrice || "0"}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-muted">No Accessories Available</p>
          )}

          {/* Repair Types Section */}
          {product.repairTypes?.length > 0 ? (
            <div className="mt-4">
              <h4 className="text-dark">Repair Types</h4>
              <ul className="list-group">
                {product.repairTypes.map((repair) => (
                  <li className="list-group-item" key={repair._id}>
                    {repair.partName || "N/A"} - <strong>A${repair.partPrice || "0"}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-muted">No Repair Types Available</p>
          )}

          {/* Service Charges Section */}
          {product.serviceCharges?.length > 0 ? (
            <div className="mt-4">
              <h4 className="text-dark">Service Charges</h4>
              <ul className="list-group">
                {product.serviceCharges.map((charge) => (
                  <li className="list-group-item" key={charge._id}>
                    {charge.servicename || "N/A"} - <strong>A${charge.serviceprice || "0"}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-muted">No Service Charges Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
