import * as React from "react";
import  './App.css';


// 导入路由router
import router from './router';
import { useRoutes } from "react-router-dom";
// import 'antd/dist/reset.css';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
function App() {
  const routes = useRoutes(router);

  return (
    <div className="App">
      <ScrollToTop />
      {routes}
    </div>
  );
}

export default App;
