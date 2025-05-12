import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation(); // 获取当前的路由信息

  useEffect(() => {
    window.scrollTo(0, 0); // 跳转时滚动到页面顶部
  }, [location]); // 每次路由变化时执行

  return null;
};

export default ScrollToTop;
