import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMetaData, addBrand, updateBrand, deleteBrand } from "../redux/metaSlice";

const BrandPage = () => {
  const dispatch = useDispatch();
  const { brands, categories, loading } = useSelector((state) => state.meta);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchMetaData());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingBrand(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingBrand(record);
    form.setFieldsValue({
      name: record.name,
      categoryId: record.categoryId, // assumes brand data includes a categoryId field
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteBrand(id))
      .then(() => message.success("Brand deleted"))
      .catch(() => message.error("Failed to delete brand"));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingBrand) {
        dispatch(updateBrand({ id: editingBrand.id, name: values.name, categoryId: values.categoryId }))
          .then(() => message.success("Brand updated"))
          .catch(() => message.error("Update failed"));
      } else {
        dispatch(addBrand(values))
          .then(() => message.success("Brand added"))
          .catch(() => message.error("Addition failed"));
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div>
      <h2>Brand Management</h2>
      <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
        Add Brand
      </Button>
      <Table dataSource={brands} rowKey="id" loading={loading} style={{ marginTop: 20 }}>
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column
          title="Category"
          dataIndex="categoryName"
          key="category"
          render={(_, record) => {
            const category = categories.find((cat) => cat.id === record.categoryId);
            return category ? category.name : "N/A";
          }}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
              <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
            </Space>
          )}
        />
      </Table>
      <Modal
        title={editingBrand ? "Edit Brand" : "Add Brand"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Brand Name"
            rules={[{ required: true, message: "Please input brand name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandPage;
