import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function Bread() {
  // 获取当前路径
  const location = useLocation();
  // 获取当前路径的各个部分 思路
  // 1.获取当前URL的路径部分 2.将路径按斜杠分割成数组  3.过滤掉空字符串
  const pathnames = location.pathname.split("/").filter((x) => x);
  // 生成面包屑项:
  // 1.首先添加一个指向首页的面包屑项。
  // 2.使用 map 遍历路径数组，生成每个面包屑项。
  // 3.判断是否为最后一个路径段，如果是则不添加链接，否则添加链接。
  // 4.每个面包屑项是一个对象，包含 title 属性，用于显示面包屑项的标题。
  const breadcrumbItems = [
    { title: <Link to="/">Home</Link> },
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      return {
        title: isLast ? (
          name.charAt(0).toUpperCase() + name.slice(1)
        ) : (
          <Link to={routeTo}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Link>
        ),
      };
    }),
  ];

  return (
    <div>
      <Breadcrumb 
      items={breadcrumbItems}
      // itemColor='red'
      // lastItemColor='rgba(0, 0, 0, 0.45)'
      />
    </div>
  );
}
