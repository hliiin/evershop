import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cartSlice"
// 数据持久化处理 引入redux-persist
import { persistStore, persistReducer } from "redux-persist";
// 引入存储 storage
import storage from "redux-persist/lib/storage";

// 持久化配置
const persistConfig = {
  key: "root", //可选，用于在localStorage中设置键名
  storage, //存储引擎 默认为localStorage
  // storage: window.localStorage,
  // 白名单，只有cart这个reducer会被持久化
  whitelist: ["cart"],
}

const reducer = combineReducers({
    cart:cartReducer,    
    // user:userReducer                                           
})

// 包装 reducer 为一个持久化 Reducer
const persistedReducer = persistReducer(persistConfig, reducer)

// 持久化store

const store = configureStore({
  reducer: persistedReducer,
  // 关闭序列化检查
  middleware:getDefaultMiddleware=>getDefaultMiddleware({
    serializableCheck:false
  }),
})
// 配置持久化存储
export const persistor = persistStore(store)

export default store;