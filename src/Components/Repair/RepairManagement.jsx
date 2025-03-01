import React, { useState } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Space,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const RepairManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [repairs, setRepairs] = useState([]);

    const brands = {
        Mobile: ["Samsung", "Vivo", "iPhone"],
        Laptop: ["Dell", "HP", "Lenovo"],
        Tablet: ["iPad", "Samsung Tab", "Amazon Fire"]
    };

    const models = {
        Samsung: ["A30", "A40", "S21"],
        Vivo: ["V20", "Y12", "X50"],
        iPhone: ["iPhone 12", "iPhone 13", "iPhone 14"],
    };

    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedModel, setSelectedModel] = useState([]);

    const handleDeviceChange = (value) => {
        setSelectedBrand(brands[value] || []);
        form.setFieldsValue({ brand: undefined, model: undefined });
    };

    const handleBrandChange = (value) => {
        setSelectedModel(models[value] || []);
        form.setFieldsValue({ model: undefined });
    };

    const handleAddRepair = (values) => {
        setRepairs([...repairs, { ...values, id: repairs.length + 1 }]);
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name (Issue)", dataIndex: "name", key: "name" },
        { title: "Device Type", dataIndex: "deviceType", key: "deviceType" },
        { title: "Brand", dataIndex: "brand", key: "brand" },
        { title: "Model", dataIndex: "model", key: "model" },
        { title: "Issue", dataIndex: "issue", key: "issue" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} />
                    <Button icon={<DeleteOutlined />} danger />
                </Space>
            ),
        },
    ];

    return (
        <div className="py-2 ">
            <div className="d-flex justify-content-end my-2 px-4">
                <Button type="primary" style={{ backgroundColor: "#1d1b31" }} icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    Add Repair
                </Button>
            </div>
            <Table columns={columns} dataSource={repairs} pagination={{ pageSize: 5 }} rowKey="id" />

            <Modal
                title="Add Repair"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddRepair} layout="vertical">
                    <Form.Item name="name" label="Name (Issue)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="deviceType" label="Device Type (Category)" rules={[{ required: true }]}>
                        <Select onChange={handleDeviceChange}>
                            <Option value="Mobile">Mobile</Option>
                            <Option value="Laptop">Laptop</Option>
                            <Option value="Tablet">Tablet</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
                        <Select onChange={handleBrandChange}>
                            {selectedBrand.map((brand) => (
                                <Option key={brand} value={brand}>{brand}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="model" label="Model" rules={[{ required: true }]}>
                        <Select>
                            {selectedModel.map((model) => (
                                <Option key={model} value={model}>{model}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="issue" label="Issue" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default RepairManagement;
