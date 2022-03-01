// common function for empty input field 
const emptyInput = id => {document.getElementById(id).value = '';}

// Common Function for empty card-container
const emptyCardContainer = id => {
  const getCardContainer = document.getElementById(id);
  getCardContainer.textContent = '';
}

// Common function for add ClassList
const addClass = err => {
  const getErr = document.getElementById(err);
  getErr.classList.add('d-none');
}

// Common function for remove ClassList
const removeClass = err => {
  const getErr = document.getElementById(err);
  getErr.classList.remove('d-none');
}


/////////////////// main work ///////////////////
const searchBtn = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // get fetch 
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(searchField.value === ''){
      removeClass('err')
      emptyInput('search-field');
      const getErrMsg = document.getElementById('err-msg');
      getErrMsg.innerText = '';
    }
    else if(data.data.length === 0){
      removeClass('err')
      addClass('total-result')
      emptyInput('search-field');
      emptyCardContainer('card-container');
      emptyCardContainer('card-details');
      const getErrMsg = document.getElementById('err-msg');
      getErrMsg.innerText = 'No data found';
    }
    else{
      displaySearch(data.data)
      addClass('err')
      emptyCardContainer('card-details')
      removeClass('total-result')
    }
  })
}

const displaySearch = (getData) => {
  // console.log(getData.length);
  const getCardContainer = document.getElementById('card-container');
  getCardContainer.textContent = '';
  // Slice Card container
  const totalResult = getData.slice(0,20);

  // display total result number 
    const showTotalResult = document.getElementById('total-result');
    showTotalResult.textContent = '';
    const p = document.createElement('p');
    p.classList.add('text-center', 'text-primary', 'fs-5')
    p.innerHTML = `
    Showing ${totalResult.length} result, total of ${getData.length} result 😊
    `;
    showTotalResult.appendChild(p);
  // -------------------------------------------------- //

  totalResult.forEach(getSlice => {
    const div = document.createElement('div');
    div.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'col-12', 'mb-4');
    div.innerHTML = `
    <div class="card text-center pt-5">
      <img src="${getSlice.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Name: ${getSlice.phone_name}</h5>
        <h5 class="card-title">Brand: ${getSlice.brand}</h5>
        <button onclick="detailsBtn('${getSlice.slug}')" class="btn btn-primary">See Details</button>
      </div>
    </div>
  `;
  getCardContainer.appendChild(div);
  emptyInput('search-field')
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
  cardDetail.textContent = '';
  // distructuring 
  // const  {GPS,WLAN,NFC,Radio,USB} = getPhoneInfo.others;
  const  {name,releaseDate,mainFeatures} = getPhoneInfo

  // get sensors 
  const arr = `${getPhoneInfo.mainFeatures.sensors}`;
  const [sensors] = [arr];

  const div = document.createElement('div');
  div.classList.add('col-12', 'd-flex', 'justify-content-center');
  div.innerHTML = `
    <div class="card custom-card pt-5" style="width: 40rem;">
      <img src="${getPhoneInfo.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <p class="card-title"><span class="fw-bold">Name: </span> ${name}</p>
        <p class="card-title"><span class="fw-bold">Release: </span> ${releaseDate ? getPhoneInfo.releaseDate : 'No release date found' }</p>
        <p class="card-title"> <span class="fw-bold">Sensors: </span> ${sensors}</p>
        <p class="card-title"> <span class="fw-bold">Main Feature: 
        </span> <br> <span class="text-success fw-bold">Storage:</span>  ${mainFeatures.storage}
        <br> <span class="text-success fw-bold">DisplaySize:</span> ${mainFeatures.displaySize}
        <br> <span class="text-success fw-bold">Chipset:</span> ${mainFeatures.chipSet}
        <br> <span class="text-success fw-bold">Memory:</span> ${mainFeatures.memory}
        </p>
        <p class="card-title"><span class="fw-bold">Other Feature: </span> <br> 
        <span class="text-success fw-bold">WLAN:</span> ${getPhoneInfo.others ? getPhoneInfo.others.WLAN : 'no data found'} <br>
        <span class="text-success fw-bold">Bluetooth:</span> ${getPhoneInfo.others ? getPhoneInfo.others.Bluetooth : 'no data found'} <br>
        <span class="text-success fw-bold">GPS:</span> ${getPhoneInfo.others ? getPhoneInfo.others.GPS : 'no data found'} <br>
        <span class="text-success fw-bold">NFC:</span> ${getPhoneInfo.others ? getPhoneInfo.others.NFC : 'no data found'} <br>
        <span class="text-success fw-bold">Radio:</span> ${getPhoneInfo.others ? getPhoneInfo.others.Radio : 'no data found'} <br>
        <span class="text-success fw-bold">USB:</span> ${getPhoneInfo.others ? getPhoneInfo.others.USB : 'no data found'}
        </p>
      </div>
    </div>
  `;
  cardDetail.appendChild(div);
}