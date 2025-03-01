import { useState, useEffect } from "react";
import AddCustomer from "../Customer/AddCustomer";

const CustomerList = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock API (Replace with actual API)
  useEffect(() => {
    const fetchCustomers = async () => {
      const data = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Alice Smith", email: "alice@example.com" },
        { id: 3, name: "Michael Brown", email: "michael@example.com" },
      ];
      setCustomers(data);
      setFilteredCustomers(data);
    };
    fetchCustomers();
  }, []);
  // Handle Adding a New Customer
  const handleAddCustomer = (newCustomer) => {
    setCustomers((prev) => [...prev, newCustomer]); 
    setIsModalOpen(false); 
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const results = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(results);
    }
  }, [searchTerm, customers]);

  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    setIsDropdownOpen(false);
  };

  return (
    <div className="customer-search-container position-relative mx-3 my-3">
      <div className="input-group mt-4">
        <span className="input-group-text">Customer</span>
        <input type="text"
          className="form-control"
          placeholder="Search customer"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
        />
        <span
          className="input-group-text btn bg-[#1d1b31] text-white"
          style={{ backgroundColor: "#1d1b31" , cursor: "pointer" }}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <i className="fa fa-plus"></i>
        </span>
      </div>

      {isDropdownOpen && (
        <ul
          className="list-group position-absolute bg-white border shadow-sm"
          style={{
            maxHeight: "200px",  overflowY: "auto", width: "100%",  zIndex: 1000, }}>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <li
                key={customer.id}
                className="list-group-item"
                onClick={() => handleSelectCustomer(customer)}
                style={{ cursor: "pointer" }}
              >
                {customer.name} ({customer.email})
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No customers found</li>
          )}
        </ul>
      )}
      {/* Customer Form Modal */}
      {isModalOpen && (
        <div className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg"
            style={{ maxWidth: "850px", marginLeft: "auto" }}
      >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <AddCustomer
                  onClose={() => setIsModalOpen(false)}
                  onAdd={handleAddCustomer}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
