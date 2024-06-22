let myStore = new Store("cửa hàng vàng mã ");
let p1 = new Product(1, "vàng mã", 1000, "abc");
let p2 = new Product(2, "iPhone", 2000, "xyz");
myStore.addProduct(p1);
myStore.addProduct(p2);



showAll()

function saveData(){
    let listProductJS = JSON.stringify(myStore.listProduct)
    localStorage.setItem("listProduct",listProductJS);
    
}
function loadData(){
    let listProductJS = localStorage.getItem("listProduct");
    if(listProductJS){
        myStore.listProduct= JSON.parse(listProductJS)
    }
}

function getOneProduct(index){
    let oldProduct = myStore.getOneProduct(index)
    document.getElementById("id").value = oldProduct.id;
    document.getElementById("name").value = oldProduct.name;
    document.getElementById("price").value = oldProduct.price;
    document.getElementById("img").value = oldProduct.img;
    document.getElementById("btn-save").innerHTML = `<button onclick="edit(${index})">SAVE</button>`
}

function edit(index){
    let idInput =  document.getElementById("id").value;
    let nameInput = document.getElementById("name").value;
    let priceInput = document.getElementById("price").value;
    let imgInput = document.getElementById("img").value;
    let newProduct = new Product (idInput,nameInput,priceInput,imgInput);
    myStore.update(index,newProduct);
    showAll()
    saveData()
    document.getElementById("id").value = ""
    document.getElementById("name").value = ""
    document.getElementById("price").value = ""
    document.getElementById("img").value = ""
    document.getElementById("btn-save").innerHTML = `<button onclick="add()">ADD</button>`
}

function add(){
  let idInput =  document.getElementById("id").value;
  let nameInput = document.getElementById("name").value;
  let priceInput = document.getElementById("price").value;
  let imgInput = document.getElementById("img").value;
  let newProduct = new Product (idInput,nameInput,priceInput,imgInput)
  myStore.addProduct(newProduct)
  showAll()
  saveData()

}

function remove(index) {
    isConfirm = confirm("bạn chắc chứ ?")
    if (isConfirm) {
        myStore.remove(index);
        alert("Thành công !")
        showAll()
        saveData()
    }else{
        alert("Đồ đáng ghéc sao lại hủy")
    }
}
function showAll() {
    let list = myStore.listProduct;
    let str = ` <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Img</th>
            <th colspan="2">Actions</th>
        </tr>
        `
    for (i = 0; i < list.length; i++) {
        str = str + `<tr>
            <td>${list[i].id}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].img}</td>
            <td><button onclick="remove(${i})">Xóa</button></td>
            <td><button onclick="getOneProduct(${i})">Sửa</button></td>
        </tr>
        `
    } document.getElementById("table").innerHTML = str;
    
}
