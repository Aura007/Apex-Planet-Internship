const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');


function loadNotes() {
  const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  notesList.innerHTML = '';
  storedNotes.forEach((note, index) => {
    addNoteToDOM(note.title, note.content, index);
  });
}


function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}


function addNoteToDOM(title, content, index) {
  const li = document.createElement('li');
  li.classList.add('note-item');
  li.setAttribute('data-index', index);

  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  const contentEl = document.createElement('p');
  contentEl.textContent = content;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    notes.splice(index, 1);
    saveNotes(notes);
    loadNotes();
  });

  li.appendChild(titleEl);
  li.appendChild(contentEl);
  li.appendChild(deleteBtn);

  notesList.appendChild(li);
}

// Store notes in array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Initial load
loadNotes();

// Handle form submission
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (title === '' || content === '') return;

  notes.push({title, content});
  saveNotes(notes);
  loadNotes();

  noteTitle.value = '';
  noteContent.value = '';
  noteTitle.focus();
});
