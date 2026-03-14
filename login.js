function loginUser(){
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    try{
        if(!email || !password){
            throw new Error("All Fields Required!");
        }
        httpRequest("http://localhost:3000/users?email=" + email + "&password=" + password,"GET").then(function(user){
            if(user.length ==0){
                alert("Invalid Credentials");
            }else{
                localStorage.setItem("user",JSON.stringify(user[0]));
                window.location.href = "index.html";
            }
        });
    }catch(err){
        alert(err.message);
    }
}