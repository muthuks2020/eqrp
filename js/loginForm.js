var attempt=3;

var credentials={
    username: '',
    password:'',
    usernameSave: 'cloudinteg',
    passwordSave: 'cloudinteg123'
}

function validate(){
    credentials.username=document.getElementById('username').value;
    credentials.password=document.getElementById('password').value;
    console.log(credentials);
    if( credentials.username === credentials.usernameSave && credentials.password===credentials.passwordSave){
        alert("logged in successfully");
        window.location="dashboard.html";
        sessionStorage.setItem('sess',true);
        return false;
    }
    else {
        attempt--;
        sessionStorage.setItem('sess',false);
        alert("you have " +attempt+ " attempts");
        if( attempt ==0 ){
            document.getElementById("uName").disable=true;
            document.getElementById("password").disable=true;
            document.getElementById("submit").disable=true;
            return false;
        }
    }
}

// var subBtn=document.getElementById('submit');
// subBtn.addEventListener('click',validate());
