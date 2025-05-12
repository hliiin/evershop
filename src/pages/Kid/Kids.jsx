import React from "react";
import ProductSelect from "../../components/ProductSelect/ProductSelect";
import { kids } from "../../api/shoesCollection";

export default function Kid() {
  return (
    <div>
      <ProductSelect data={kids} />
    </div>
  );
}
