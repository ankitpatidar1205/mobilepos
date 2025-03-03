import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, TextField } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { deleteCustomer, getCustomers } from "../../redux/slices/customerSlice";
import Swal from "sweetalert2";

const Customer = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  // Handle View Customer
  const handleViewCustomer = (id) => {
    console.log("View customer:", id);
    // Add navigation logic to view customer details page
  };
  const filteredCustomers = customers.filter((customer) =>
    `${customer.first_name} ${customer.last_name} ${customer.email} ${customer.city}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle Delete Customer

  const handleDeleteCustomer = (id) => {
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
        dispatch(deleteCustomer(id));
        Swal.fire("Deleted!", "The customer has been deleted.", "success");
      }
    });
  };

  const columns = [
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "post_code", headerName: "PostCode", width: 120 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleViewCustomer(params.row.id)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => handleDeleteCustomer(params.row._id)}>
            <Delete color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-md-5 m-3 my-5">
      <div
        className="card p-4"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 5px" }}
      >
        <div className="row d-flex justify-content-between align-items-center ">
          <div className="col-md-9 mb-2">
            <h3>Manage Customer</h3>
          </div>
          <div className="col-md-3 text-md-end mb-2">
            <Link to="/AddCustomer">
              <Button variant="contained" color="primary">
                + Create Customer
              </Button>
            </Link>
          </div>
        </div>

        <div className="custom-data-grid">
          <div className="my-2">
            <TextField
              label="Search by Name, Email, or City"
              variant="outlined"
              size="small"
              margin="dense"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DataGrid
            rows={filteredCustomers.map((customer) => ({
              ...customer,
              id: customer._id,
            }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            loading={loading}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: () => (
                <div style={{ marginBottom: "5px" }}>
                  {/* Add any additional toolbar elements here */}
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
