import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createCategory, fetchCategories, deleteCategory } from "../../../redux/slices/categorySlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleModalClose = () => {
    setShowModal(false);
    setCategoryName("");
    setImage(null);
  };

  const handleModalShow = () => setShowModal(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result); // Convert image to base64
      };
    }
  };
  
  // handleFormSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!categoryName || !image) return;

    const categoryData = {
      category_name: categoryName,
      p_image: image, // Sending base64 image
    };

    dispatch(createCategory(categoryData));
    handleModalClose();
  };

  //delete category
  const handleDeleteCategory = (id) => {
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
        dispatch(deleteCategory(id));
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="mx-md-5 mt-5 mx-3">
        <div className="shadow p-4">
          <div className="row d-flex justify-content-between">
            <div className="col-md-9">
              <h3 className="mb-md-4 mb-2 fw-semibold">Manage Categories</h3>
            </div>
            <div className="col-md-3 text-md-end">
              <button
                type="button"
                className="btn text-white rounded px-4 py-2 fw-semibold mt-4"
                style={{ backgroundColor: "#06223a" }}
                onClick={handleModalShow}
              >
                <i className="fa-solid fa-plus" /> Create Category
              </button>
            </div>
          </div>

          {/* Table to display categories */}
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <img
                        src={category.p_image}
                        alt={category.category_name}
                        style={{ width: "80px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteCategory(category._id)}>
                        <i className="fa-solid fa-trash" /> 
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal for Creating Category */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="mt-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
            </Form.Group>

            {/* Image Preview */}
            {image && (
              <div className="mt-3 text-center">
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                Create Category
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoryPage;
