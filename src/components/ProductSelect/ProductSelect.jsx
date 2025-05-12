import React, { useEffect, useState } from "react";
import "./ProductSelect.scss";
import { Slider, Checkbox, Select } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// 获取数据里的所有imageCollection
// const allImageCollection = []
// data.forEach(item => {
//   item.products.forEach(product => {
//     allImageCollection.push(product.imageCollection)
//   })
// })
// console.log(allImageCollection,111);

export default function ProductSelect(props) {
  // 接收获取到的接口数据  深拷贝
  let data = JSON.parse(JSON.stringify(props.data));
  // 定义下拉框的值
  const options = [
    { value: "Default", lable: "Default" },
    { value: "Name", lable: "Name" },
    { value: "Price", lable: "Price" },
  ];
  const [sortData, setSortData] = useState(data);
  const [sortProducts, setSortProducts] = useState(sortData.products);
  const [minPrice, setMinPrice] = useState(133);
  const [maxPrice, setMaxPrice] = useState(963);
  const [selectSize, setSelectSize] = useState([]);
  const [selectColor, setSelectColor] = useState([]);
  const [selectBrand, setSelectBrand] = useState();
  // 使用 useEffect 获取本地新增存储的数据
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // 合并本地存储的数据和静态数据（这里假设本地存储中的数据是新增的商品）
    setSortProducts((prevProducts) => [
      ...prevProducts,
      ...storedProducts, // 假设本地存储的数据是新增的商品
    ]);
    // console.log(storedProducts,'bendi');
  }, []);

  // 定义一个函数 对产品列表进行更新
  const handleSortChange = (value) => {
    if (value === "Default") {
      setSortData((sortData) => ({
        ...sortData,
        products: [...props.data.products],
      }));
    } else {
      if (value === "Name") {
        // 按商品 title字母排序
        sortProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (value === "Price") {
        // 按照价格排序
        sortProducts.sort(
          (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
        );
      }
      setSortData((sortData) => ({
        ...sortData,
        products: [...sortProducts],
      }));
    }
  };
  // ----------------------------------------------------------------

  // 价格过滤
  const filterPrice = (value) => {
    // console.warn(value);
    let [min, max] = value;
    return sortData.products.filter((item) => {
      // console.log(parseFloat(item.price.slice(1)),'222', min, max);
      return (
        parseFloat(item.price.slice(1)) >= min &&
        parseFloat(item.price.slice(1)) <= max
      );
    });
  };

  // 尺码过滤
  const filterSzie = (size) => {
    if (!size.length) {
      return sortData.products;
    }
    return sortData.products.filter((item) =>
      item.sizes.some((value) => {
        // console.log(value);
        return size.includes(value);
      })
    );
  };

  // 颜色过滤
  const filterColor = (color) => {
    if (!color.length) {
      return sortData.products;
    }
    return sortData.products.filter((item) =>
      item.availableColors.some((value) => {
        return color.includes(value);
      })
    );
  };
  // 属性过滤
  const filterBrand = (brand) => {
    // console.log(brand, "111");
    if (!brand.length) {
      return sortData.products;
    }
    // console.log(
    //   sortData.products.filter((item) => brand.includes(item.brand) )
    // );

    return sortData.products.filter((item) => brand.includes(item.brand));
  };

  // 获取price-select的值
  const onChangePrice = (value) => {
    setMinPrice(value[0]);
    setSortProducts(filterPrice(value));
  };
  const onChangeComplete = (value) => {
    setMaxPrice(value[1]);
    setSortProducts(filterPrice(value));
  };
  // console.log(minPrice, maxPrice, "价格区间");

  // 获取选中尺码的鞋
  const onChangeSize = (item) => {
    // console.log(item);
    const size = item;
    setSelectSize(size);
    console.log(filterSzie(size));
    setSortProducts(filterSzie(size));
  };
  // 筛选出选中颜色的鞋子
  const onChangeColor = (item) => {
    const color = item;
    setSelectColor(color);
    setSortProducts(filterColor(color));
  };
  // 获取属性的鞋子
  const onChangeBrand = (item) => {
    // console.log(item);
    const brand = item;
    setSelectBrand(brand);
    setSortProducts(filterBrand(brand));
  };

  return (
    <div className="select">
      <h1>{data.id}</h1>
      <div className="select-all">
        <div className="shopBy">
          <h4>SHOP BY</h4>
          <div className="price">
            <p>PRICE</p>
            <Slider
              range
              min={133.0}
              max={963.0}
              defaultValue={[133.0, 963.0]}
              onChange={onChangePrice}
              onChangeComplete={onChangeComplete}
            />
          </div>
          <div className="size">
            <p>SIZE</p>
            <Checkbox.Group
              options={data.availableSize}
              onChange={onChangeSize}
            />
          </div>
          <div className="color">
            <p>COLORS</p>
            <Checkbox.Group
              options={data.availableColors}
              onChange={onChangeColor}
            />
          </div>
          <div className="brand">
            <p>BRAND</p>
            <Checkbox.Group
              options={data.availableBrand}
              onChange={onChangeBrand}
            />
          </div>
        </div>
        <div className="sortBy">
          <div className="sort">
            Sort By:
            <Select
              defaultValue="Default"
              style={{
                width: 120,
              }}
              options={options}
              onSelect={handleSortChange}
            />
            <ArrowDownOutlined style={{ width: 14 }} />
          </div>
          <div className="shose">
            <ul>
              {sortProducts.map((item) => (
                <li key={item.id}>
                  <Link to={`/${item.classify}/${item.id}`}>
                    <img src={item.image} alt="" />
                    <h5>{item.title}</h5>
                    <h5>{item.price}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
