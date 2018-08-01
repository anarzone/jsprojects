let contacts = getSavedContacts();

let filters = {
    searchText: '',
    searchNumber: '',
    searchEmail: ''
}

renderContacts(contacts,filters);

document.getElementById('filterContacts').addEventListener('input',(e)=>{
    filters.searchText = e.target.value;
    renderContacts(contacts,filters);
})

document.getElementById('editBtn').addEventListener('click',(e)=>{
    let timestamp = moment().valueOf();
    const id = uuidv4();
    contacts.push({
        id: id,
        name: '',
        phone: '',
        email: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })

    saveContacts(contacts);
    renderContacts(contacts,filters);
    location.assign(`edit-contact.html#${id}`);
    e.preventDefault();
})

window.addEventListener('storage',(e)=>{
    if(e.key === 'contacts'){
        contacts = JSON.parse(localStorage.getItem('contacts'));
        renderContacts(contacts,filters);
    }
})