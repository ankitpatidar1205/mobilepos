import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaxes, createTax, updateTax, deleteTax } from "../../redux/slices/taxSlice";
import Swal from "sweetalert2";

const TaxPage = () => {
  const dispatch = useDispatch();
  const { taxes, loading } = useSelector((state) => state.tax);
  const [taxId, setTaxId] = useState("");
  const [taxClass, setTaxClass] = useState("");
  const [taxValue, setTaxValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState("");


  useEffect(() => {
    dispatch(fetchTaxes());
  }, [dispatch]);

  const handleTaxFormSubmit = (e) => {
    e.preventDefault();
    if (!taxClass || !taxValue) return;

    const taxData = {
      taxClass: taxClass,
      taxValue: taxValue,
    };

    if (isEditMode) {
      dispatch(updateTax({ id: taxId, taxData }));
      dispatch(fetchTaxes());
    } else {
      dispatch(createTax(taxData));
      dispatch(fetchTaxes());
    }

    handleModalClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setTaxId("");
    setTaxClass("");
    setTaxValue("");
  };

  const handleModalShow = () => setShowModal(true);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleEditTax = (tax) => {
    setTaxId(tax._id);
    setTaxClass(tax.taxClass);
    setTaxValue(tax.taxValue);
    setIsEditMode(true);
    handleModalShow();
  };

  const handleDeleteTax = (id) => {
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
        dispatch(deleteTax(id));
        Swal.fire("Deleted!", "Tax has been deleted.", "success");
      }
    });
  };

  const filteredTaxes = taxes.filter((tax) =>
    tax.taxClass && tax.taxClass.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <div className="card p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-semibold">Manage Taxes</h3>
          <Button className="btn text-white rounded px-4 py-2 fw-semibold "
                style={{ backgroundColor: "#06223a" }} onClick={handleModalShow}>
            <i className="fa-solid fa-plus" /> Add New Tax
          </Button>
        </div>

        <Form.Control
          type="text"
          placeholder="Search Taxes..."
          value={search}
          onChange={handleSearchChange}
          className="mb-3"
        />

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tax Class</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">Loading...</td>
              </tr>
            ) : filteredTaxes.length > 0 ? (
              filteredTaxes.map((tax, index) => (
                <tr key={tax._id}>
                  <td>{index + 1}</td>
                  <td>{tax.taxClass}</td>
                  <td>{tax.taxValue}%</td>
                  <td>
                   
                    <Button variant="danger" size="sm" onClick={() => handleDeleteTax(tax._id)} className="ms-2">
                      <i className="fa-solid fa-trash" />
                    </Button>
                    <Button variant="warning" size="sm" onClick={() => handleEditTax(tax)}>
                      <i className="fa-solid fa-pen" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No taxes found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Tax" : "Create New Tax"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaxFormSubmit}>
            <Form.Group controlId="taxClass">
              <Form.Label>Tax Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Tax Class"
                value={taxClass}
                onChange={(e) => setTaxClass(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="taxValue" className="mt-3">
              <Form.Label>Tax Value (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Tax Value"
                value={taxValue}
                onChange={(e) => setTaxValue(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaxPage;