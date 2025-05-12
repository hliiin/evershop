import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 添加进购物车
    addToCart: (state, action) => {
      // console.log(state.items.length);
      // console.log(action.payload);

      // 首先检查该商品是否在cart中 鞋子的ID 颜色 尺码 是否一致
      const item = state.items.find((item) => item.id === action.payload.id && item?.color === action.payload.color && item?.size === action.payload.size);
      // console.log(item);
      // 判断一致的话 直接数量增加
      if (item) {
        item.quantity += action.payload.quantity;
      }else {
        // 如果不在cart中，则添加该商品
        state.items.push({ ...action.payload });
      }
      // console.warn(item);
      // 打印出的是每一项数据对象 而不是proxy代理对象
      // console.log(JSON.parse(JSON.stringify(state.items)),'新增后到的数组');
    },
    // 移出购物车
    removeCart: (state, action) => {
      // 找到该商品在cart中的位置并删除
      // const index = state.items.findIndex(item => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size)
          // if (index > -1) {
      //   state.items.splice(index, 1)
      // }
      // state.items = state.items.filter((item) => item.id !== action.payload.id);

      console.log(action.payload,'移除项的索引');
      state.items.splice(action.payload, 1)
      console.log(JSON.parse(JSON.stringify(state.items)));
      
    },

    // 修改数量 增加
    changeAddQuantity: (state, action) => {
      state.items[action.payload].quantity += 1;
    },
    changeCutQuantity: (state, action) => {
      // 数量减少 并不能小于1
      if(state.items[action.payload].quantity === 1){
        return
      }
      state.items[action.payload].quantity -- ;
    },
    // 单个商品修改数量
    // item.quantity += action.paylolad(1/-1)

  },
});

export const { addToCart, removeCart,changeAddQuantity,changeCutQuantity } = cartSlice.actions;

export default cartSlice.reducer;
