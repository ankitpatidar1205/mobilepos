import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { createBrand, fetchBrands, deleteBrand } from "../../../redux/slices/brandSlice";

const BrandPage = () => {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const [showModal, setShowModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories()); 
  }, [dispatch]);

  const handleModalClose = () => {
    setShowModal(false);
    setBrandName("");
    setCategoryId("");
  };

  const handleModalShow = () => setShowModal(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!brandName || !categoryId) return;

    const brandData = {
      brand_name: brandName,
      categoryId : categoryId,
    };

    dispatch(createBrand(brandData));
    dispatch(fetchBrands());
    handleModalClose();
  };

  const handleDeleteBrand = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBrand(id));
        Swal.fire("Deleted!", "Brand has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="mx-md-5 mt-5 mx-3">
        <div className="shadow p-4">
          <div className="row d-flex justify-content-between">
            <div className="col-md-9">
              <h3 className="mb-md-4 mb-2 fw-semibold">Manage Brands</h3>
            </div>
            <div className="col-md-3 text-md-end">
              <button type="button" className="btn text-white rounded px-4 py-2 fw-semibold mt-4"
                style={{ backgroundColor: "#06223a" }} onClick={handleModalShow} >
                <i className="fa-solid fa-plus" /> Create Brand
              </button>
            </div>
          </div>

          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Brand Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">Loading...</td>
                </tr>
              ) : brands.length > 0 ? (
                brands.map((brand, index) => (
                  <tr key={brand._id}>
                    <td>{index + 1}</td>
                    <td>{brand.brand_name}</td>
                    <td>{brand.category?.category_name}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteBrand(brand._id)}>
                        <i className="fa-solid fa-trash" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No brands found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="brandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control  type="text" placeholder="Enter Brand Name" value={brandName}
                onChange={(e) => setBrandName(e.target.value)} required/>
            </Form.Group>

            <Form.Group controlId="categorySelect" className="mt-3">
              <Form.Label>Select Category</Form.Label>
              <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BrandPage;
