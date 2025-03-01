import React from "react";
import { Modal, Input, Button, Form } from "antd";

const AddRepairModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        form.resetFields();
        onClose(); // Close the modal
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Add Mobile Repair"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Repair Type"
          name="repairType"
          rules={[{ required: true, message: "Please enter the repair type!" }]}
        >
          <Input placeholder="e.g., Screen Replacement, Battery Repair" />
        </Form.Item>

        <Form.Item
          label="Repair Cost"
          name="repairCost"
          rules={[{ required: true, message: "Please enter the repair cost!" }]}
        >
          <Input placeholder="e.g., 999.00" type="number" addonBefore="" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRepairModal;
