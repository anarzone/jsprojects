let val;

const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const list = document.querySelector('ul.collection');
const card = document.querySelector('.card');
const heading = document.querySelector('#task-title');   
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const moreFilter = document.querySelector('#moreFilter');


form.addEventListener('submit',addTask);
list.addEventListener('click',deleteTask);
clearBtn.addEventListener('click',clearTasks);
filter.addEventListener('keyup',filterTasks);
moreFilter.addEventListener('click',sortAbc);
document.addEventListener('DOMContentLoaded',loadTasksFromStorage);

function loadTasksFromStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks =  JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task)=>{
        const li = document.createElement('li');    
        li.className = 'collection-item';

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.setAttribute('href','#');

        const i = document.createElement('i');
        i.className = 'fa fa-remove';

        link.appendChild(i);
    
        li.appendChild(document.createTextNode(task));
        li.appendChild(link);
        document.querySelector('ul.collection').appendChild(li);
        
    })
    
}

function sortAbc(e) {
    if(e.target.parentElement.classList.contains('filterAlpha')){
        let i, switching, li, shouldSwitch;
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
        //start by saying: no switching is done:
        switching = false;
        li = list.getElementsByTagName("li");
        //Loop through all list-items:
        for (i = 0; i < (li.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*check if the next item should
            switch place with the current item:*/
            if (li[i].innerHTML.toLowerCase() > li[i + 1].innerHTML.toLowerCase()) {
            /*if next item is alphabetically
            lower than current item, mark as a switch
            and break the loop:*/
            shouldSwitch = true;
            break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark the switch as done:*/
            li[i].parentNode.insertBefore(li[i + 1], li[i]);
            switching = true;
            }
        }
    }
}

//add task. saving to localstorage
function addTask(e){
    const li = document.createElement('li');    
    li.className = 'collection-item';

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.setAttribute('href','#');

    const i = document.createElement('i');
    i.className = 'fa fa-remove';

    link.appendChild(i);
    if(taskInput.value.length !== 0){
        li.appendChild(document.createTextNode(taskInput.value));
        li.appendChild(link);
        document.querySelector('ul.collection').appendChild(li);

        storeToLocalStorage(taskInput.value);
        
    }else{
        alert('Fill the input please');
    }
   
    taskInput.value = '';
    e.preventDefault();
}

function storeToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks =  JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//delete task
function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        
    }
}

function removeTaskFromLocalStorage(task){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((element,index) => {
    if(element === task.textContent){
        tasks.splice(index,1);
    }});
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//clear tasks
function clearTasks(e){
    // list.remove();
    while(list.firstChild){
        // list.firstChild.remove();
        list.removeChild(list.firstChild);
    }
}

//filter tasks with keyup event
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task)=>{
        const item = task.textContent;
        if(item.toLocaleLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}




















