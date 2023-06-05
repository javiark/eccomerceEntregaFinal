const currentUserOrders = JSON.parse(localStorage.getItem('currentUser'));
const URL5 = 'http://localhost:4000/api';
const URL_public5 = 'http://localhost:4000';
const token4 = localStorage.getItem('token');

const orderCont = document.getElementById('orders-cont');
const userForm = document.getElementById('my-account-form');
const tableBody = document.querySelector('#table-body-orders');

const tableBody2 = document.getElementById("table-body-orders-user")



// async function cargarOrdenes() {
//     try {

//         const respuesta = await axios.get(`${URL5}/orders/user/${currentUserOrders._id}`)
//         // console.log(respuesta)
//         const orderUser = respuesta.data.userOrders;
//         renderizarTablaOrdenes(orderUser)
//     } catch (error) {
//         console.log(error)
//     }
// }
// cargarOrdenes()

async function cargaOrdenesTodas() {
    try {
        const respuesta = await axios.get(`${URL4}/orders`);
        ordersArray = respuesta.data.orders
        renderizarTablaOrdenes(ordersArray)
        // renderizarUserOrder2(ordersArray)


    } catch (error) {
        console.log(error);
    }
}
cargaOrdenesTodas()


async function deleteOrder(id) {
    console.log(id)
    swal({
        title: `Borrar orden`,
        text: `Esta seguro que desea borrar esta orden   `,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(async function (value) {
        if (value === `delete`) {
            // ? LLAMADA AL BACKEND axios.delete
            try {
                const respuesta = await axios.delete(`${URL4}/orders/${id}`, {
                    headers: { Authorization: token }
                });
                cargaOrdenesTodas()
            } catch (error) {
                console.log(error)
            }
            swal({
                title: `Elemento borrado correctamente`,
                icon: 'error'
            })
            renderizarTablaOrdenes();
        }
    })
}

// async function buscarOrdenPorId() {
//     try {
//         const respuesta = await axios.get(`${URL4}/orders/user/${id}`);
//         ordersArray = respuesta.data.orders
//         renderizarTablaOrdenes(ordersArray)
//     } catch (error) {
//         console.log(error);
//     }
// }









//2- Definir una función para iterar el array
function renderizarTablaOrdenes(arrayOrders) {
    tableBody.innerHTML = '';
    if (arrayOrders.length === 0) {
        tableBody.innerHTML = "<p class='disabled'>NO SE ENCONTRARON ORDENES</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto

    arrayOrders.forEach((order, index) => {

        const tableRow = `<tr class="product">
                            <td class="product__order">${order.userId.fullName}</td>
                            <td class="product__order">${order._id}</td>
                            <td class="product__price">$ ${order.totalPrice}</td>
                            <td class="product__order">${order.products.length}</td>
                            <td class="product__order">${order.status}</td>
                            <td class="product__actions">
                                <button class="product__action-btnDetail" onclick="deleteOrder('${order._id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="product__action-btn product__btn-edit"  onclick="editOrder('${order._id}')">
                                    <i class="fa-solid fa-pencil " ></i>
                                </button>

                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}

function renderizarUserOrder2(arrayOrders) {
    tableBody2.innerHTML = '';
    if (arrayOrders.length === 0) {
        tableBody2.innerHTML = "<p class='disabled'>NO SE ENCONTRARON USUARIOS</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto

    arrayOrders.forEach((order, index) => {

        const tableRow = `<tr class="product">
                            <td class="product__order">${order.userId.fullName}</td>
                            <td class="product__order">${order._id}</td>  
                            <td class="product__actions">
                                <button class="product__action-btnDetail-Select" onclick="selectOrder('${order._id}')">
                                   </i><i class="fa-solid fa-check"></i>
                                </button>             
                            </td>
                        </tr>`
        tableBody2.innerHTML += tableRow;

    });

}

function renderizarUsuariosSelect(arrayUser) {
    // let userOrder=[]
    // console.log(userOrder)
    // console.log(arrayUser)

    let selectUser1 = document.getElementById("selectUser1")
    arrayUser.forEach((user, index) => {

        const orderUserF = {
            name: user.fullName,
            ID: user._id,
        }
        // userOrder.push(orderUserF) 
        selectUser1.innerHTML = arrayUser.map(user => `<option value="${user._id}">${user.fullName}</option>`)
    });
    // console.log(userOrder)
    // inputUser.Items.Add(userOrder)

}



// async function cargaUserTodas() {

//     try {
//         const respuesta = await axios.get(`${URL4}/users`);
//         console.log(respuesta)
//         users1=response.data.users;
//         renderizarUsuariosSelect(users1)
//         // renderizarUserOrder2(ordersArray) 


//     } catch (error) {
//         console.log(error);
//     }
// }

// cargaUserTodas()

function AccToOrderQuantity(id) {
    let input = document.getElementById(`cantidadOrden${id}`);
    let currentValue = parseInt(input.value);

    input.value = currentValue + 1;
    currentValue = parseInt(input.value);
    countProducts()
    totalOrder1(id)
    totalBuy()
}

//<input  type="text"  id="cantidadOrden${index}" value="${prod.cant}" class="boton-container__boton-number" >

{/* <label for="roleUser">Seleccionar usuario</label><br>
<select name="role" id="roleUser"  class="inputBox" required>
    <option value="usuariosArray()" id="userList">Seleccione una Usuario</option>        
</select> */}


async function obtenerUsuarios2() {
    try {
        const token = localStorage.getItem('token'); // no hay que hacer json|pars pq eltoken es una key y una string
        // console.log(token)
        const response = await axios.get(`${URL5}/users`, {
            headers: {
                Authorization: token
            }
        });
        // console.log(response)
        users = response.data.users;
        // console.log(users)
        renderizarUsuariosSelect(users)

    } catch (error) {
        console.log(error);
    }

}

obtenerUsuarios2()


async function obtenerUsuarios() {
    try {
        const token = localStorage.getItem("token"); // no hay que hacer jsonpars pq eltoken es una key y una string
        const response = await axios.get(`${URL}/users`, {
            headers: {
                Authorization: token
            }
        });
        console.log(response)
        users = response.data.users;
        console.log(users)
        renderizarTablaUser(users)
    } catch (error) {
        console.log(error);
    }
}














