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

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
// ?? let deleteEllist p40
// let deleteEllist = document.querySelectorAll(".btn.btn-danger");
const healthyBtn = document.getElementById("healthy-btn");
// const calculateBmiBtn = document.getElementById("calculate-bmi-btn");
renderTableData(petArr); // ????????? bo len tren dau

// Bắt sự kiện khi ấn chọn vào typeInput để hiện thị loại giống theo dúng loại Dog - Cat
typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị các loại giống đúng với theo từng loại Dog - Cat
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
// 1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // 1. Lấy dữ liệu từ các Form Input
  // petArr = [{ data }];
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
    date: new Date(),
  };
  // 2. Validate dữ liệu
  const validate = validateData(data);
  // Nếu hợp lệ: thực hiện 3,4,5
  if (validate) {
    // 3. Thêm thú cưng vào danh sách
    petArr.push(data);
    saveToStorage("petArr", petArr);
    // 4. Hiện thị danh sách thú cưng
    renderTableData(petArr);
    // 5. Xóa các dữ liệu nhập trong Form Input
    deleteForm();
  }
  // Không hợp lệ: thông báo các lỗi,...
});

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  // xóa hiển thị nội dung của bảng

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
                  <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
                </td>
                <td><i class="bi ${
                  // toán tử 3 ngôi

                  pet.vaccinated ? "bi-check-circle-fill " : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  pet.dewormed ? "bi-check-circle-fill " : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  pet.sterilized ? "bi-check-circle-fill " : "bi-x-circle-fill"
                }"></i></td>
                <td>
                ${displayTime(pet.date).slice(8, 10)}/
                ${displayTime(pet.date).slice(5, 7)}/
                ${displayTime(pet.date).slice(0, 4)}
                </td>
                <td>
                <button class="btn btn-danger" onclick="deletePet('${
                  pet.id
                }')">Delete</button>
                </td>`;
    // ép row mới vào table nằm dòng 93
    tableBodyEl.appendChild(row);
  });
}

// Hàm hiển thị thời gian
// function displayTime(date) {
//   if (typeof date === "string") {
//     return date;
//   } else if (typeof date === "object") {
//     return JSON.parse(JSON.stringify(date));
//   }
// }
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
// khai báo hàm
function deletePet(petId) {
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    // thực hiện bước xóa trong này
    for (let i = 0; i < petArr.length; i++) {
      // nếu petId giống id belong data object of petArr
      if (petId === petArr[i].id) {
        // Xóa khỏi mảng
        // tìm vị trí i và xóa 1 phần tử và trả lại mảng mới
        petArr.splice(i, 1);
        // cập nhật lại dữ liệu dưới local storage
        saveToStorage("petArr", petArr);
        // gọi lại hàm hiển thị
        renderTableData(petArr);
        break;
      }
    }
  }
}

function deleteForm() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
function validateData(data) {
  // Không có trường nào bị nhập thiếu dữ liệu.

  // Khai báo biến cờ hiệu
  let isValidate = true;

  if (data.id.trim() === "") {
    alert("Không được để trống trường ID!");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("Không được để trống trường Name!");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Không được để trống trường Age!");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Không được để trống trường Weight!");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("Không được để trống trường Length!");
    isValidate = false;
  }

  // Kiểm tra ID có phải duy nhất hay không?

  // Duyệt qua cái mảng petArr của chúng ta. Sau .. Kiểm tra

  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      // giá trị truyền vào bằng trường id chứa trong object data thuộc petArr
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
  }
  // normalArr = ["anh", "minh", "nguyen"]
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
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  // hiện thị các thú cưng khỏe mạnh
  if (healthyCheck === true) {
    // hiện thị thú cưng khỏe mạnh
    const healthyPetArr = [];

    // lọc trong mảng petArr
    for (let i = 0; i < petArr.length; i++) {
      // nếu trường vaccinated,... belong data object of PetArr
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        //  thêm thú cưng thứ i đó vào mảng healthyPetArr
        healthyPetArr.push(petArr[i]);
      }
    }
    // sau for sẽ có được mảng healthyPetArr : chứa toàn bộ các thú cưng khỏe mạnh
    // gọi hàm hiện thị
    renderTableData(healthyPetArr);
    // sau đó đổi nút thành cái nút 'Show All Pet'
    healthyBtn.textContent = "Show All Pet";

    // đổi lại biến cờ hiệu

    healthyCheck = false;
  } else {
    // hiện thị toàn bộ thú cưng,
    renderTableData(petArr);
    // sau đó đổi tên nút thành ...
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// calculateBmiBtn.onclick = function () {};

// ==> Bắt sự kiện vào nút submit
// Thực hiện:

// 1.Lấy dữ liệu từ các Form Input

// 2.Validate dữ liệu
// nếu hợp lệ : thực hiện 3,4,5
// không hợp lệ: thông báo các lỗi
// 3.Thêm thú cưng vào danh sách

// 4.Hiển thị danh sách thú cưng

// 5.Xóa các dữ liệu nhập trong Form Input
