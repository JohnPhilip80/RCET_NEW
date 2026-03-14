function saveCourse(){
    if(document.getElementById("id").value){
        updateCourse();
    }else{
        createCourse();
    }
}
function loadCourse(){
    let requestParam = new URLSearchParams(window.location.search).get("id");
    if(requestParam){
        document.getElementById("courseFormTitle").textContent = "Edit Course";
        httpRequest("http://localhost:3000/courses/"+requestParam,"GET").then(function(course){
            document.getElementById("id").value = course.id;
            document.getElementById("title").value = course.title;
            document.getElementById("duration").value = course.duration;
        });
    }
    else{
        document.getElementById("courseFormTitle").textContent = "Create Course";
    }
}
function createCourse(){
    let course={
        "title":document.getElementById("title").value,
        "duration":document.getElementById("duration").value
    };
    httpRequest("http://localhost:3000/courses","POST",course).then(function(response){
        window.location.href = "courselist.html";
    })
}
function updateCourse(){
    course={
        id:document.getElementById("id"),
        title:document.getElementById("title"),
        duration:document.getElementById("duration")
    };
    httpRequest("http://localhost:3000/courses","PUT",course).then(function(response){
        window.location.href = "courselist.html";
    });
}
document.addEventListener("DOMContentLoaded",loadCourse)