let input=document.querySelector("#input-task");
let AddButton = document.querySelector("#add")
let duedateInput = document.querySelector("#date")
let doneList = document.querySelector("#doneList")
let value=''
let duedate=''
let score = 0;
let editingIndex = null; // Track which task is being edited
let list =[]
let totalScore = document.querySelector("#total")

let progressBar = document.querySelector("#progressBar");


// Update the progress bar based on the score and total tasks
function UpdateProgressBar(){
     let total = list.length + score; 
  let percent = total === 0 ? 0 : Math.round((score / total) * 100);


  progressBar.style.width = percent + "%";
  progressBar.setAttribute("aria-valuenow", percent);


  if (percent >= 75) {
  progressBar.classList.add("bg-success");
  progressBar.classList.remove("bg-warning", "bg-danger");
} else if (percent >= 40) {
  progressBar.classList.add("bg-warning");
  progressBar.classList.remove("bg-success", "bg-danger");
} else {
  progressBar.classList.add("bg-danger");
  progressBar.classList.remove("bg-success", "bg-warning");
}

}

//add task

function AddTask(){
Name =input.value;
duedate=duedateInput.value

if( editingIndex !== null ) {   
list[editingIndex].Name = Name;
list[editingIndex].duedate = duedate;
editingIndex = null; // Clear editing index after update
}
else if (Name.trim() === "") return;
else{
list.push({
    Name , duedate,completed:"false" 
})
}
    input.value = '';
    duedateInput.value = '';
 AddButton.innerText="Add"
Render()
console.log(list);

}

//render to page
function Render(){
let html =''
list.forEach(function( listObj,index){
html +=`
<li class="list-group-item d-flex justify-content-between align-items-center m-2">


  <div class="d-flex align-items-center">
    <input type="checkbox" class="form-check-input me-2" id="check${index}" ${listObj.completed === "true" ? "checked" : ""} onclick="toggleComplete(${index})">
    <span style="text-decoration:${listObj.completed === "true" ? "line-through" : "none"}">${listObj.Name}</span>
    <span class="ms-4 text-danger">${listObj.duedate}</span>
  </div>


  <div class="d-flex align-items-center">

    <i class="bi bi-pencil-square text-primary fs-5 me-3" title="تعديل" role="button" onclick="Edit(${index})"></i>
    <i class="bi bi-trash text-danger fs-5" title="حذف" role="button" onclick="Delete(${index})"></i>
  </div>

</li>

`

})
document.querySelector("#taskList").innerHTML=html

let total = list.length
totalScore.innerHTML=`
<h1>${score}/${total}</h1>
`

UpdateProgressBar()
}
// delete task
function Delete(index){

list.splice(index,1)
Render()
}

//edit task
function Edit(index){  
editingIndex = index; // Remember which task to edit
    input.value = list[index].Name;
    duedateInput.value = list[index].duedate;
    AddButton.innerText="edit"


  }



// complete task
function toggleComplete(index) {
const task = list.splice(index, 1)[0];
  task.completed = "true";
let ul =document.querySelector("#doneTasks")
const li = document.createElement("li");
li.className="list-group-item d-flex justify-content-between align-items-center m-2"
li.innerHTML=`
  <div class="d-flex justify-content-between align-items-center">
     <div>
     <span style="text-decoration:line-through">${task.Name}</span>
    <span class="ms-4 text-danger">${task.duedate}</span>
  </div>
 </div>
`
ul.appendChild(li)
score++
Render()
console.log(task);

}

// to keypress in Enter key
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    AddTask();
  }
});

//  * add
//  * delete
//  * edit
//  * render
//  * score/total
//  * connect to prpgrss bar */

