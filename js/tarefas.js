let inputNewTask = document.querySelector('#inputNewTask');
let btnAddtask = document.querySelector('#btnAddTask');
let listTask = document.querySelector('#listTask');
let EditWindow = document.querySelector('#EditWindow');
let EditWindowBackground = document.querySelector('#EditWindowBackground');
let EditWindowBtnClose = document.querySelector('#EditWindowBtnClose');
let btnUpdateTask = document.querySelector('#btnUpdateTask');
let idEditTask = document.querySelector('#idEditTask');
let inputTaskNameEdit = document.querySelector('#inputTaskNameEdit');

inputNewTask.addEventListener('keypress', (e) => {

    if (e.keyCode == 13) {
        let task = {
            nome: inputNewTask.value,
            id: gerarId(),

        }
        addTask(task);
    }

});

EditWindowBtnClose.addEventListener('click', (e) => {
    toggleEditWindow();
});

btnAddTask.addEventListener('click', (e) => {
    let task = {
        nome: inputNewTask.value,
        id: gerarId(),

    }
    addTask(task);
});

btnUpdateTask.addEventListener('click', (e) => {
    e.preventDefault();

    let idTask = idEditTask.innerHTML.replace('#', '');

    let task = {
        nome: inputTaskNameEdit.value,
        id: idTask
    }

    let TarefaAtual = document.getElementById('' + idTask + '');

    if (TarefaAtual) {
        let li = criarTagLI(task);
        listTask.replaceChild(li, TarefaAtual);
        toggleEditWindow();
    } else {
        alert('Elemento HTML não encontrado!');
    }

});

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function addTask(task) {
    let li = criarTagLI(task);
    listTask.appendChild(li);
    inputNewTask.value = '';
}

function criarTagLI(task) {
    let li = document.createElement('li');
    li.id = task.id;

    let span = document.createElement('span');
    span.classList.add('texttask');
    span.innerHTML = task.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAction');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar(' + task.id + ')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAction');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir(' + task.id + ')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;

}

function editar(idTask) {
    let li = document.getElementById('' + idTask + '');
    if (li) {
        if (li) {
            idEditTask.innerHTML = '#' + idTask;
            inputTaskNameEdit.value = li.innerText;
            toggleEditWindow();
        } else {
            alert('HTML element not found!')
        }
    }

}

function excluir(idTask) {
    let Confirmation = window.confirm('Are you sure you want to delete?');
    if (Confirmation) {
        let li = document.getElementById('' + idTask + '');
        if (li) {
            listTask.removeChild(li);
        } else {
            alert('HTML element not found!')
        }
    }
}

function toggleEditWindow() {
    EditWindow.classList.toggle('abrir');
    EditWindowBackground.classList.toggle('abrir');

}