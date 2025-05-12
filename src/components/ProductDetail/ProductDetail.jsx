import React, { useState } from "react";
// 引入样式
import "./ProductDetail.scss";
// 引入钩子函数获取路径参数
import { useParams, Link } from "react-router-dom";
// 引入数据
import { kids } from "../../api/shoesCollection";
import { women } from "../../api/shoesCollection";
import { men } from "../../api/shoesCollection";
import { Button, Radio, Input, notification } from "antd";
// 使用store的方法
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/modules/cartSlice";

export default function ProductDetail() {
  // const list = useSelector((state)=>state.cart.items)
  // console.log(list);

  // 解构id
  const { id } = useParams();

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  let products = [
    ...kids.products,
    ...women.products,
    ...men.products,
    ...storedProducts,
  ];
  // 获取数据
  const product = products.find((item) => item.id === id);
  console.log(id);
  console.warn(product, "当前");

  // 存储选中的颜色
  const [color, setColor] = useState();
  // 存储大图
  const [largeUrl, setLargeUrl] = useState(product.image);
  // 存储选中的尺码
  const [size, setSize] = useState();
  // 存储数量
  const [quantity, setQuantity] = useState(1);
  // 判断是否选取正确规格的提示
  const [isShow, setShow] = useState(false);
  // 弹窗组件
  const [api, contextHolder] = notification.useNotification();
  // 点击获取到当前的颜色
  const handleColorChange = (color) => {
    setColor(color);
    // 颜色展示也要对应
    product.color = color;
    // 默认显示第一个大图
    if (
      product.imageCollection[color] &&
      product.imageCollection[color].length > 0
    ) {
      setLargeUrl(product.imageCollection[color][0].largeImage);
    }
  };
  // 点击获取到当前的尺码
  const handleSizeChange = (size) => {
    setSize(size);
  };
  // 数量框添加事件 数量变化时触发
  const handleQuantity = (e) => {
    setQuantity(e);
    // console.log(e,'这是数量变化');
  };
  // 根据当前选中的颜色 获取对应的小图的数组，如果里面有该颜色的图片 就返回这个颜色的图片数组 否则返回空的数组
  const getImageUrl = (color) => {
    if (product.imageCollection[color] && product.imageCollection) {
      return product.imageCollection[color];
    } else {
      return [];
    }
  };
  // 给每个小图添加点击事件
  const handlLargeClick = (largeUrl) => {
    setLargeUrl(largeUrl);
  };
  // 使用store中购物车切片的方法 将当前的数据添加到购物车store中
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // 验证所有必选项是否都填写了
    if (!color || !size || !quantity || !quantity > 0) {
      setShow(true);
      return;
    }
    setShow(false);
    const selectProduct = {
      ...product,
      color,
      size,
      largeUrl,
      quantity,
    };
    dispatch(addToCart(selectProduct));
    // console.log(selectProduct,'这是选择的商品');
    // 添加成功的提示框
    const view = (
      <Button color="primary" size="large">
        VIEW CART(3)
      </Button>
    );
    api.open({
      message: "JUST ADDED TO YOUR CART",
      description: "Sucessfully added",
      duration: 4,
      view,
    });
  };

  if (!product) {
    return (
      <div width="76%" style={{ margin: "0 12%" }}>
        未找到商品...
      </div>
    );
  }
  return (
    <div className="product-detail">
      <div className="product-imgs">
        <img className="big-img" src={largeUrl} alt="" />
        <div className="small-img">
          {getImageUrl(color).map((img) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt=""
              onClick={() => handlLargeClick(img.largeImage)}
            />
          ))}
        </div>
      </div>
      <div className="product-content">
        <h1>{product.title}</h1>
        <p className="sku">Sku:{product.sku}</p>
        <p className="price">{product.price}</p>
        <div className="brand-color">
          <strong>Brand:</strong>
          {product.brand}
        </div>
        <div className="brand-color">
          <strong>Color:</strong>
          {product.color}
        </div>
        <div className="sizeBtn">
          <Radio.Group buttonStyle="solid">
            {product.availableColors.map((color) => (
              <Radio.Button
                key={color}
                value={color}
                onClick={() => handleColorChange(color)}
              >
                {color}
              </Radio.Button>
            ))}
          </Radio.Group>
          <Radio.Group buttonStyle="solid">
            {product.sizes.map((size) => (
              <Radio.Button
                key={size}
                value={size}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        {isShow && (
          <p className="warn" style={{ color: "red" }}>
            Please select variant options
          </p>
        )}
        <Input
          placeholder="Outlined"
          value={quantity}
          onChange={(e) => handleQuantity(Number(e.target.value))}
        />
        <Button onClick={handleAddToCart}>ADD TO CART</Button>
        <p>{product.description}</p>
        <p>{product.content}</p>
      </div>
      {/* 弹窗组件 */}
      {contextHolder}
    </div>
  );
}
