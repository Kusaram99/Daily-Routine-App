// DOM-----------------------------------
const total_notes = document.querySelector("#total_notes");
const title_text = document.querySelector("#title_text");
const textarea = document.querySelector("#textarea");
const notes_parent_dom = document.querySelector(".todo-list");
const updateForm = document.querySelector(".todo_update_container");
const title_text_update = document.querySelector(".title_text_update");
const textarea_update = document.querySelector(".textarea_update");
const navbar = document.querySelector(".navbar");
const article_container = document.querySelector(".article_container");
const article_title = document.querySelector(".article_title");
const article_content = document.querySelector(".article_content");

let all_data = JSON.parse(localStorage.getItem('notes')) || [];
// call to the renderNotes() to render preveis notes
renderNotes();

// if user don't have any notes then show message
if (!all_data.length) {
    total_notes.innerText = " " + ' 0';
}

// add new notes
function addNotes() {
    // get values from form
    const title = title_text.value;
    const description = textarea.value;
    let timestamp = Date.now();
    // validation (remove extra spacess)
    if (!title.trim()) {
        alert("Please enter a title name");
    } else {
        // creating a object for the note
        let note = {
            id: timestamp,
            title: title,
            description: description,
            timestamp: formatTimestamp(timestamp)
        };
        renderNotes(note);
        note = "";
    };
}

// Function to format timestamp to a readable date
function formatTimestamp(timestamp) {
    // Create a new Date object using the provided timestamp
    let currentDate = new Date(timestamp);
    // Return the date portion of the date object in a human-readable format
    return currentDate.toDateString();
}

// render notes
function renderNotes(notes) {
    // push new note to the array if notes passed
    if (notes) {
        all_data.push(notes);
    }
    // storing notes to localStorage
    localStorage.setItem('notes', JSON.stringify(all_data));

    // to store html generated 
    let html = '';
    // adding new note to the DOM
    console.log(all_data);
    all_data.forEach((elem, index) => {
        console.log(elem + " :-" + index);
        html += `
        <div class="list-container">

                <h3 class="l-h3"> ${index + 1}) 
                    <span class="num">${elem.title.length > 28 ? elem.title.slice(0, 28) + '...' : elem.title}</span>
                </h3>
                <p class="l-p">${elem.description.length > 570 ? elem.description.slice(0, 470) + "..." : elem.description}
                    <span class="read_more_btn" onclick="readMore(${elem.id})">
                        ${elem.description.length > 570 ? "Read more" : ""}
                    </span>
                </p>
                <div class="time-container">
                    <span class="date_text">Date: </span><span class="current_date">${elem.timestamp}</span>
                </div>
                <div>
                    <button class="btn" onclick="deleteNote(${elem.id})">Delete</button>
                    <button class="btn" onclick="editNoteBtn(${elem.id})">Edit</button>
                </div>
            </div>
        `;
    });
    // adding all notes to the DOM
    notes_parent_dom.innerHTML = html;
    html = "";
    // if user don't have any notes then show message
    if (!all_data.length) {
        total_notes.innerText = ' 0';
    } else {
        total_notes.innerText =   `- ${all_data.length}`;
    }
    // set empty to the title and description
    title_text.value = '';
    textarea.value = 'Write here...';
}


// delete notes handler
function deleteNote(id) {
    console.log(id);
    // filter out note with matching id
    all_data = all_data.filter(note => note.id !== id);
    // calling to the renderNotes() to re-render notes
    renderNotes();
}

// edit notes handler-----------
// create a note id handler variable
let noteId;
function editNoteBtn(id) {
    // display update note form 
    // get note object by id
    let note = all_data.find(n => n.id == id);
    // set existing values to form
    title_text_update.value = note.title;
    textarea_update.value = note.description;
    // set current note id
    noteId = id;
    // pass note object to update function
    updateForm.classList.add("update_form_show");
    updateForm.classList.remove("update_form_hide");
}

// form update handler  
function updateDataBtn() {
    // if noteid not passed then return
    if (!noteId) {
        return;
    } else {
        // get updated values
        const updatedTitle = title_text_update.value;
        const updatedDescription = textarea_update.value;
        // replace note object with updated values
        all_data = all_data.map(note => {
            if (note.id === noteId) {
                note.title = updatedTitle;
                note.description = updatedDescription;
                return note;
            }
            return note;
        });
        // hide update form after updating notes
        updateForm.classList.add("update_form_hide");
        updateForm.classList.remove("update_form_show");
        // call to the renderNotes() to re-render notes
        renderNotes();
        // add bg color to navbar to show update successfully
        navbar.style.background = 'green';
        // and set initial color after the update
        setTimeout(() => {
            navbar.style.background = 'var(--primary-color)';
        }, 1000)
    }
}

// cancel form updation
function cancelUpdateBtn(e) {
    console.log("cancelUpdate");
    // if user click to the cancel button then hide update form 
    updateForm.classList.add("update_form_hide");
    updateForm.classList.remove("update_form_show");
}

// read notes handler
function readMore(id) {
    console.log(article_container)
    // get note object by id
    console.log(id)
    let note = all_data.find(n => n.id == id);

    // display note content
    article_title.innerText = note.title;
    article_content.innerText = note.description;
    // display article container
    console.log(note);
    article_container.classList.remove("article_hide");
    article_container.classList.add("article_show");
}

// close reading notes
function closeContent() {
    article_container.classList.add("article_hide");
    article_container.classList.remove("article_show");
}
// ----------------------------------------- 
