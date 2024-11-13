import { useState } from "react";
import { Products } from "../../Components/Products/Products.jsx";


export function MenuProductos (){
    const [ClickProducts, setClickProducts] = useState(false);

return(
    <>     
        <Products ClickProducts={ClickProducts} setClickProducts={setClickProducts}/>   
    </>
)

}

