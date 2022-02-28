const searchBtn = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // get fetch 
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.data === null){
      console.log('noo');
    }
    else if(searchField.value === ''){
      const getErr = document.getElementById('err');
      getErr.classList.remove('d-none');
      const getErrMsg = document.getElementById('err-msg');
      getErrMsg.innerText = 'Please Search any Phone'
    }
    else if(isNaN(searchField.value) === false){
      const getErr = document.getElementById('err');
      getErr.classList.remove('d-none');
      const getErrMsg = document.getElementById('err-msg');
      getErrMsg.innerText = 'Phone name must be in String'
    }
    else{
      displaySearch(data.data)
      const getErr = document.getElementById('err');
      getErr.classList.add('d-none');
    }
  })
}



const displaySearch = (getData) => {
  console.log(getData);
  const getCardContainer = document.getElementById('card-container');
  // empty previous result 
  getCardContainer.textContent = '';
  getData.forEach(info => {
    // console.log(info);
  const div = document.createElement('div');
  div.classList.add('col-lg-4', 'col-12', 'mb-4');
  div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${info.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Name: ${info.phone_name}</h5>
        <h5 class="card-title">Brand: ${info.brand}</h5>
        <button onclick="detailsBtn('${info.slug}')" class="btn btn-primary">See Details</button>
      </div>
    </div>
  `;
  getCardContainer.appendChild(div);
  })
}

const detailsBtn = details => {
  console.log(details);
  const url = `https://openapi.programming-hero.com/api/phone/${details}`
  fetch(url)
  .then(res => res.json())
  .then(data => phoneDetails(data.data));
}

const phoneDetails = getPhoneInfo => {
  // console.log(getPhoneInfo);
  const cardDetail = document.getElementById('card-details');
  // empty card 
  cardDetail.textContent = '';
  // get sensors 
  // const arr = `${getPhoneInfo.sensors}`;
  // arr.forEach(getInfo => {
  //   console.log(getInfo);
  // })

  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${getPhoneInfo.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${getPhoneInfo.releaseDate}</h5>
        <h5 class="card-title">Brand: ${getPhoneInfo.brand}</h5>
        <h5 class="card-title">Sensors: ${getPhoneInfo.brand}</h5>
      </div>
    </div>
  `;
  cardDetail.appendChild(div);
}




// for(const phoneDetail in getPhoneInfo){
//   console.log(`${phoneDetail}: ${getPhoneInfo[phoneDetail]}`);
// }