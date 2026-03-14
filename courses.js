function enroll(courseId) {
	  const user = JSON.parse(localStorage.getItem("user"));
      let enrollment = {"userid":user.id,"courseid":courseId};

      fetch("http://localhost:3000/enrollments",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(enrollment)
    }).then(function(response){
        loadEnrollments();
    });
    
}

function loadEnrollments() {
    let user = JSON.parse(localStorage.getItem("user"));
    let enrollmentList = document.getElementById("enrollmentList");
    let enrollments = [];
    let courses = [];
    enrollmentList.innerHTML = "";
    fetch("http://localhost:3000/enrollments?userid=" + user.id).then(function(response){
        return response.json();
    }).then(function(data){
        enrollments= data;
    });

    fetch("http://localhost:3000/courses").then(function (response){
        return response.json();
    }).then(function(data){
        courses = data;
        
        for(let i=0;i<enrollments.length;i++){
            let course = {};
            for(let j=0;j<courses.length;j++){
                if(enrollments[i].courseid === courses[j].id){
                    course = courses[j];
                    break;
                }
            }
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between";
            li.innerHTML = course.title + " <button class='btn btn-danger btn-sm' onclick='deleteEnrollment(" + enrollments[i].id + ")'>Remove</button>";
            enrollmentList.appendChild(li);
        }
    })
}

async function deleteEnrollment(id) {
    fetch("http://localhost:3000/enrollments/" + id,{
        method:"DELETE"
    }).then(function(response){
        loadEnrollments();
    });
}

function loadCourses() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user){
        alert("Please Login to access Courses Page!");
        return window.location.href = "login.html";
    }
    const courseList = document.getElementById("courseList");

    fetch("http://localhost:3000/courses").then(function(response){
        return response.json();
    }).then(function(courses){
        for(let i=0; i<courses.length;i++){
            let divElement = document.createElement("div");
            divElement.className = "col-md-4 mb-3";
            divElement.innerHTML = "<div class='card p-3'>" +
                            "<h5>" + courses[i].title + "</h5>" +
                            "<p>" + courses[i].duration + "</p>" + 
                            "<button class='btn btn-primary' onclick='enroll(" + courses[i].id + ")'>Enroll</button>"
                        "</div>";
            courseList.append(divElement)
        }
        loadEnrollments();
    });
}
loadCourses();