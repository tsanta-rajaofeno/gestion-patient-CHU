let selectedRow = null;

function onFormsubmit() {
  let formData = readFromData();
  if (selectedRow == null) insertNewRecord(formData);
  else updateRecord(formData);
  resetForm();
  searchTable();
}

function readFromData() {
  let formData = {};
  formData["nom"] = document.getElementById("nom").value;
  formData["prenom"] = document.getElementById("prenom").value;
  formData["age"] = document.getElementById("age").value;
  formData["addresse"] = document.getElementById("addresse").value;
  formData["phone"] = document.getElementById("phone").value;
  return formData;
}

function insertNewRecord(data) {
  let table = document
    .getElementById("patient_liste")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.nom;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.prenom;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.age;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.addresse;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.phone;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<a onclick="editRecord(this)">Edit</a>
                     <a onclick="deleteRecord(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("nom").value = "";
  document.getElementById("prenom").value = "";
  document.getElementById("age").value = "";
  document.getElementById("addresse").value = "";
  document.getElementById("phone").value = "";
  selectedRow = null;
}

function editRecord(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("nom").value = selectedRow.cells[0].innerHTML;
  document.getElementById("prenom").value = selectedRow.cells[1].innerHTML;
  document.getElementById("age").value = selectedRow.cells[2].innerHTML;
  document.getElementById("addresse").value = selectedRow.cells[3].innerHTML;
  document.getElementById("phone").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.nom;
  selectedRow.cells[1].innerHTML = formData.prenom;
  selectedRow.cells[2].innerHTML = formData.age;
  selectedRow.cells[3].innerHTML = formData.addresse;
  selectedRow.cells[4].innerHTML = formData.phone;
}

function deleteRecord(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("patient_liste").deleteRow(row.rowIndex);
    resetForm();
  }
}

function searchTable() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("patient_liste");
  let tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td");
    for (let j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        break;
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
