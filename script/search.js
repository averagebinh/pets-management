"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// Bắt đầu vào: sẽ hiển thị toàn bộ dữ liệu các thú cưng
renderTableData(petArr);

// Bắt sự kiện ấn vào nút Find:

// tìm kiếm các thú cưng theo điều kiện nhập vào và hiển thị các thú cưng đáp ứng các điều kiện đó
findBtn.addEventListener("click", function () {
  // Lưu ý 1: nếu người dùng k nhập các trường dữ liệu để tìm kiếm mà ấn submit thì ta

  // cũng hiển thị toàn bộ danh sách thú cưng vì coi như điều kiện ràng buộc là không có nên sẽ đưa ra toàn bộ dữ liệu

  // Lưu ý 2: Nếu người dùng nhập nhiều trường dữ liệu để tìm kiếm thì sẽ kết hợp nhiều điều kiện để tìm kiếm

  // để đưa ra kết quả cho người dùng

  // Nếu nhập vào id thì tìm theo id

  // Gán petArr vào petArrFind
  let petArrFind = petArr;

  // Nếu trường idInput.value = true hay được nhập dữ liệu ngược lại sẽ xuống dòng tiếp theo
  if (idInput.value) {
    // lọc petArrFind bằng "filter" tìm con pet có id "includes" value được điền ở dòng trên
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  // Nếu chọn type thì tìm type
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  // Nếu chọn breed thì tìm theo breed
  if (breedInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  // Nếu tích chọn vaccinatedInput
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  // hiển thị các thú cưng thỏa mãn điều kiện tìm kiếm
  renderTableData(petArrFind);

  // Nếu nhập vào nam thì tìm theo name
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
                `;
    // ép row mới vào table nằm dòng 93
    tableBodyEl.appendChild(row);
  });
}

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

// Hiển thị tất cả các giống breed
renderBreed();
// Lưu ý: tất cả loại giống thú cưng: không phân biệt loại chó hay mèo

function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
