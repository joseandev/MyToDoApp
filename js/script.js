const btnAdd = document.getElementById('add');
const input = document.getElementById('input');
const ul = document.querySelector('ul');
const empty = document.querySelector(".empty");
const areaInsert = document.querySelector('.insert');

const btnSave = document.createElement('BUTTON');
btnSave.textContent = 'Save';
btnSave.classList.add('save');
btnSave.style.display = 'none';
areaInsert.appendChild(btnSave);

let liEditing;
var paragraph;

btnAdd.addEventListener('click', (e) => {
    let tarea = '   ' + input.value;
    createToDoStructure(tarea.trim());
})

const createToDoStructure = (text) => {
    if (text !== "") {
        let li = document.createElement('LI');
        let p = document.createElement('P');
        let span = document.createElement('SPAN');
        let editBtn = document.createElement('BUTTON');
        
        let check = crearCheck();
        deleteBtn = createDeleteButton();
        editBtn = createEditButton();

        span.textContent = '  ' + text;
        p.classList.add('text-item');

        p.appendChild(check);
        p.appendChild(span);

        li.appendChild(p);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        addToDo(li);

        input.value = "";
        empty.style.display = "none";
    }
}

const addToDo = (li) => {
    const documentFragment = new DocumentFragment();
    documentFragment.appendChild(li);

    for (let i = 0; i < ul.childElementCount;) {
        documentFragment.appendChild(ul.removeChild(ul.children[i]))
    }
    ul.appendChild(documentFragment);
}

const createEditButton = () => {

    let editBtn = document.createElement('BUTTON');
    editBtn.classList.add('editBtn');
    editBtn.textContent = 'E';

    editBtn.addEventListener('click', (e) => {
        let li = e.target.parentElement;
        let p = li.firstChild;
        let check = p.firstChild;

        if (check.checked == false) {
            paragraph = editBtn.previousElementSibling;
            input.value = paragraph.textContent.trim();
            li.style.opacity = '.9';
            btnSave.style.display = 'inline-block';
            btnAdd.style.display = 'none';

            liEditing = li;
            disabled(true);
        }
    })

    input.addEventListener('keyup', () => {
        try {
            paragraph.children[1].textContent = '   ';
            paragraph.children[1].textContent += input.value;
        } catch (e) {

        }
    })
    
    return editBtn;
}

const createDeleteButton = () => {
    let deleteBtn = document.createElement('BUTTON');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'X';

    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
            empty.style.display = "block";
        }
    })
    return deleteBtn;
}

btnSave.addEventListener('click', () => {
    if(input.value !== ''){
        liEditing.style.opacity = '1';
        input.value = '';
    
        disabled(false);
    
        paragraph = '';
    
        btnSave.style.display = 'none';
        btnAdd.style.display = 'inline-block';
    }
})

const crearCheck = () => {

    let check = document.createElement('INPUT');
    check.type = 'checkbox';
    check.classList.add('check')

    check.addEventListener('click', (e) => {
        if (check.checked) {
            let span = check.nextElementSibling;
            span.style.textDecoration = 'line-through';
            let p = e.target.parentElement;
            p.style.backgroundColor = 'cyan'
            let li = p.parentElement;
            let ul = li.parentElement;
            ul.removeChild(li)
            ul.appendChild(li)
        } else {
            let span = check.nextElementSibling;
            span.style.textDecoration = 'none';
            let p = e.target.parentElement;
            p.style.backgroundColor = 'rgb(76, 155, 129)'
            notCheckInput(e);
        }
    })
    return check;
}

const notCheckInput = (e) => {
    let p_contenedor = e.target.parentElement;
    let li = p_contenedor.parentElement;

    const documentFragment = new DocumentFragment();
    documentFragment.appendChild(li);

    for (let i = 0; i < ul.childElementCount;) {
        documentFragment.appendChild(ul.removeChild(ul.children[i]))
    }
    ul.appendChild(documentFragment);
}

/* Habilitar y desabilitar checkboxs, botones para editar y botones de eliminar */
const disabled = (param) => {
    let edits = document.querySelectorAll('.editBtn')
    let deletes = document.querySelectorAll('.deleteBtn')
    let inputs = document.querySelectorAll('.check')

    if (param) {
        for (let i = 0; i < edits.length; i++) {
            edits[i].disabled = 'true';
            deletes[i].disabled = 'true';
            inputs[i].disabled = 'true';
        }
    } else {
        for (let i = 0; i < edits.length; i++) {
            edits[i].removeAttribute('disabled');
            deletes[i].removeAttribute('disabled');
            inputs[i].removeAttribute('disabled');
        }
    }
}

