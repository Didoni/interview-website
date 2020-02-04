  
const authFormEl = document.getElementById('auth-form');
const logoutButtonEl = document.getElementById('logout');
const errorMessageEl = document.getElementById('error-message');

let userName = null;
let accessToken = null;
const setState = async (newState) => {
    authFormEl.style.display = 'none';
    logoutButtonEl.style.display = 'none';
    errorMessageEl.style.display = 'none';
    
    switch (newState) {
        case '#notes':
            if(accessToken == null) {
              location.hash = '#login';
              break;
            }
            logoutButtonEl.style.display = '';
            break;
        case '#login':
        default:
            accessToken = null
            messageBox.innerHTML = "You are not logged in. Please provide your credentials below.";
            authFormEl.style.display = '';
            authFormEl.reset();
            break;
    }
};

authFormEl.addEventListener('submit', async e => {
    e.preventDefault();
    userName = this.username.value;

    $.ajax({
      url: "http://localhost:3333/login",
      type: 'POST',
      dataType: 'json',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        "username": this.username.value,
        "password": this.password.value
    }),
      success: function(response) {
        console.log('Messages', response); 
        accessToken = response.token;
        messageBox.innerHTML = "Wellcome " + userName;
        location.hash = '#notes';
      },
      error: function(response) {
        console.error(response);
        errorMessageEl.style.display = ''
      }
    });
    authFormEl.reset();
  });

logoutButtonEl.addEventListener('click', () => {
  location.hash = '#login';
});

window.onpopstate = async () => setState(location.hash);

const refreshState = async () => {
    await setState(location.hash);
};

refreshState();