const signIn= document.getElementById("sign-in");
const navbarList = document.getElementById("navbar-list");





function renderHeaderLinks(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser) { // si el local storage (currentUser) existe
        signIn.innerHTML = `<div onclick="logout()" href="/login" class="navbar__nav-link" target="_blank">Logout</div>`

        if(currentUser.role ==="ADMIN_ROLE"){

        const adminProductLink = createListItemElement("admin-product", "Admin Productos");
        const adminUserLink =createListItemElement("admin-user", "Admin Usuarios");
        const adminOrderLink =createListItemElement("admin-orders", "Admin Orders");
 
        // const productListItem= document.createElement("li");
        // const userListItem=document.createElement("li");

        // productListItem.appendChild(adminProductLink);
        // userListItem.appendChild(adminUserLink);

        // productListItem.classList.add("navbar__nav-item")
        // userListItem.classList.add("navbar__nav-item")

        navbarList.appendChild(adminProductLink)
        navbarList.appendChild(adminUserLink)
        navbarList.appendChild(adminOrderLink)
        
    }


    } else{ //sino existe un current User
        // link.innerText ="Login"
        // const link = createLinkElement("login", "Login")
        const link = createLinkElement("login", "Login")
        signIn.replaceChildren(link); //agarro el elemento padre y le reemplazo los hijos con el link. los hijos q tenga los reemplace por este nuevo elemento
        // signIn.innerHTML = `<a href="/pages/login/login.html" class="navbar__nav-link" target="_blank">Login</a>`
    }
}

//agrego mas item (li) en el caso que sea admin
function createListItemElement(path, text){ // el type es opcional, por defecto es nulo y no hace falta q se manden

    const listItem = document.createElement("li");
    listItem.classList.add("navbar__nav-link")
    listItem.classList.add("navbar__nav-item1")
    //le asigno un atributo id
    listItem.setAttribute("id", path);
    link = createLinkElement(path, text); // el link lo obtenemos de la funcion

    listItem.appendChild(link)
    return listItem;
}

function createLinkElement(path, text){ // el texto es el que veo en el link. // el type es opcional, por defecto es nulo y no hace falta q se manden
    // let li;

    const link=document.createElement("a"); //
    link.classList.add("navbar__nav-link1"); //le agrego una clasecreo un elemento a
    link.href =`${path}`;
    link.innerText =text; //le inserto un texto
    
    // if (type){ // si tipo no es null
    //     li = document.createElement(type)
    //     li.appendChild(link)
    // }
    // return type ? li : link; // si type existe retornamos li, sino retornamos link

    return link;
}

function logout(){
    const loginUser= document.getElementById("loginName")
    loginUser.innerHTML = ``
    const currentUser=JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser.role ==="ADMIN_ROLE"){
    document.getElementById("admin-product").remove();
    document.getElementById("admin-user").remove();
    document.getElementById("admin-orders").remove();
    setTimeout(()=>{
        window.location.href="/"
    }, 1000)

}
localStorage.removeItem("currentUser");
localStorage.removeItem("token");
sessionStorage.removeItem("order");

    renderHeaderLinks();
    btnBuy();

}

// function logout(){
//     localStorage.removeItem("currentUser");
//     renderHeaderLinks();
// }

renderHeaderLinks();



