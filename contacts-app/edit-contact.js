let contactName = document.querySelector('.name'),
    contactPhone = document.querySelector('.phone'),
    contactEmail = document.querySelector('.email'),
    editedAt = document.getElementById('edited');

const contactId = location.hash.substring(1);
let contacts = getSavedContacts();
let contact = contacts.find((contact)=>{
    return contact.id === contactId;
})

if(contact === undefined){
    location.assign('index.html')
}

contactName.value = contact.name;
contactPhone.value = contact.phone;
contactEmail.value = contact.email;


//submit contact
// if(!validateForm(contact) || !validateEmail(contact)){
//     console.log('All fields must be filled');
// }
document.getElementById('saveContact').addEventListener('click',(e)=>{
    contact.name = contactName.value;
    contact.phone = contactPhone.value;
    contact.email = contactEmail.value;
    saveContacts(contacts);
})

document.getElementById('cancel').addEventListener('click',()=>{
    location.assign('index.html');
})

document.getElementById('removeContact').addEventListener('click',()=>{
    removeContact(contact.id);
    saveContacts(contacts);
    location.assign('index.html');
})

document.getElementById('mainPage').addEventListener('click',()=>{
    location.assign('index.html');
})







