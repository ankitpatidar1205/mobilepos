import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";
import { Card, Table, Badge, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/invoice/${id}`);
        console.log(response.data.data);
        setInvoice(response.data.data);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
        setInvoice(null);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleDownloadPDF = () => {
    const input = invoiceRef.current;
    document.body.classList.add("hide-print-elements");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
      document.body.classList.remove("hide-print-elements");
    });
  };

  return (
    <div className="container mt-5">
      <Card className="shadow p-4" ref={invoiceRef}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Invoice Details</h3>
          <Button variant="primary" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </div>

        {invoice ? (
          <>
            {/* Customer Details */}
            <Card className="p-3 mb-4">
              <h5 className="fw-semibold">Customer Details</h5>
              {invoice.customerId?.first_name ? (
                <>
                  <p><strong>Name:</strong> {invoice.customerId.first_name} {invoice.customerId.last_name || ""}</p>
                  <p><strong>Email:</strong> {invoice.customerId.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {invoice.customerId.phone || "N/A"}</p>
                  <p>
                    <strong>Address:</strong> 
                    {invoice.customerId?.address || "N/A"}, {invoice.customerId?.city || "N/A"}, 
                    {invoice.customerId?.state || "N/A"}, {invoice.customerId?.country || "N/A"} - 
                    {invoice.customerId?.post_code || "N/A"}
                  </p>
                </>
              ) : (
                <p>No customer details available.</p>
              )}
            </Card>

            {/* Service Details */}
            <Card className="p-3 mb-4">
              <h5 className="fw-semibold">Service Details</h5>
              {invoice.productId?.name ? (
                <>
                  <p><strong>Service Name:</strong> {invoice.productId.name}</p>
                  <p><strong>Category:</strong> {invoice.productId.category || "N/A"}</p>
                  <p><strong>SKU:</strong> {invoice.productId.sku || "N/A"}</p>
                  <p><strong>Serial Number:</strong> {invoice.productId.serialNumber || "N/A"}</p>
                </>
              ) : (
                <p>No service details available.</p>
              )}
            </Card>

            {/* Repair Parts */}
            <Card className="p-3 mb-4">
              <h5 className="fw-semibold">Repair Parts</h5>
              {invoice.repairTypes?.length > 0 ? (
                <Table striped bordered hover>
                  <thead className="table-dark">
                    <tr><th>Part Name</th><th>Part Price (A$)</th></tr>
                  </thead>
                  <tbody>
                    {invoice.repairTypes.map((repair, index) => (
                      <tr key={index}>
                        <td>{repair.partName || "N/A"}</td>
                        <td>A${repair.partPrice || "0.00"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No repair parts available.</p>
              )}
            </Card>

            {/* Accessories */}
            <Card className="p-3 mb-4">
              <h5 className="fw-semibold">Accessories</h5>
              {invoice.accessories?.length > 0 ? (
                <Table striped bordered hover>
                  <thead className="table-dark">
                    <tr><th>Accessory Name</th><th>Accessory Price (A$)</th></tr>
                  </thead>
                  <tbody>
                    {invoice.accessories.map((accessory, index) => (
                      <tr key={index}>
                        <td>{accessory.accessoriesName || "N/A"}</td>
                        <td>A${accessory.accessoriesPrice || "0.00"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No accessories available.</p>
              )}
            </Card>

            {/* Service Charges */}
            <Card className="p-3 mb-4">
              <h5 className="fw-semibold">Service Charges</h5>
              {invoice.serviceCharges?.length > 0 ? (
                <Table striped bordered hover>
                  <thead className="table-dark">
                    <tr><th>Service Name</th><th>Service Price (A$)</th></tr>
                  </thead>
                  <tbody>
                    {invoice.serviceCharges.map((service, index) => (
                      <tr key={index}>
                        <td>{service.servicename || "N/A"}</td>
                        <td>A${service.serviceprice || "0.00"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No service charges available.</p>
              )}
            </Card>
                  <p>
                    <strong> Invoice Status: </strong> 
                    {invoice.status === 1 ? <Badge bg="success">Paid</Badge> : <Badge bg="danger">Unpaid</Badge>}
                  </p>

            {/* Invoice Summary */}
            <Card className="p-3 mb-4">
              <h5 className="fw-semibold">Invoice Summary</h5>
              {invoice.price ? (
                <>
                  <p><strong>Total Amount:</strong> A${invoice.price}</p>
                 
                  <p><strong>Invoice Date:</strong> {new Date(invoice.createdAt).toLocaleString()}</p>
                </>
              ) : (
                <p>No invoice summary available.</p>
              )}
            </Card>
          </>
        ) : (
          <p className="text-center">No Invoice Data Found</p>
        )}
      </Card>
    </div>
  );
};

export default ViewInvoice;
