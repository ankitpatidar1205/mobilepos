import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/config";
import axiosInstance from "../../utils/axiosInstance";

const ManageTickets = () => {
  const [invoices, setInvoices] = useState([]);

  // ✅ Fetch Only Paid Invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/invoice`);
        console.log("Fetched Invoices:", response.data.data);

        // Filter only paid invoices (status === 1)
        const paidInvoices = response.data.data.filter(invoice => invoice.status === 1);
        setInvoices(paidInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

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
        <h3 className="mb-4 fw-semibold"> Paid Invoices</h3>
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
                <td colSpan="9" className="text-center">No paid invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
