const userInputEl = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const listContainer = document.getElementById('list-container');


//global variables
let tasks = [];
let isEditing = false;
let editItem;

//functions
const addTask = (task) => {
    const {id,title} = task;
    //creating input list
    const taskListItem = document.createElement('li');
    taskListItem.classList.add('task-item');
    taskListItem.innerHTML = `
    <span class = "task-item-title">${title}</span>

    <div class="task-item-actions">
    <button class="btn-edit-task" onclick = 'editTask(${id})'>
    Edit </button>
    <button class="btn-delete-task" onclick = 'deleteTask(${id})'>
    <i class="fa-regular fa-circle-xmark fa-lg"></i>
    </button>
    </div>
    `;


    //checked condition
    // const completeButton = document.createElement('button');
    //         completeButton.innerHTML = '<i class="fa-solid fa-check fa-lg" style="color: #927c9c;"></i>';
    //         completeButton.addEventListener('click', () => {
    //             userInputEl.classList.add('checked');
    //             console.log("checked");
    //             // completeButton.classList.toggle('checked');
    //         });


    //reading input
    listContainer.appendChild(taskListItem);
    // listContainer.appendChild(completeButton);
};

const updateDOM = (tasks)=>{
    listContainer.innerHTML = null;
    tasks.forEach((task) => {
        addTask(task);
    });
};

const editTask = (id)=>{
    isEditing = true;
    addBtn.innerText ="Edit";
    editItem = tasks.find((task =>{
        return task.id === id;
    }));
    userInputEl.value = editItem.title;
};

const deleteTask = (id) =>{
    tasks = tasks.filter((task) => {
        return task.id !== id;
    });
    updateDOM(tasks);
};

//event listeners
addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const taskTitle = userInputEl.value;
    if(taskTitle){
        if(isEditing){
            //replace new data with the existing data
            const updatedTasks = tasks.map((task)=>{
                if(task.id === editItem.id){
                    //edited text
                    return{id:editItem.id, title:taskTitle};
                }else{
                    return task;
                }
            });
            updateDOM(updatedTasks);
            //reset default
            isEditing = false;
            addBtn.innerText = "Add";
            editItem = null;

        }else{
            //adding
            const newTask = {
                id : Date.now(),
                title:taskTitle,
            }
            tasks.push(newTask);
            updateDOM(tasks);
            }
    // clear inputs
    userInputEl.value = '';
    }else{
        alert('Please Enter a Task');
    }
});

