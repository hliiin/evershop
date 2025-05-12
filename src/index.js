import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

// 导入路由相关的
import { BrowserRouter } from "react-router-dom";

// 入口文件中 引入store
import { Provider } from "react-redux";
import store, { persistor} from "./store";
 
// 引入持久化的函数和组件 PersistGate组件会阻塞你的应用的渲染 直到持久化的状态被加载完成
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
