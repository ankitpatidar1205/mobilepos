import {useState } from "react";
import { useDispatch,  } from "react-redux";
import Swal from "sweetalert2";
import { registerCustomer,
} from "../../redux/slices/customerSlice";


const AddCustomer = () => {
  const dispatch = useDispatch();


  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    post_code: "",
    city: "",
    state: "",
    country: "Australia",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("customer", customerData);
    dispatch(registerCustomer(customerData));
    Swal.fire({
      title: "Success!",
      text: "Customer added successfully!",
      icon: "success",
      confirmButtonText: "OK",
  })
  };


  return (
    <div className="container my-5">
      <div className="card p-4 form-container">
        <h3 className="mb-4">Add Customer</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* First Name */}
            <div className="col-md-6">
              <label htmlFor="first_name" className="form-label required">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                placeholder="John"
                value={customerData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                placeholder="Doe"
                value={customerData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            {/* Email */}
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="test@example.com"
                value={customerData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label required">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="658 799 8941"
                value={customerData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            {/* Address */}
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="123 Main St"
                value={customerData.address}
                onChange={handleChange}
              />
            </div>

            {/* Postcode */}
            <div className="col-md-6">
              <label htmlFor="postcode" className="form-label">
                Postcode
              </label>
              <input
                type="text"
                className="form-control"
                id="postcode"
                name="post_code"
                placeholder="12345"
                value={customerData.post_code}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            {/* City */}
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={customerData.city}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div className="col-md-6">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                placeholder="State"
                value={customerData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            {/* Country */}
           
            <div className="col-md-6">
              <label htmlFor="state" className="form-label">
              Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                placeholder="State"
                value={customerData.country}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label required">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="******"
                value={customerData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}

          {/* Submit Button */}
          <div className="mt-4 text-end">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#06223a", color: "white" }}
             
            >
              { "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
