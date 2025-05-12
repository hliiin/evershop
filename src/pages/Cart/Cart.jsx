import React, { useState } from "react";
import "./Cart.scss";
import { InputNumber, Button, Input } from "antd";
import { Link } from "react-router-dom";
// 引入store中的数据
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeCart,
  changeAddQuantity,
  changeCutQuantity,
} from "../../store/modules/cartSlice";
import { useDispatch } from "react-redux";

export default function Cart() {
  const navigate = useNavigate()
  const addList = useSelector((state) => state.cart.items);
  console.log(addList, "添加购物车的数据");
  // 购买数量的增加和减少
  const dispatch = useDispatch();
  const handleAdd = (index) => {
    dispatch(changeAddQuantity(index));
  };
  const handleCut = (index) => {
    dispatch(changeCutQuantity(index));
  };

  // 移除商品
  const Remove = (index) => {
    dispatch(removeCart(index));
    // 先找到该商品在cart中的位置并删除
    console.log("点击了", index);
  };

  // 计算所有商品总价格
  const totalPrice = () => {
    return addList
      .reduce((total, item) => {
        return total + parseFloat(item.price.slice(1)) * item.quantity;
      }, 0)
      .toFixed(2);
  };
  let toHome = ()=>{
    navigate('/')
   }
  return (
    <div className="cartPage">
      {addList.length > 0 && (
        <div className="cart">
          <div className="cart-products">
            <table cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td>PRODUCT</td>
                  <td>PRICE</td>
                  <td>QUANTITY</td>
                  <td>TOTAL</td>
                </tr>
                {addList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="productSku">
                        <img src={item.largeUrl} alt="" width={100} />
                        <div className="sku">
                          <a href={`/${item.classify}/${item.id}`} className="title">
                            <strong>{item.title}</strong>
                          </a>
                          <p>Size:{item.size}</p>
                          <p>Color:{item.color}</p>
                          {/* 阻止a标签的跳转 href="javascript:void(0)" */}
                          <a href="javascript:void(0)" >
                            <p onClick={() => Remove(index)} style={{textDecoration:'underline',color:'#737373'}}>Remove</p>
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <div className="number">
                        <Button onClick={() => handleAdd(index)}>+</Button>
                        <InputNumber value={item.quantity} controls={false} />
                        <Button onClick={() => handleCut(index)}>-</Button>
                      </div>
                    </td>
                    {/* 价格$19.99截取$后面的数字，并转化为浮点数  最终总价格再保留两位小数 */}
                    <td>
                      {"$" +
                        (
                          parseFloat(item.price.slice(1)) * item.quantity
                        ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="apply">
              <div className="apply-code">
              <h3>Promotion code?</h3>
              <Input placeholder="Enter coupon code" />

              </div>
        <Button>Apply</Button>

            </div>
          </div>
          <div className="order">
            <p style={{ fontSize: 30 }}>Order summary</p>
            <div>
              <p>Sub total</p>
              <p>{"$" + totalPrice()}</p>
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>Total</p>
              <p>{"$" + totalPrice()}</p>
            </div>
            <Button>CHECKOUT</Button>
          </div>
        </div>
      )}

      {/* 当购物车为空的时候展示以下样式 */}
      {addList.length === 0 && 
      <div className="empty-cart">
        <h1>Shopping cart</h1>
        <p>Your cart is empty!</p>
        <Button onClick={toHome}>CONTINUE SHOPPING </Button>
      </div>}
    </div>
  );
}
