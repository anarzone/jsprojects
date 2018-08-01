let getSavedContacts = ()=>{
    if(localStorage.getItem('contacts') === null){
        return [];
    }else{
        return JSON.parse(localStorage.getItem('contacts'));
    }
}

const saveContacts = (contacts)=>{
    localStorage.setItem('contacts',JSON.stringify(contacts));
}

const removeContact = (id)=>{
    let contactIndex = contacts.findIndex((contact)=>{
            return id === contact.id;
    })
    if(contactIndex > -1){
        contacts.splice(contactIndex,1);
    }
}

const renderContacts = (contacts,filters)=>{
    let filteredContacts = contacts.filter((contact)=>{
      return contact.name.toLowerCase().includes(filters.searchText)
    })

    document.querySelector('.collection').innerHTML = '';
    //creating elements
    filteredContacts.forEach(contact => {
        const contactWrapper = document.createElement('li');
        contactWrapper.className = 'collection-item avatar';
        contactWrapper.innerHTML = `
            <i class="material-icons circle">account_circle</i>
            <span id="nameLi" class="title">${contact.name}</span>
            <p id="phoneLi">${contact.phone}</p>
            <p id="emailLi">${contact.email}</p>
        `;
        //<a href='index.html#${contact.id}' class="secondary-content"><i class="material-icons">edit</i></a>
        const editLink = document.createElement('a');
        editLink.setAttribute('href',`edit-contact.html#${contact.id}`);
        editLink.classList.add('secondary-content');
        editLink.innerHTML = `<i class="material-icons">edit</i>`;
        contactWrapper.appendChild(editLink);


        saveContacts(contacts);
        document.querySelector('.collection').appendChild(contactWrapper);
    });
}

const generateLastEdited = (timestamp)=>{
    return `Last edited ${moment(timestamp).fromNow()}`;
}

const validateForm = (contact)=>{
    if (contact.name.length === 0 && isNaN(contact.phone)) {
        return true;
    }
}

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}









