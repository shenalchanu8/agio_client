import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import '../ShirtInventory.css'; 

const { Option } = Select;

function SkirtInventory() {
  const [waistSize, setWaistSize] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleWaistSizeChange = value => {
    setWaistSize(value);
  };

  const handleQuantityChange = e => {
    setQuantity(e.target.value);
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch('/api/UniformSkirt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      console.log(data); // Log the response from the server
  
      // Show success message as a toast
      message.success('Inventory updated successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <div className="shirt-inventory-container">
      <div className="shirt-inventory-form-container">
        <div className="shirt-inventory-form-box p-3">
          <h3 className="shirt-inventory-title">Skirt Inventory Management</h3>
          <Form layout="horizontal" onFinish={onFinish}>
            <div className="shirt-inventory-form-row">
              <div className="shirt-inventory-item">
                <Form.Item label="Waist Size" name="waistSize">
                  <Select onChange={handleWaistSizeChange} placeholder="Select Waist Size">
                    <Option value="28">28</Option>
                    <Option value="30">30</Option>
                    <Option value="32">32</Option>
                    <Option value="34">34</Option>
                    <Option value="36">36</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Quantity" name="quantity">
                  <Input value={quantity} onChange={handleQuantityChange} placeholder="Enter Quantity" type="number" />
                </Form.Item>
              </div>
            </div>
            <div className="shirt-inventory-button-container">
              <Button className="shirt-inventory-submit-button" htmlType="submit">
                Update Inventory
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SkirtInventory;