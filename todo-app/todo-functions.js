'use strict'

//get notes wrapper element 
const todosWrapper = document.querySelector('.todos');

//get saved todos from localStorage
const getSavedTodos = ()=>{
    try{
        return !localStorage.getItem('todos')? JSON.parse(localStorage.getItem('todos')) : []
    }catch(e){
        return [];
    }
}

//save todos to localStorage
const saveTodos = (todos)=>{
    localStorage.setItem('todos',JSON.stringify(todos));
}

//remove todo with id
const removeTodo = (id)=>{
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if(todoIndex > -1){
        todos.splice(todoIndex,1);
    }
}

const toggleTodo = (id)=>{
    const todoVal = todos.find(todo => todo.id === id)
    //if todoVal !== undefined
    if(todoVal){
        todoVal.completed = !todoVal.completed;
    }
    // todoVal.completed = !todoVal ? !todoVal.completed
}

//get DOM elements for individual note
const generateTodoDOM = (todo)=>{
    //setup todo div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');

    //setup checkbox 
    const checkboxNote = document.createElement('input');
    checkboxNote.setAttribute('type','checkbox');
    checkboxNote.checked = todo.completed;
    checkboxNote.classList.add('checkboxNote');
    todoDiv.appendChild(checkboxNote);
    checkboxNote.addEventListener('change',()=>{
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    })
    
    //setup text element
    const todoTitle = document.createElement('span');
    todoTitle.classList.add('todoTitle');

    //setup delete element
    const button = document.createElement('a');
    button.setAttribute('href','#');
    button.classList.add('deleteBtn');
    button.addEventListener('click',()=>{
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    })

    //append delete text to button and checkbox to note div
    button.appendChild(document.createTextNode('x'));
    if(todo.title.length > 0){
        todoTitle.innerHTML = todo.title;
    }else{
        todoTitle.textContent = 'Unnamed todo';
    }

    //append title and button to note div
    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(button);
    return todoDiv;
}

const generateSummeryDOM = (filteredtodos)=>{
    let inCompletedTodos = filteredtodos.filter(todo=>!todo.completed);
    document.getElementById('inCompleted').innerHTML = `You have ${inCompletedTodos.length} incompleted todos`;
}

//render todos
const renderTodos = (todos,filters)=>{
    let filteredtodos = todos.filter(todo=>{
        const searchMathTitle = todo.title.toLowerCase().includes(filters.searchText);
        const completedCheck = !filters.hideCompleted || !todo.completed;
        return searchMathTitle && completedCheck;
    })

    
    generateSummeryDOM(filteredtodos);
    todosWrapper.innerHTML = '';
    
    filteredtodos.forEach(todo => {
        const todoTitle = generateTodoDOM(todo);
        
        todosWrapper.appendChild(todoTitle);
    });
}

