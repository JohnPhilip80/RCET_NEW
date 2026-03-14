function fillCourseTable(){
    httpRequest("http://localhost:3000/courses","GET",{}).then(function(courses){
        let table = document.getElementById("courseBody");
        table.innerHTML = "";
        for(let i=0;i<courses.length;i++){
            let course = courses[i];
            table.innerHTML +=
            "<tr>" +
                "<td>" + course.id + "</td>" +
                "<td>" + course.title + "</td>" +
                "<td>" + course.duration + "</td>" +
                "<td>" + 
                    "<a class= 'btn btn-info' href='courseform.html?id=" + course.id + "'>Edit</a>" +
                    "<button class= 'btn btn-danger' onclick='deleteCourse(" + course.id + ")'>Delete</button>" +
                "</td>" +
            "</tr>";
        }
    });
}
function deleteCourse(id){
    httpRequest("http://localhost:3000/courses/" + id,"DELETE",{}).then(function(response){
        fillCourseTable();
    });
}
document.addEventListener('DOMContentLoaded',fillCourseTable);