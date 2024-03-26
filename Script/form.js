// custom theme
let bgColor = document.getElementById('bg-color');
bgColor.value = '#BBE8BE';

function customTheme() {
  let fontColor = document.getElementById('font-color');

  let selectedBackground = bgColor.value;
  let selectedFont = fontColor.value;

  document.body.style.backgroundColor = selectedBackground;
  document.body.style.color = selectedFont;
}

// navigate section to section
let initialAlertShown = false;

function navigateTo(sectionId) {
   if (validateSection()) {

  if (sectionId === 'confirmation-section') {
    let Confirm = document.querySelector('.Confirm');
    Confirm.style.display = 'block';

    let allSections = document.querySelectorAll('.hidden');
    let navigation = document.querySelectorAll('.navigation')

    // show all section
    allSections.forEach(section => {
      section.classList.remove('hidden');
      section.classList.add('visible');

    });

    // hide navigation button
    navigation.forEach(button => {
      if (button.id !== 'nav-btn') {
        button.style.display = 'none';
      }
    });
  }

  else if (sectionId === 'submission-section') {
    let Confirm = document.querySelector('.Confirm');
    Confirm.style.display = 'none';

    let submit = document.querySelector('#submission-section');
    submit.style.display = 'block';
    let currentSection = document.querySelectorAll('.visible');
    currentSection.forEach(section => {
      section.classList.remove('visible');
      section.classList.add('hidden');
    })
  }


  let currentSection = document.querySelector('.visible');
  currentSection.classList.remove('visible');
  currentSection.classList.add('hidden');

  let nextSection = document.getElementById(sectionId);
  nextSection.classList.remove('hidden');
  nextSection.classList.add('visible');

}
}



function validateSection() {
  let sectionId = document.querySelector('.visible').id;
  let fields = document.querySelectorAll(`#${sectionId} input, #${sectionId} select`);
  let errorShown = false;

  let isValid = true;

  fields.forEach(field => {
    if (field.value === '') {
      isValid = false;
      initialAlertShown = true;
      errorShown = true;
    }
  });

  let errors = document.querySelectorAll('.input-icon');
  errors.forEach(error => {
    if (error.innerHTML === '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>') {
      isValid = false;
      initialAlertShown = true;
      errorShown = true;
    }
  });

  if (errorShown) {
    alert('Please fill in all the fields before proceeding.');
  }

  return isValid;
}



// Validating input
function checkInput(inputId) {
  let element = document.getElementById(inputId);
  let iconElement = document.getElementById(inputId + '-icon');
  let errorElement = document.getElementById(inputId + '-error');

  // Age special case
  if (inputId === 'dob') {
    validateAge();
    return;
  }

  if (element.value.trim() === "") {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'This field is required';
  } else if (element.type === 'tel') {
    validatePhoneNumber(element, iconElement, errorElement);
  } else if (element.type === 'email') {
    validateEmail(element, iconElement, errorElement);
  } else if (element.type === 'text' && inputId !== 'bankacc'&& inputId !== 'bankifsc' && inputId !== 'voter' && inputId !== 'driving' && inputId !== 'pancard') {
    validateName(element, inputId, iconElement, errorElement);
  }
  else if (inputId === 'pincode') {
    validatePincode(element, iconElement, errorElement);
  }
  else if (inputId === 'aadhar') {
    isValidAadharNumber(element, iconElement, errorElement)
  }
  else if (inputId === 'pancard') {
    isValidPANNumber(element, iconElement, errorElement)
  }
  else if (inputId === 'states') {
    if (element.value === "") {
      iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
      errorElement.innerText = 'This field is required';
    } else {
      iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
      errorElement.innerText = '';
      populateDistricts();
    }
  }
  else if (inputId === 'bankifsc') {
    isValidIFSC(element, iconElement, errorElement);
  } else if (inputId === 'voter') {
    isValidVoterId(element, iconElement, errorElement);
  } else if (inputId === 'driving') {
    isValidDrivingLicense(element, iconElement, errorElement);
  }  
  else if (inputId === 'bankacc') {
    isValidBankAccountNumber(element, iconElement, errorElement);
  }
  else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

// Validate age
function validateAge() {
  let ageInput = document.getElementById('age');
  let ageIcon = document.getElementById('age-icon');
  let ageError = document.getElementById('age-error');
  let dobInput = document.getElementById('dob');

  let dob = new Date(dobInput.value);
  let currentDate = new Date();
  let age = currentDate.getFullYear() - dob.getFullYear();

  if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
    age--;

    ageInput.value = age;
    

    if (age > 80 || age < 0) {
      ageIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
      ageError.innerText = 'Age must be 80 or below';
    } else {
      ageIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
      ageError.innerText = '';
    }

  }
}

