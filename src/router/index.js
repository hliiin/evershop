// 配置路由

// 引入页面模块
import Layout from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Women from "../pages/Women/Women";
import Men from "../pages/Men/Men";
import Kids from "../pages/Kid/Kids";
// 商品详情页面
import Detail from "../pages/Detail/Detail";
import Cart from "../pages/Cart/Cart";
// 新增商品页面
import AddProduct from "../pages/Add/AddProduct";

// 配置路由实例
const router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path:'kids',
        element: <Kids />
      },
      {
        path:'women',
        element: <Women />
      },
      {
        path:'men',
        element: <Men />
      },
      {
        path:'/:classify/:id',
        element: <Detail />
      },
      {
        path:'cart',
        element: <Cart />
      },
      {
        path: "login",
        element: <Login modes="login" />,
      },
      {
        path: "register",
        element: <Login modes="register" />,
      },
      {
        path: "reset-password",
        element: <Login modes="forgot"  />,
      },
    ]
  },
  {
    path:'/admin',
    element:<AddProduct/>
  }
  
];


export default router;