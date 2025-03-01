import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ManagementPage = ({ title }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const showModal = (record = null) => {
        setEditingItem(record);
        setIsModalVisible(true);
        form.setFieldsValue(record || { name: "" });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingItem(null);
    };

    const handleFormSubmit = (values) => {
        if (editingItem) {
            setData((prevData) => prevData.map((item) => (item.key === editingItem.key ? { ...item, ...values } : item)));
            message.success(`${title} updated successfully!`);
        } else {
            setData([...data, { key: data.length + 1, ...values }]);
            message.success(`${title} added successfully!`);
        }
        handleCancel();
    };

    const handleDelete = (key) => {
        setData(data.filter((item) => item.key !== key));
        message.success(`${title} deleted successfully!`);
    };

    const columns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="container-fluid px-4">
            <h2>{title} Management</h2>
            <div className="d-flex justify-content-end my-2 px-4">
                <Button type="primary" style={{ backgroundColor: "#1d1b31" }} icon={<PlusOutlined />} onClick={() => showModal()}>Add {title}</Button>
            </div>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} rowKey="key" style={{ marginTop: 20 }} />

            <Modal title={`Add/Edit ${title}`} visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>
            </Modal>
        </div>
    );
};

const BrandManagement = () => <ManagementPage title="Brand" />;
const ProductManagement = () => <ManagementPage title="Category" />;
const ModalManagement = () => <ManagementPage title="Modal" />;

export { BrandManagement, ProductManagement, ModalManagement };
