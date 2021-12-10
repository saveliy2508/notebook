const textarea = document.querySelector('.textarea')
const newNotesWrapper = document.querySelector('.notes-list')
let timeNow = document.querySelector('.note__date')
const check = document.querySelector('.check')

let buttonHelp = document.querySelector('.note__button')
function pressButtonHelp() {
    if (buttonHelp.classList.contains('help-button-active')) {
        buttonHelp.classList.remove('help-button-active')
        textarea.classList.remove('help-button-active-textarea')
        textarea.innerHTML = ''
        textarea.value = textarea.innerHTML
        check.classList.remove('hide-visibl')
        textarea.removeAttribute('readonly')
    } else {
        buttonHelp.classList.add('help-button-active')
        textarea.classList.add('help-button-active-textarea')
        textarea.innerHTML = `
    - Write a new note in textarea and click on check icon.
    - You can delete note, if you click on delete icon.
    - If you click on pencill, you will can correct the note.
    - All notes safe on you browser storage. 
    - To keep your data safe, do not clear your cookies.
    `
        textarea.value = textarea.innerHTML
        check.classList.toggle('hide-visibl')
        textarea.setAttribute('readonly', true)
    }
}
buttonHelp.addEventListener('click', pressButtonHelp)


// функция времени в форме
function timer() {
    let nowDate = new Date;
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth();
    let day = nowDate.getDate();
    let hours = nowDate.getHours();
    let minutes = nowDate.getMinutes();
    let today = `${day}/${month}/${year}, ${hours}:${minutes}`
    timeNow.innerHTML = today;
    return (today)
}
// время в форме
timer()
setInterval(() => {
    timer()
}, 1000);

function createNote() {
    //добавление заметки
    //больше 0 символов выдает ошибку
    if (textarea.value.length > 0) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('new-note')
        const timeDiv = document.createElement('div')
        const areaDiv = document.createElement('textarea')
        areaDiv.classList.add('new-note__textarea')
        areaDiv.setAttribute('readonly', true)
        newDiv.append(timeDiv)
        newDiv.append(areaDiv)
        areaDiv.innerHTML = textarea.value
        newNotesWrapper.prepend(newDiv)
        timeDiv.innerHTML = timeNow.innerHTML
        textarea.value = ''

        const messageCorrect = document.createElement('div')
        messageCorrect.classList.add('change-message')
        newDiv.append(messageCorrect)
        //удаление заметки

        let deleteItem = document.createElement('img')
        deleteItem.setAttribute('src', 'img/delete.png')
        deleteItem.classList.add('delete-item')
        timeDiv.append(deleteItem)

        deleteItem.addEventListener('click', deleteNote)

        let correctItem = document.createElement('img')
        correctItem.setAttribute('src', 'img/pancil.jpg')
        correctItem.classList.add('correct-item')
        timeDiv.append(correctItem)

        correctItem.addEventListener('click', correctNote)

        textarea.setAttribute('placeholder', 'Write a new note...')
        textarea.classList.remove('error')
    } else {
        // Если меньше одного символа
        textarea.setAttribute('placeholder', 'You need to write something for create a new note!')
        textarea.classList.add('error')
    }
}

function deleteNote(event) {
    let targ = event.target;
    let x = targ.closest('.new-note')
    x.remove()
}

function correctNote(event) {
    let targ = event.target;
    let x = targ.closest('.new-note')
    let y = x.querySelector('.new-note__textarea')
    if (y.hasAttribute('readonly')) {
        y.removeAttribute('readonly')
    } else {
        y.setAttribute('readonly', true)
    }
    targ.classList.toggle('active-pancil')
    if (y.innerHTML != y.value) {
        y.innerHTML = y.value
        let messArea = document.querySelector('.change-message')
        messArea.innerHTML = `Последние изменения были внесены в ${timer()}`
    }
}


check.addEventListener('click', createNote)


function saveLocalStorage() {
    localStorage.setItem('note', newNotesWrapper.innerHTML);
}
window.addEventListener('beforeunload', saveLocalStorage)

function loadNotes() {
    let data = localStorage.getItem('note')
    if (data) {
        newNotesWrapper.innerHTML = data;
    }

    const deleteButtons = document.querySelectorAll('.delete-item')
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', deleteNote)
    }

    const correctButtons = document.querySelectorAll('.correct-item')
    for (let i = 0; i < correctButtons.length; i++) {
        correctButtons[i].addEventListener('click', correctNote)
    }
}

loadNotes()