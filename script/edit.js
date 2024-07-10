"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");

// Hiển thị dữ liệu các thú cưng vào bảng
renderTableData(petArr);

function renderTableData(petArr) {
  // xóa hiển thị nội dung của bảng
  tableBodyEl.innerHTML = "";

  // Với mỗi thú cưng có trong dãy petArr --> ta tạo ra 1 hàng chứa dữ liệu của thú cưng đó trên bảng

  petArr.forEach((pet) => {
    const row = document.createElement("tr"); // tạo 1 thẻ tr
    // vẽ lại trên HTML
    row.innerHTML = `
                  <th scope="row">${pet.id}</th>
                  <td>${pet.name}</td>
                  <td>${pet.age}</td>
                  <td>${pet.type}</td>
                  <td>${pet.weight} kg</td>
                  <td>${pet.length} cm</td>
                  <td>${pet.breed}</td>
                  <td>
                    <i class="bi bi-square-fill" style="color: ${
                      pet.color
                    }"></i>
                  </td>
                  <td><i class="bi ${
                    pet.vaccinated
                      ? "bi-check-circle-fill "
                      : "bi-x-circle-fill"
                  }"></i></td>
                  <td><i class="bi ${
                    pet.dewormed ? "bi-check-circle-fill " : "bi-x-circle-fill"
                  }"></i></td>
                  <td><i class="bi ${
                    pet.sterilized
                      ? "bi-check-circle-fill "
                      : "bi-x-circle-fill"
                  }"></i></td>
                  <td>
                  ${displayTime(pet.date).slice(8, 10)}/
                  ${displayTime(pet.date).slice(5, 7)}/
                  ${displayTime(pet.date).slice(0, 4)}
                  </td>
                  <td>
                  <button onclick ="editPet('${
                    pet.id
                  }')" type="button" style="background-color: #ffc107; color:#000" class="btn btn-danger">Edit</button>
                  
                  </td>`;

    // ép row mới vào table nằm dòng 93
    tableBodyEl.appendChild(row);
  });
}

//Hàm hiển thị thời gian
function displayTime(date) {
  if (date instanceof Date) {
    // If the input is a Date object, format it as a string
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  } else if (typeof date === "string") {
    // If the input is already a string, return it as is
    return date;
  } else {
    // Handle other cases or return a default value
    return "Unknown";
  }
}

//Hàm chỉnh sửa dữ liệu thông tin thú cưng
function editPet(id) {
  //Hiện lại form nhập dữ liệu
  formEl.classList.remove("hide");
  //Tìm đến dữ liệu của thú cưng cần edit
  //Chức năng:
  const pet = petArr.find((petItem) => petItem.id === id);
  //hiển thị những thông tin của thú cưng lên form nhập
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  //   breedInput.value = "Select Breed";
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  //để hiển thị đúng các loại giống cho từng loại Dog - Cat khi người dùng
  renderBreed();
  //hiển thị dữ liệu loại giống thú cưng (dữ liệu ban đầu trước khi edit)
  breedInput.value = `${pet.breed}`;
}

//Sự kiện nhấp chuột vào typeInput => sau đó hiển thị các loại giống đúng
typeInput.addEventListener("click", renderBreed);

//Hàm hiển thị giống thú cưng theo từng loại ̣̣(Dog - Cat) nhất định
function renderBreed() {
  // đặt giá trị ban đầu là "Select Breed"
  breedInput.innerHTML = "<option>Select Breed</option>";
  //Chạy trên Breed Arr chọn ra giống nào có type = dog

  // Kiểm tra, Nếu type là Dog,
  // thì lặp trong mảng breedDogs, với mỗi phần tử là breedItem
  if (typeInput.value === "Dog") {
    // mảng chứa các loại giống của loài DOG
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      // tạo option element
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
  // Nếu type là Cat
  else if (typeInput.value === "Cat") {
    // mảng chứa các loại giống của loài CAT
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// Sự kiện vào nút submit form
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  // Validate dữ liệu hợp lê
  const isValidate = validate(data);

  if (isValidate) {
    // Lấy vị trí của phần tử trong mảng
    const index = petArr.findIndex((pet) => pet.id === data.id);
    //ví dụ:
    // petArr = [pet1, pet2, pet3]

    // index = 1

    // vẫn giữ "ngày thêm thú cưng - Date Added" như cũ
    data.date = petArr[index].date;
    //data.date = petArr[1].date
    // cập nhật lại bảng dữ liệu thú cưng đó trong Array petArr
    petArr[index] = data;
    // petArr[1] = data (dữ liệu mới được nhập vào từ edit)
    // lưu dữ liệu,...
    saveToStorage("petArr", petArr);

    // ẩn form đi và hiện lại bảng dữ liệu thú cưng
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

// Validate dữ liệu hợp lệ
// hàm này sẽ trả về true nếu dữ liệu hợp lệ, và false nếu dữ liệu k hợp lệ
function validate(data) {
  let isValidate = true;

  //Nếu nhập vào 1 chuỗi trông hoặc 1 chuỗi toàn khoảng trắng thì báo lỗi
  if (nameInput.value.trim().length === 0) {
    alert("Please input for name !");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Please input for age");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Please input for weight");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("Please input for length");
    isValidate = false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  if (data.length < 1 || data.age > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    //option
    alert("Please select Type!");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }

  return isValidate;
}
