function registerUser(){
    let uname = document.getElementById("registerName").value.trim();
    let uemail = document.getElementById("registerEmail").value.trim();
    let upassword = document.getElementById("registerPassword").value.trim();
    let uconfirmPassword = document.getElementById("registerConfirmPassword").value.trim();
    try{
        if(!uname || !uemail || !upassword || !uconfirmPassword)
            throw new Error("All Fields Required");
        if(upassword != uconfirmPassword)
            throw new Error("Passwords not match!");
        let user={
            name:uname,
            email:uemail,
            password:upassword,
            role:"student"
        };
        httpRequest("http://localhost:3000/users","POST",user).then(function(response){
            alert("Registration Successful");
            window.location.href = "index.html";
            return response;
        });
    }catch(err){
        alert(err.message);
    }
}