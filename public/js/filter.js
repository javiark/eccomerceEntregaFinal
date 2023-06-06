// let productos =JSON.parse(localStorage.getItem('products')) || [];
// console.log(productos)
// let productos = [];
const URL4 = 'http://localhost:4000/api';
const URL_public4 = 'http://localhost:4000';







//-------------BUSCARLO CON ENTER---------------//

function metodoFilter(evt){
        //frenando la busqueda si la tecla no es la que tiene codigo 13 ( enter )
    if(evt.keyCode !== 13){
        console.log("no apreto enter");
        return;
    }
    const text=evt.target.value.toLowerCase().trim();
    console.dir(text)
    let resultFind = products.filter((el)=>{
        return el.name.toLowerCase().includes(text)       
    })
    console.log(resultFind)
    
//     const productosFiltrado =products.filter((prod)=>{
        
//         // console.log(`el usuario filtrado es ${prod}`)

//         const filtra = prod.name.includes(text);
//         console.log(filtra)

//         return filtra;
        

// })
    console.log("producto filtrados", resultFind)
    if (resultFind.length>0){
        document.getElementById("productsCount").innerHTML=(`Se encontraron ${resultFind.length} productos`);
    }else{
        document.getElementById("productsCount").innerHTML=(`No se han encontrado productos`)
    }
    console.log(resultFind)
    renderizarProductos(resultFind)
};

//-------------BUSCARLO POR BOTON----------------//

function searchProduct(evt){
    if(evt.keyCode !==13 && evt.target.id !== 'productId'){
        return
    }
    const foundProduct=document.getElementById('searchProductBtn').value.toLowerCase()
    let resultFind = products.filter((el)=>{
        return el.name.toLowerCase().includes(foundProduct)       
    })
    if (resultFind.length>0){
        document.getElementById("productsCount").innerHTML=(`Se encontraron ${resultFind.length} productos`);
    }else{
        document.getElementById("productsCount").innerHTML=(`No se han encontrado productos`)
    }
    console.log(resultFind)

    renderizarProductos(resultFind)
}









//-------------BUSCARLO POR ORDENES----------------//

function searchOrder(evt){
    evt.preventDefault();
    // console.log(evt)
    // if(evt.keyCode !==13 && evt.target.id !== 'productId'){
    //     return
    // }
    let foundOrder=document.getElementById('searchProductBtnOrders').value.toLowerCase()
    let resultFind = products.filter((el)=>{
        return el.name.toLowerCase().includes(foundOrder)       
    })
    console.log(foundOrder)
    // if (resultFind.length>0){
    //     document.getElementById("productsCount").innerHTML=(`Se encontraron ${resultFind.length} productos`);
    // }else{
    //     document.getElementById("productsCount").innerHTML=(`No se han encontrado productos`)
    // }
    // console.log("anda")
    buscarOrdenPorId(foundOrder)

    renderizarTablaOrdenes(resultFind)
}

function metodoFilterOrder(evt){
    console.log(evt)
}
// metodoFilterOrder()

async function buscarOrdenPorId() {
    try {
        const respuesta = await axios.get(`${URL4}/orders/user/${id}`);
        ordersArray = respuesta.data.orders
        renderizarTablaOrdenes(ordersArray)
    } catch (error) {
        console.log(error);
    }
}




