'use strict'

let todos = getSavedTodos();
 
let filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos,filters);

document.getElementById('filterId').addEventListener('input',(e)=>{
    filters.searchText = e.target.value.toLowerCase();
    renderTodos(todos,filters);
})    

document.getElementById('inputForm').addEventListener('submit',(e)=>{
    const todoTitle = e.target.elements.newTodo.value;
    todos.push({
        id: uuidv4(),
        title: todoTitle,
        completed: false
    });
    e.target.elements.newTodo.value = '';
    saveTodos(todos);
    renderTodos(todos,filters);
    e.preventDefault();
})

document.getElementById('hideCompleted').addEventListener('change',(e)=>{
    console.log(e.target.checked);
    filters.hideCompleted = e.target.checked;
    renderTodos(todos,filters);
})














