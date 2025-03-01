import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMetaData, addCategory, updateCategory, deleteCategory } from "../../../redux/slices/metaSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.meta);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchMetaData());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue({
      name: record.name,
      image: record.image, 
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
      .then(() => message.success("Category deleted"))
      .catch(() => message.error("Failed to delete category"));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingCategory) {
        dispatch(updateCategory({ id: editingCategory.id, name: values.name }))
          .then(() => message.success("Category updated"))
          .catch(() => message.error("Update failed"));
      } else {
        dispatch(addCategory(values))
          .then(() => message.success("Category added"))
          .catch(() => message.error("Addition failed"));
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "20px", color: "#fff" }}>
      <h4 style={{ textAlign: "center", marginBottom: "20px", color:'#000' }}>Category Management</h4>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
          Add Category
        </Button>
      </div>
      <Table
        dataSource={categories}
        rowKey="id"
        loading={loading}
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
      >
        <Table.Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text) => <img src={text} alt="category" width={50} />}
        />
        <Table.Column title="Name" dataIndex="name" key="name" />
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
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please input category name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Category Image URL"
            rules={[{ required: true, message: "Please input image URL" }]}
          >
            <Input addonBefore={<UploadOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;