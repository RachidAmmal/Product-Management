let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let mood = 'create'
let tmp;

// Get total
function getTotal() {
   if (price.value != '') {
      let result = (+price.value + +taxes.value + +ads.value) - +discount.value
      total.innerHTML = result
      total.style.backgroundColor = 'green'
   } else {
      total.innerHTML = ''
      total.style.backgroundColor = '#a00d02'
   }
}

// Create product
let dataPro;
if (localStorage.product != null) {
   dataPro = JSON.parse(localStorage.product)
} else {
   dataPro = []
}


submit.addEventListener("click", () => {
   let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase()
   }

   // Count
   if (title.value != '' && price.value != '' && category.value != '' && count.value <= 100) {
      if (mood === 'create') {
         if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
               dataPro.push(newPro)
            }
         } else {
            dataPro.push(newPro)
         }
      } else {
         dataPro[tmp] = newPro;
         mood = 'create'
         submit.innerHTML = 'create'
         count.style.display = 'block'
      }

      // Clear inputs
      clearData()
   }

   // Save in localStorage
   localStorage.setItem('product', JSON.stringify(dataPro))

   total.style.backgroundColor = '#a00d02'

   // Read
   showData()
})

// Clear inputs
function clearData() {
   title.value = ''
   price.value = ''
   taxes.value = ''
   ads.value = ''
   discount.value = ''
   total.innerHTML = ''
   count.value = ''
   category.value = ''
}

// Read
function showData() {
   let table = ''
   for (let i = 0; i < dataPro.length; i++) {
      table += `
      <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price} $</td>
      <td>${dataPro[i].taxes} $</td>
      <td>${dataPro[i].ads} $</td>
      <td>${dataPro[i].discount} $</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr> 
      `
   }
   document.getElementById('tbody').innerHTML = table

   let btnDelete = document.getElementById("deleteAll")
   if (dataPro.length > 0) {
      btnDelete.innerHTML = `<button onclick = "deleteAll()" >Delete All (${dataPro.length})</button>`
   } else {
      btnDelete.innerHTML = ''
   }
}

showData()

// Delete
function deleteData(ele) {
   dataPro.splice(ele, 1)
   localStorage.product = JSON.stringify(dataPro)

   // Read
   showData()
}

function deleteAll(event) {
   localStorage.clear()
   dataPro.splice(0)

   // Read
   showData()
}

// Update
function updateData(i) {
   title.value = dataPro[i].title
   price.value = dataPro[i].price
   taxes.value = dataPro[i].taxes
   ads.value = dataPro[i].ads
   category.value = dataPro[i].category
   getTotal()
   count.style.display = "none"
   discount.value = dataPro[i].discount
   submit.innerHTML = 'Update'
   mood = 'update'
   tmp = i
   scroll({
      top: 0,
      behavior: "smooth"
   })
}

// Search
let searchMood = 'title';

function getSearchMood(id) {
   let search = document.getElementById('search')
   if (id === 'searchTitle') {
      searchMood = 'title'
      search.placeholder = 'search by title'
   } else if (id === 'searchCategory') {
      searchMood = 'category'
      search.placeholder = 'search by category'
   }
   search.focus()

   search.value = '';

   showData()
}

function searchData(value) {
   let table = '';
   if (searchMood == 'title') {
      for (let i = 0; dataPro.length; i++) {
         if (dataPro[i].title.includes(value.toLowerCase())) {
            table += `
      <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price} $</td>
      <td>${dataPro[i].taxes} $</td>
      <td>${dataPro[i].ads} $</td>
      <td>${dataPro[i].discount} $</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr> 
      `
         }
         document.getElementById('tbody').innerHTML = table
      }
   } else {
      for (let i = 0; dataPro.length; i++) {
         if (dataPro[i].category.includes(value.toLowerCase())) {
            table += `
      <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price} $</td>
      <td>${dataPro[i].taxes} $</td>
      <td>${dataPro[i].ads} $</td>
      <td>${dataPro[i].discount} $</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr> 
      `
         }
         document.getElementById('tbody').innerHTML = table
      }
   }
}