function validatePhoneNumber(phone, iconElement, errorElement) {
  if (!(/^[6789]\d{9}$/.test(phone.value))) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid number';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function validateEmail(email, iconElement, errorElement) {
  if (!(/^[^\s]+@[^\s]+\.[^\s]+$/.test(email.value))) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Invalid Email-ID';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function validateName(element, inputId, iconElement, errorElement) {
  if (!/^[a-zA-Z ]+$/.test(element.value) || element.value.length < 3) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = `Enter a valid ${inputId} (no special characters allowed)`;
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function validatePincode(pincode, iconElement, errorElement) {
  if (!(pincode.value.length === 6)) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid pincode';
  } else {
    populateDistrictState()
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function isValidAadharNumber(aadhar, iconElement, errorElement) {
  if (!(/^\d{12}$/.test(aadhar.value))) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid 12-digit Aadhar number';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function isValidPANNumber(pancard, iconElement, errorElement) {
  let pan = pancard.value.toUpperCase();
  pancard.value = pancard.value.toUpperCase();
  if (!(/^[A-Z]{5}\d{4}[A-Z]$/.test(pan))) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid Pancard number';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function isValidBankAccountNumber(accountNumber, iconElement, errorElement) {
  if (/^\d{15}$/.test(accountNumber.value)) {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid 15-digit account number';

  }
}


//Adrees-checkbox
function AddressCheck(element) {

  let otherAddress = document.querySelector('.inputAddress2');

  if (element.checked) {
    otherAddress.style.display = 'none';
  } else {
    otherAddress.style.display = 'block';
  }
}

function isValidDrivingLicense(drivingLicense, iconElement, errorElement) {
  if (!/^[A-Z]{2}[0-9]{13}$/.test(drivingLicense.value)) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid Driving License number (e.g., AB1234567890123)';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function isValidVoterId(voterId, iconElement, errorElement) {
  if (!/^[a-zA-Z]{3}[0-9]{7}$/.test(voterId.value)) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid Voter ID number (e.g., ABC1234567)';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}

function isValidIFSC(ifsc, iconElement, errorElement) {
  if (!/^[A-Z]{4}[0][A-Z0-9]{6}$/.test(ifsc.value)) {
    iconElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #fd3908;"></i>';
    errorElement.innerText = 'Enter a valid IFSC code (e.g., ABCD0123456)';
  } else {
    iconElement.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #49f50a;"></i>';
    errorElement.innerText = '';
  }
}


// // add Beneficiary
function addBeneficiary() {
  let beneficiaryList = document.getElementById("beneficiaryList");
  let totalPercentage = 0;

  let beneficiaryEntry = document.createElement("div");
  beneficiaryEntry.classList.add("row");

  let nameCol = document.createElement("div");
  nameCol.classList.add("col-sm-4");
  let inputContainer = document.createElement("div");
  inputContainer.classList.add('input-container');
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.classList.add('form-control');
  nameInput.placeholder = "Full Name";
  inputContainer.appendChild(nameInput);
  nameCol.appendChild(inputContainer);
  beneficiaryEntry.appendChild(nameCol);

  let relationshipCol = document.createElement("div");
  relationshipCol.classList.add("col-sm-4");
  let relationshipSelect = document.createElement("select");
  relationshipSelect.classList.add('form-select');
  relationshipSelect.innerHTML = '<option value="select" selected hidden>Relationship</option><option value="spouse">Spouse</option><option value="child">Child</option><option value="parent">Parent</option><option value="other">Other</option>';
  relationshipCol.appendChild(relationshipSelect);
  beneficiaryEntry.appendChild(relationshipCol);

  let percentageCol = document.createElement("div");
  percentageCol.classList.add("col-sm-4");
  let percentageInput = document.createElement("input");
  percentageInput.type = "number";
  percentageInput.classList.add('form-control');
  percentageInput.placeholder = "Percentage:%";

  percentageInput.addEventListener('input', function () {
    totalPercentage = calculateTotalPercentage();
    if (totalPercentage > 100) {
      alert("Total percentage exceeds 100%");
      percentageInput.value = "";
    }
    else if (totalPercentage < 100) {
      // alert("Please ensure the total percentage adds up to 100%");
    }
  });
  percentageCol.appendChild(percentageInput);
  beneficiaryEntry.appendChild(percentageCol);

  beneficiaryList.appendChild(beneficiaryEntry);
}

function calculateTotalPercentage() {
  let percentageInputs = document.querySelectorAll('#beneficiaryList input[type="number"]');

  let totalPercentage = 0;
  percentageInputs.forEach(input => {
    totalPercentage += parseInt(input.value);
  });
  return totalPercentage;
}

function removeBeneficiary() {
  let beneficiaryList = document.getElementById("beneficiaryList");
  if (beneficiaryList.children.length > 0) {
    beneficiaryList.removeChild(beneficiaryList.lastChild);
  }
}

function handleNextButtonClick() {
  totalPercentage = calculateTotalPercentage();
  if (totalPercentage > 100) {
    alert("Total percentage exceeds 100%");
  } else if (totalPercentage < 100) {
    alert("Please ensure to add at least 1 beneficiary and the total percentage adds up to 100%");
  } else {
    navigateTo('sec4');
  }
}



// States-District's-Pincode

const pincodeDistrictStateMapping = {
  "Madhya Pradesh": [
    { pincode: "452001", district: "Indore", state: "Madhya Pradesh" },
    { pincode: "462001", district: "Bhopal", state: "Madhya Pradesh" },
    { pincode: "461331", district: "Harda", state: "Madhya Pradesh" },
    { pincode: "456001", district: "Ujjain", state: "Madhya Pradesh" },
    { pincode: "455001", district: "Dewas", state: "Madhya Pradesh" },
  ],
  "Andhra Pradesh": [
    { pincode: "500001", district: "Hyderabad", state: "Telangana" },
    { pincode: "520001", district: "Vijayawada", state: "Andhra Pradesh" },
    { pincode: "530001", district: "Vishakhapatnam", state: "Andhra Pradesh" },
    { pincode: "517501", district: "Tirupati", state: "Andhra Pradesh" },
    { pincode: "524001", district: "Nellore", state: "Andhra Pradesh" },
  ],
  "Arunachal Pradesh": [
    { pincode: "791101", district: "Itanagar", state: "Arunachal Pradesh" },
    { pincode: "791111", district: "Naharlagun", state: "Arunachal Pradesh" },
    { pincode: "791102", district: "Pasighat", state: "Arunachal Pradesh" },
    { pincode: "791103", district: "Roing", state: "Arunachal Pradesh" },
    { pincode: "791104", district: "Tezu", state: "Arunachal Pradesh" },
  ],
  "Assam": [
    { pincode: "781001", district: "Guwahati", state: "Assam" },
    { pincode: "786001", district: "Dibrugarh", state: "Assam" },
    { pincode: "785001", district: "Jorhat", state: "Assam" },
    { pincode: "788001", district: "Silchar", state: "Assam" },
    { pincode: "782001", district: "Nagaon", state: "Assam" },
  ],
  "Bihar": [
    { pincode: "800001", district: "Patna", state: "Bihar" },
    { pincode: "823001", district: "Gaya", state: "Bihar" },
    { pincode: "842001", district: "Muzaffarpur", state: "Bihar" },
    { pincode: "811001", district: "Bhagalpur", state: "Bihar" },
    { pincode: "846001", district: "Darbhanga", state: "Bihar" },
  ],
  "Chhattisgarh": [
    { pincode: "492001", district: "Raipur", state: "Chhattisgarh" },
    { pincode: "495001", district: "Bilaspur", state: "Chhattisgarh" },
    { pincode: "491001", district: "Durg", state: "Chhattisgarh" },
    { pincode: "496001", district: "Raigarh", state: "Chhattisgarh" },
    { pincode: "495677", district: "Korba", state: "Chhattisgarh" },
  ],
  "Gujarat": [
    { pincode: "380001", district: "Ahmedabad", state: "Gujarat" },
    { pincode: "395001", district: "Surat", state: "Gujarat" },
    { pincode: "390001", district: "Vadodara", state: "Gujarat" },
    { pincode: "360001", district: "Rajkot", state: "Gujarat" },
    { pincode: "364001", district: "Bhavnagar", state: "Gujarat" },
  ],
  "Haryana": [
    { pincode: "160001", district: "Chandigarh", state: "Haryana" },
    { pincode: "121001", district: "Faridabad", state: "Haryana" },
    { pincode: "122001", district: "Gurgaon", state: "Haryana" },
    { pincode: "125001", district: "Hisar", state: "Haryana" },
    { pincode: "132103", district: "Panipat", state: "Haryana" },
  ],
  "Himachal Pradesh": [
    { pincode: "171001", district: "Shimla", state: "Himachal Pradesh" },
    { pincode: "175131", district: "Manali", state: "Himachal Pradesh" },
    { pincode: "176215", district: "Dharamshala", state: "Himachal Pradesh" },
    { pincode: "175125", district: "Kullu", state: "Himachal Pradesh" },
    { pincode: "175001", district: "Mandi", state: "Himachal Pradesh" },
  ],
  "Jharkhand": [
    { pincode: "834001", district: "Ranchi", state: "Jharkhand" },
    { pincode: "831001", district: "Jamshedpur", state: "Jharkhand" },
    { pincode: "826001", district: "Dhanbad", state: "Jharkhand" },
    { pincode: "827001", district: "Bokaro", state: "Jharkhand" },
    { pincode: "825301", district: "Hazaribagh", state: "Jharkhand" },
  ],
};



const stateDistricts = {
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  "Andhra Pradesh": ["Vishakhapatnam", "Vijayawada", "Tirupati", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Roing", "Tezu"],
  "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Raigarh", "Korba"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  "Haryana": ["Chandigarh", "Faridabad", "Gurgaon", "Hisar", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"]
};

document.addEventListener('DOMContentLoaded', () => {
  populateStates();
});

function populateStates() {
  const statesDropdown = document.getElementById('states');

  for (const state in stateDistricts) {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    statesDropdown.appendChild(option);
  }
}

function populateDistricts() {
  const statesDropdown = document.getElementById('states');
  const districtsDropdown = document.getElementById('districts');

  const selectedState = statesDropdown.value;

  districtsDropdown.innerHTML = '<option value="">Select District</option>';

  if (selectedState && stateDistricts[selectedState]) {
    for (const district of stateDistricts[selectedState]) {
      const option = document.createElement('option');
      option.value = district;
      option.textContent = district;
      districtsDropdown.appendChild(option);
    }
  }
}

// function populateDistrictState() {
//   var pincode = document.getElementById('pincode').value;
//   var districtSelect = document.getElementById('districts');
//   var stateSelect = document.getElementById('states');

//   districtSelect.innerHTML = '<option value="">Select District</option>';
//   stateSelect.innerHTML = '<option value="">Select State</option>';

//   for (const state in pincodeDistrictStateMapping) {
//     const districts = pincodeDistrictStateMapping[state];
//     const info = districts.find(entry => entry.pincode === pincode);

//     if (info) {
//       var districtOption = document.createElement('option');
//       districtOption.value = info.district;
//       districtOption.textContent = info.district;
//       districtSelect.appendChild(districtOption);


//       var stateOption = document.createElement('option');
//       stateOption.value = info.state;
//       stateOption.textContent = info.state;
//       stateSelect.appendChild(stateOption);

//       districtSelect.value = info.district;
//       stateSelect.value = info.state;


//       break;
//     }
//   }
// }

