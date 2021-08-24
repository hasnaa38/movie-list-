'use strict';

let tableArea = document.getElementById('tableArea');

//------> Local Storage <------
if(localStorage.getItem('listStorage') === null) {
  localStorage.setItem('listStorage', JSON.stringify([]));
}

let movieList = JSON.parse(localStorage.getItem('listStorage'));

//------> Constructor Function <------

function MovieObject(name, category, year, image) {
  this.name = name;
  this.category = category;
  this.year = year;
  this.image = image;

  movieList.push(this);
}

//------> Submitting Event <------
document.addEventListener('submit', submittingFunction);
function submittingFunction(event) {
  event.preventDefault();
  let movieCategory = event.target.category.value;
  let categoryImage = `../img/${movieCategory}.png`;

  new MovieObject(event.target.name.value, movieCategory, event.target.year.value, categoryImage);
  console.log(movieList);
  localStorage.setItem('listStorage', JSON.stringify(movieList));
  render();
}

//------> Rendering Function <------
function render() {
  tableArea.textContent = '';
  let table = document.createElement('table');
  tableArea.appendChild(table);
  for(let i=0; i<movieList.length; i++) {
    let tableRow = document.createElement('tr');
    table.appendChild(tableRow);
    let td1 = document.createElement('td');
    td1.id = `r${i}`;
    td1.classList = 'remove';
    td1.textContent = 'x';
    tableRow.appendChild(td1);
    let td2 = document.createElement('td');
    tableRow.appendChild(td2);
    let img = document.createElement('img');
    img.src = movieList[i].image;
    td2.appendChild(img);
    let td3 = document.createElement('td');
    td3.textContent = movieList[i].name;
    tableRow.appendChild(td3);
    let td4 = document.createElement('td');
    td4.textContent = movieList[i].year;
    tableRow.appendChild(td4);
  }
}

render();

//------> Clearing Event <------
document.addEventListener('reset', clearingFunction);
function clearingFunction() {
  tableArea.textContent = '';
  localStorage.setItem('listStorage', JSON.stringify([]));
  movieList = JSON.parse(localStorage.getItem('listStorage'));

}

//------> Removing One Movie <------
tableArea.addEventListener('click', removingFunction);
function removingFunction(event) {
  let index = event.target.id.slice(1,2);
  console.log(`removing row: ${index}`);
  movieList.splice(index, 1);
  localStorage.setItem('listStorage', JSON.stringify(movieList));
  render();
}
