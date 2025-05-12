import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Space,
  Typography,
  InputNumber,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import "./AddProduct.scss";
const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  // 文件上传
  const handleFileUpload = (file) => {
    const reader = new FileReader(); //使用FileReader将图片文件转为 Base64 格式
    reader.onload = () => {
      setImageUrl(reader.result); //保存 Base64 格式的图片，用于预览
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior 防止默认的上传行为（上传到服务器）
  };

  // 读取本地存储中的已有数据。
  // 将新商品数据合并后保存回localStorage。
  // 重置表单并清除图片预览状态。
  const handleSubmit = (values) => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = {
      ...values,
      id: `prod_${Date.now()}`, //生成唯一 ID（prod_${Date.now()}）
      image: imageUrl,
      dateAdded: Date.now(),
    };
    localStorage.setItem(
      "products",
      JSON.stringify([...storedProducts, newProduct])
    );
    message.success("Product added successfully!");
    form.resetFields(); //提示用户成功提交，并清空表单。
    setImageUrl("");
    console.log(newProduct);//对象
console.log(storedProducts);//数组
console.log();

  };


  return (
    <div style={{ padding: "10px" }} className="form">
      <Title level={2}>Add New Product</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          sizes: [],
          availableColors: [],
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the product title" },
          ]}
        >
          <Input placeholder="Enter product title" size="large" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please enter the product price" },
          ]}
        >
          <InputNumber
            placeholder="Enter product price"
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: "Please enter the SKU" }]}
        >
          <Input placeholder="Enter SKU" size="large" />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter the brand" }]}
        >
          {/* <Input placeholder="Enter brand name" /> */}
          <Select placeholder="Enter brand name" size="large">
            <Option value="converse">Converse</Option>
            <Option value="nike">Nike</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Classify"
          name="classify"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category" size="large">
            <Option value="kids">Kids</Option>
            <Option value="men">Men</Option>
            <Option value="women">Women</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Available Colors"
          name="availableColors"
          rules={[
            { required: true, message: "Please select at least one color" },
          ]}
        >
          <Select
            mode="multiple"
            size="large"
            placeholder="Select available colors"
            options={[
              { label: "Purple", value: "purple" },
              { label: "Black", value: "black" },
              { label: "White", value: "white" },
              { label: "Black", value: "black" },
              { label: "Grey", value: "grey" },
              { label: "Pink", value: "pink" },
              { label: "Green", value: "green" },
              { label: "Brown", value: "brown" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Sizes"
          name="sizes"
          rules={[
            { required: true, message: "Please select at least one size" },
          ]}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Select sizes"
            options={[
              { label: "S", value: "S" },
              { label: "M", value: "M" },
              { label: "L", value: "L" },
              { label: "XL", value: "XL" },
              { label: "X", value: "X" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item label="Content" name="content">
          <TextArea rows={4} placeholder="Enter additional product content" />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            beforeUpload={handleFileUpload} //自定义上传逻辑
            accept="image/*"
            showUploadList={false}
            listType="picture-card"
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
            {/* <Button icon={<UploadOutlined />}>Upload Image</Button> */}
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              style={{ marginTop: "10px", maxWidth: "200px" }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit">Add Product</Button>
            <Button
              onClick={() => {
                form.resetFields();
                setImageUrl("");
              }}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
