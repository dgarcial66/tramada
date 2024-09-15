import { Menu } from "../../Components/Menu/Menu";
import { Productos } from "../../Components/Productos/Productos";
import { useState } from "react";


export function MenuProductos (){
    const [ClickProducts, setClickProducts] = useState(false);

return(
    <div>     
    <Productos ClickProducts={ClickProducts} setClickProducts={setClickProducts}/>   
    </div>
)

}

