"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("t-body");

//Hiển thị danh sách
renderTableBreed(breedArr);

//Bắt sự kiện ấn vào nút submit
btnSubmit.addEventListener("click", function () {
  //Lấy dữ liệu từ form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  //Validate dữ liệu
  const isValidate = validate(data);

  if (isValidate) {
    //Thêm vào dữ liệu vào mảng các breed
    breedArr.push(data);
    // Lưu dữ liệu lại (cập nhật dữ liệu)
    saveToStorage("breedArr", breedArr);
    //Hiển thị lại bảng thông tin các Breed
    renderTableBreed(breedArr);

    // Xóa thông tin từ form nhập
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;

  //Nếu nhập vào 1 chuỗi trông hoặc 1 chuỗi toàn khoảng trắng thì báo lỗi
  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed !");
    isValidate = false;
  }

  // Bắt lỗi phải chọn Type
  if (data.type === "Select Type") {
    alert("Please select Type !");
    isValidate = false;
  }

  return isValidate;
}

//Hàm xóa thông tin form
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

// Hàm hiển thị thông tin các Breed lên bảng
function renderTableBreed() {
  tableBodyEl.innerHTML = "";

  //Cứ mội loại breed ta sẽ thêm 1 dòng (row) dữ liệu vào bảng
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td scope="col">${index + 1}</td>
        <td scope="col">${breedItem.breed}</td>
        <td scope="col">${breedItem.type}</td>
        <td>
        <button type="button" onclick="deleteBreed('${
          breedItem.breed
        }')" class="btn btn-danger">Delete</button>
        </td>`;

    tableBodyEl.appendChild(row);
  });
}

//Hàm xóa các Breed
function deleteBreed(breed) {
  //Xác nhận xóa
  const isDelete = confirm("Are you sure?");

  if (isDelete) {
    //thực hiện bước xóa ở trong này
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        //Xóa khỏi mảng
        breedArr.splice(i, i);
        // Cập nhật lại dữ liệu dưới local storage
        saveToStorage("breedArr", breedArr);
        // Gọi lại hàm hiển thị
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
