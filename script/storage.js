"use strict";
//Thêm Animation khi click vào Sidebar
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// const petArr = [];

const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 10,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(),
};

// petArr.push(data1);
// petArr.push(data2);

const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed2 = {
  breed: "Tabby",
  type: "Cat",
};
const breed3 = {
  breed: "Chó Phú Quốc",
  type: "Dog",
};
const breed4 = {
  breed: "Mèo Mướp",
  type: "Cat",
};
// copy breedArr
// viết function saveToStorage and getFromStorage
// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  // gán dữ liệu để test
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");

// Lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  // gán dữ liệu để test
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
const breedArr = getFromStorage("breedArr");

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
