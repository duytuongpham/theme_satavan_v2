AccountKit_OnInteractive = function() {
  // AccountKit.init({
  //   appId: '1609530656004384',
  //   state: window.Laravel.csrf_token,
  //   version: 'v1.3',
  //   debug: true
  // });
};

function loginCallback(response) {
  console.log(response);

  if (response.status === "PARTIALLY_AUTHENTICATED") {
    axios.post("/phoneLogin", {
      'accessToken': response.code
    }).then(res => {
      window.jwt = res.token
    })
  }

  else if (response.status === "NOT_AUTHENTICATED") {
      // handle authentication failure
      alert('You are not Authenticated');
  }
  else if (response.status === "BAD_PARAMS") {
    // handle bad parameters
    alert('wrong inputs');
  }
}
 
// phone form submission handler
function smsLogin() {
  var countryCode = document.getElementById('country').value;
  var phoneNumber = document.getElementById('phone').value;
  AccountKit.login(
    'PHONE',
    {countryCode: countryCode, phoneNumber: phoneNumber},
    loginCallback
  );
}
// email form submission handler
function emailLogin() {
  var emailAddress = document.getElementById("email").value;
  AccountKit.login('EMAIL', {emailAddress: emailAddress}, loginCallback);
}