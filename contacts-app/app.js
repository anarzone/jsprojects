//Contact class
class Contact{
    constructor(name,phone,email){
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}
class ContactUI{
    addContact(contact){
        //creating elements
        const contactWrapper = document.createElement('li');
        contactWrapper.className = 'collection-item avatar';
        contactWrapper.innerHTML = `
            <i class="material-icons circle">account_circle</i>
            <span id="nameLi" class="title">${contact.name}</span>
            <p id="phoneLi">${contact.phone}</p>
            <p id="emailLi">${contact.email}</p>
            <a href="#!" class="secondary-content"><i class="material-icons">edit</i></a>
        `;
        document.querySelector('.collection').appendChild(contactWrapper);
        console.log('hello');
    }
    clearFields(){
        document.querySelector('.name').value = '',
        document.querySelector('.phone').value = '',
        document.querySelector('.email').value = '';
    }
}

//Store to localStorage
class Store{
    static getContacts(){
        let contacts;
        if(localStorage.getItem('contacts')=== null){
            contacts = [];
        }else{
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    }
    static addContact(contact){
        let contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('contacts',JSON.stringify(contacts));
    }
}

//Event Listeners
document.querySelector('.collection').addEventListener('click',function(e){
    if(e.target.parentElement.classList.contains('secondary-content')){
        const name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
              phone = e.target.parentElement.previousElementSibling.previousElementSibling.textContent,
              email = e.target.parentElement.previousElementSibling.textContent;

        document.querySelector('.name').value = name,
        document.querySelector('.phone').value = phone,
        document.querySelector('.email').value = email;
        document.querySelector('#addContact').textContent = 'Edit';

        console.log(name,phone,email);
    }

    e.preventDefault();
})

document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('.collection');
    let contacts = Store.getContacts();
    contacts.forEach(contact => {
        const ui = new ContactUI();
        ui.addContact(contact);
    });
})

document.getElementById('contactForm').addEventListener('submit',function(e){
    const name = document.querySelector('.name').value,
          phone = document.querySelector('.phone').value,
          email = document.querySelector('.email').value;
    
    if(name === '' || phone === '' || email === ''){
        alert('All fields must be filled');
    }else{
        const contactList = document.querySelectorAll('.collection-item');
        const contact = new Contact(name,phone,email);
        const ui = new ContactUI();

        ui.addContact(contact);
        Store.addContact(contact);
        console.log(contactList[1]);
        ui.clearFields();
    }      
    

    e.preventDefault();
});






