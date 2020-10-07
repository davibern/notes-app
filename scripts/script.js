// Variables
const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));

addBtn.addEventListener('click', () => {
    addNewNote();
});

if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;
    
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    // En este evento mostramos la caja de texto cuando se pulsa en editar, le añadimos la clase hidden (css)
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    // En este evento aplicamos markdown con el evento input sobre el textarea
    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        // Actualizar los datos en el localStorage
        updateLocalStorage();
    });

    // En este evento se borra la nota creada
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLocalStorage();
    });

    // Se añade la nota a la página
    document.body.appendChild(note);
}

// Grabar los datos
function updateLocalStorage() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
