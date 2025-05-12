import React, { useState } from 'react'
import ProductSelect from '../../components/ProductSelect/ProductSelect'
import {women} from '../../api/shoesCollection'
export default function Women() {
  // const [womenData, setWomenData] = useState(women) 
  // 定义回调函数接收 子组件传递的排序后的数据 并更新状态

  return (
    <div>
      {/* 给子组件传递数据 以及回调函数 */}
      <ProductSelect data = {women}  />
    </div>
  )
}
