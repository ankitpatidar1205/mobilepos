import React, { useState, useEffect } from "react";
import { Button, Dropdown, Badge } from "react-bootstrap";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";
import { Link } from "react-router-dom";

const ManageInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  // ✅ Fetch Invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/invoice`);
        console.log("Fetched Invoices:", response.data.data);
        setInvoices(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  // ✅ Handle Status Change (Toggles between 0 & 1)
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle status

    try {
      await axiosInstance.patch(`${apiUrl}/invoice`, { 
        invoiceId: id, 
        status: newStatus 
      });

      // Fetch updated invoices after status change
      const response = await axiosInstance.get(`${apiUrl}/invoice`);
      setInvoices(response.data.data);
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };

  // ✅ Handle Delete Invoice
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await axiosInstance.delete(`${apiUrl}/invoice/${id}`);
        setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice._id !== id));
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  return (
    <div className="mx-md-5 mt-5 m-3">
      <div className="shadow p-2">
        <h3 className="mb-4 fw-semibold">Manage Invoices</h3>
      </div>

      <div className="table-responsive mt-2 shadow p-3">
        <table className="table align-middle table-bordered table-striped">
          <thead className="table-dark" style={{ whiteSpace: "nowrap" }}>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ whiteSpace: "nowrap" }}>
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr key={invoice._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(invoice.createdAt).toLocaleString()}</td>
                  <td>{invoice.customerId?.first_name} {invoice.customerId?.last_name}</td>
                  <td>{invoice.customerId?.email}</td>
                  <td>{invoice.customerId?.state}</td>
                  <td>{invoice.customerId?.city}</td>
                  <td>{invoice.customerId?.country}</td>
                  <td>{invoice.price ? `A$${invoice.price}` : "N/A"}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant={invoice.status === 1 ? "success" : "danger"} size="sm">
                        {invoice.status === 1 ? "Paid" : "Unpaid"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleStatusChange(invoice._id, invoice.status)}>
                          Mark as {invoice.status === 1 ? "Unpaid" : "Paid"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Link to={`/ViewInvoice/${invoice._id}`}>
                      <Button variant="primary" size="sm" className="me-2">
                        <i className="fa-solid fa-eye"></i>
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(invoice._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">No invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageInvoices;
