import React, { useEffect } from 'react'
import ProductSelect from '../../components/ProductSelect/ProductSelect'
import {men} from '../../api/shoesCollection'
export default function Men() {
  return (
    <div>
      {/* 给子组件传递数据 以及回调函数 */}
      <ProductSelect data = {men}  />
    </div>
  )
}
