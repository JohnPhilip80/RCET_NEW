async function httpRequest(reqURL,reqMethod,reqItem){
    let reqBody = {};
    if(reqMethod === "GET" || reqMethod === "DELETE"){
        reqBody = {
            method:reqMethod
        };
    }
    else if(reqMethod === "POST" || reqMethod === "PUT"){
        reqBody = {
            method:reqMethod,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(reqItem)
        };
    }
    try{
        let response = await fetch(reqURL,reqBody);
        if(!response.ok){
            throw new Error("HTTP Error! Status:" + response.status);
        }
        let jsonResponse = await response.json();
        return jsonResponse;
    }catch(error){
        console.error("Error: ",error);
    }
}
function setLoginAndLogout(){
    let loggedUser = localStorage.getItem("user");
    if(loggedUser){
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("registerLink").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
        if(document.getElementById("welcomeMessage"))
            document.getElementById("welcomeMessage").textContent = "Welcome " + JSON.parse(loggedUser).name;
    }else{
        document.getElementById("loginLink").style.display = "block";
        document.getElementById("registerLink").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
        if(document.getElementById("welcomeMessage"))
            document.getElementById("welcomeMessage").textContent = "Please Login / Register";
    }
    if(JSON.parse(loggedUser).role==="admin"){
        document.getElementById("courselistLink").style.display = "block";
        document.getElementById("courseformLink").style.display = "block";
    }
    else{
        document.getElementById("courselistLink").style.display = "none";
        document.getElementById("courseformLink").style.display = "none";
    }
}
function logoutUser(){
    localStorage.removeItem("user");
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded",setLoginAndLogout);