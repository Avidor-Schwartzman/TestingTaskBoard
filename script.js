document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('createButton');
    const deleteButton = document.getElementById('deleteButton');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const sortButton = document.getElementById('sortButton'); 
    const noteText = document.getElementById('noteText');
    const noteDate = document.getElementById('noteDate');
    const noteTime = document.getElementById('noteTime');
    const notesContainer = document.getElementById('notesContainer');
  
    // Load saved notes from localStorage
    loadNotes();
  
    createButton.addEventListener('click', () => {
      const text = noteText.value.trim();
      const date = noteDate.value;
      const time = noteTime.value;
  
      if (text && date && time) {
        createNote(text, date, time);
        noteText.value = '';
        noteDate.value = '';
        noteTime.value = '';
  
        // Save notes to localStorage
        saveNotes();
      } else {
        alert('Please fill in all fields before creating a note.');
      }
    });
  
    deleteButton.addEventListener('click', () => {
      if (notesContainer.children.length > 0) {
        notesContainer.removeChild(notesContainer.lastChild);
        // Save notes to localStorage
        saveNotes();
      } else {
        alert('No tasks to delete.');
      }
    });
  
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const notes = notesContainer.children;
  
      for (const note of notes) {
        const noteContent = note.querySelector('div');
        const paragraphs = noteContent.querySelectorAll('p');
        const text = paragraphs[0].textContent.toLowerCase();
  
        if (text.includes(searchTerm)) {
          note.style.display = 'block';
        } else {
          note.style.display = 'none';
        }
      }
    });
  
    sortButton.addEventListener('click', () => { // Add this event listener
      const notesArray = Array.from(notesContainer.children);
  
      notesArray.sort((a, b) => {
        const aText = a.querySelector('div > p').textContent.toLowerCase();
        const bText = b.querySelector('div > p').textContent.toLowerCase();
  
        if (aText < bText) {
          return -1;
        }
        if (aText > bText) {
          return 1;
        }
        return 0;
      });
  
      // Clear notesContainer and append sorted notes
      notesContainer.innerHTML = '';
      notesArray.forEach(note => notesContainer.appendChild(note));
    });
  
    // function createNote(text, date, time) {
    //   const note = document.createElement('div');
    //   note.classList.add('note');
  
    //   const noteContent = document.createElement('div');
    //   noteContent.innerHTML = `
    //     <p>${text}</p>
    //     <p>Date: ${date}</p>
    //     <p>Time: ${time}</p>
    //   `;
    //   note.appendChild(noteContent);
  
    //   notesContainer.appendChild(note);
    // }
    function createNote(text, date, time) {
        const note = document.createElement('div');
        note.classList.add('note');
      
        const noteContent = document.createElement('div');
        noteContent.innerHTML = `
          <p>${text}</p>
          <p>Date: ${date}</p>
          <p>Time: ${time}</p>
        `;
        note.appendChild(noteContent);
      
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', () => {
          notesContainer.removeChild(note);
          saveNotes();
        });
        note.appendChild(deleteButton);
      
        notesContainer.appendChild(note);
      }
  
    function saveNotes() {
      const notes = Array.from(notesContainer.children).map(note => {
        const noteContent = note.querySelector('div');
        const paragraphs = noteContent.querySelectorAll('p');
        return {
          text: paragraphs[0].textContent,
          date: paragraphs[1].textContent.replace('Date: ', ''),
          time: paragraphs[2].textContent.replace('Time: ', '')
        };
      });
  
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function loadNotes() {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        const notes = JSON.parse(savedNotes)
        notes.forEach(note => createNote(note.text, note.date, note.time));
      }
    }
  });
  
  