import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const Productlistsel = ({ products, onProductSelect }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let updatedList = products;
    console.log("products ----",products)

    // Filter by search query
    if (searchQuery) {
      updatedList = updatedList.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.includes(searchQuery)
      );
    }

    // Sort products by price
    updatedList = [...updatedList].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(updatedList);
  }, [searchQuery, sortOrder, products]);

  // Handle multi-select
  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.sku === product.sku);
      const updated = exists
        ? prev.filter((p) => p.sku !== product.sku)
        : [...prev, { ...product, quantity: 1 }];
      onProductSelect(updated);
      return updated;
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      render: (image) => {
        const image1  = image[0] || image; 
        return(
          <img src={image1} alt="Product" style={{ width: 50, height: 50 }} />
        )
      },
    },
    {
      title: "Product",
      dataIndex: "sku",
      render: (sku, record) => (
        <>
          <small>{sku}</small>
          <br />
          <small>{record.name}</small>
          <br />
          {/* <small>{record.description}</small> */}
        </>
      ),
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price}`,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <small>{quantity}</small>,
    },
  ];

  return (
    <div className="m-3 my-4">
      <h5 className="my-3">📦 Product List</h5>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Input
          placeholder="Search by Name / SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-50 w-md-75"
        />
        <Button
          type="primary" style={{ backgroundColor: "#1d1b31" }}
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          icon={sortOrder === "asc" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        >
          Sort by Price
        </Button>
      </div>

      <div className="table-responsive">
        <Table
          rowKey="sku"
          columns={columns}
          dataSource={currentProducts}
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleSelectProduct(record),
          })}
        />
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-2">
        <Button
          type="primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ⬅️ Prev
        </Button>
        <span>Page {currentPage}</span>
        <Button
          type="primary"
          disabled={indexOfLastItem >= filteredProducts.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next ➡️
        </Button>
      </div>
    </div>
  );
};

export default Productlistsel;
