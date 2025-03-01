import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMetaData, addModel, updateModel, deleteModel } from "../redux/metaSlice";

const ModelPage = () => {
  const dispatch = useDispatch();
  const { models, categories, brands, loading } = useSelector((state) => state.meta);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingModel, setEditingModel] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchMetaData());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingModel(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingModel(record);
    form.setFieldsValue({
      name: record.name,
      categoryId: record.categoryId,
      brandId: record.brandId,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteModel(id))
      .then(() => message.success("Model deleted"))
      .catch(() => message.error("Failed to delete model"));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingModel) {
        dispatch(updateModel({ id: editingModel.id, ...values }))
          .then(() => message.success("Model updated"))
          .catch(() => message.error("Update failed"));
      } else {
        dispatch(addModel(values))
          .then(() => message.success("Model added"))
          .catch(() => message.error("Addition failed"));
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // Optionally filter brands based on the selected category
  const selectedCategory = form.getFieldValue("categoryId");
  const filteredBrands = brands.filter((b) => b.categoryId === selectedCategory);

  return (
    <div>
      <h2>Model Management</h2>
      <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
        Add Model
      </Button>
      <Table dataSource={models} rowKey="id" loading={loading} style={{ marginTop: 20 }}>
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column
          title="Category"
          key="category"
          render={(_, record) => {
            const category = categories.find((cat) => cat.id === record.categoryId);
            return category ? category.name : "N/A";
          }}
        />
        <Table.Column
          title="Brand"
          key="brand"
          render={(_, record) => {
            const brand = brands.find((b) => b.id === record.brandId);
            return brand ? brand.name : "N/A";
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
        title={editingModel ? "Edit Model" : "Add Model"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Model Name"
            rules={[{ required: true, message: "Please input model name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category" onChange={() => form.setFieldsValue({ brandId: undefined })}>
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="brandId"
            label="Brand"
            rules={[{ required: true, message: "Please select a brand" }]}
          >
            <Select placeholder="Select a brand">
              {(selectedCategory ? filteredBrands : brands).map((b) => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModelPage;
