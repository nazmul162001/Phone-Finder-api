// common function for empty input field 
const emptyInput = id => {document.getElementById(id).value = '';}

const searchBtn = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // get fetch 
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(searchField.value === ''){
      const getErr = document.getElementById('err');
      getErr.classList.remove('d-none');
      const getErrMsg = document.getElementById('err-msg');
      getErrMsg.innerText = 'Search Any Phone';
      emptyInput('search-field');
    }
    else if(data.data.length === 0){
      const getErr = document.getElementById('err');
      getErr.classList.remove('d-none');
      const getErrMsg = document.getElementById('err-msg');
      getErrMsg.innerText = 'No data found';
      emptyInput('search-field');
    }
    else{
      displaySearch(data.data)
      const getErr = document.getElementById('err');
      getErr.classList.add('d-none');
    }
  })
}



const displaySearch = (getData) => {
  // condition  
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
  emptyInput('search-field');
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
  console.log(getPhoneInfo.name);
  const cardDetail = document.getElementById('card-details');
  // empty card 
  cardDetail.textContent = '';
  // others
  const myObject = `${getPhoneInfo.others}`
  console.log(myObject);

  // get sensors 
  const arr = `${getPhoneInfo.mainFeatures.sensors}`;
  const [sensors] = [arr];

  const div = document.createElement('div');
  div.classList.add('col-12', 'd-flex', 'justify-content-center');
  div.innerHTML = `
    <div class="card custom-card" style="width: 40rem;">
      <img src="${getPhoneInfo.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <p class="card-title"><span class="fw-bold">Name: </span> ${getPhoneInfo.name}</p>
        <p class="card-title"><span class="fw-bold">Release: </span> ${getPhoneInfo.releaseDate}</p>
        <p class="card-title"> <span class="fw-bold">Sensors: </span> ${sensors}</p>
        <p class="card-title"> <span class="fw-bold">Main Feature: 
        </span> <br> <span class="text-success fw-bold">Storage:</span>  ${getPhoneInfo.mainFeatures.storage}
        <br> <span class="text-success fw-bold">DisplaySize:</span> ${getPhoneInfo.mainFeatures.displaySize}
        <br> <span class="text-success fw-bold">Chipset:</span> ${getPhoneInfo.mainFeatures.chipSet}
        <br> <span class="text-success fw-bold">Memory:</span> ${getPhoneInfo.mainFeatures.memory}
        </p>
        <p class="card-title"><span class="fw-bold">Other Feature: </span> <br> 
        <span class="text-success fw-bold">WLAN:</span> ${getPhoneInfo.others.WLAN} <br>
        <span class="text-success fw-bold">Bluetooth:</span> ${getPhoneInfo.others.Bluetooth} <br>
        <span class="text-success fw-bold">GPS:</span> ${getPhoneInfo.others.GPS} <br>
        <span class="text-success fw-bold">NFC:</span> ${getPhoneInfo.others.NFC} <br>
        <span class="text-success fw-bold">Radio:</span> ${getPhoneInfo.others.Radio} <br>
        <span class="text-success fw-bold">USB:</span> ${getPhoneInfo.others.USB}
        </p>
      </div>
    </div>
  `;
  cardDetail.appendChild(div);
}




// for(const phoneDetail in getPhoneInfo){
//   console.log(`${phoneDetail}: ${getPhoneInfo[phoneDetail]}`);
// }