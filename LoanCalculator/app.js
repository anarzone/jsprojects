const laonAmount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const form = document.querySelector('form');
const results = document.getElementById('results');
const loader = document.getElementById('loader');


form.addEventListener('submit',calcualteResults);
document.addEventListener('DOMContentLoaded',()=>{
    results.style.display = 'none';
    loader.style.display = 'none';
})
function calcualteResults(e){
    const principal = parseFloat(laonAmount.value);
    const calculatedInterest = parseFloat(interest.value)/12/100;
    const numberOfPeriods = parseFloat(years.value)*12;

    const a = Math.pow(1 + calculatedInterest,numberOfPeriods);
    const b = a-1;
    const monthly = (calculatedInterest*principal*a/b);
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (numberOfPeriods * monthly).toFixed(2);
        totalInterest.value = ((monthly * numberOfPeriods)-principal).toFixed(2);
        
        loader.style.display = 'block';
        results.style.display = 'none';

        setTimeout(displayResults,2000);
    }else{
        console.log('hello');
        showError('Please check the fields');

    }
    
    e.preventDefault();
}

function showError(errorMessage){
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(errorMessage));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.card-title');

    card.insertBefore(errorDiv,heading);
    setTimeout(()=>{
        errorDiv.remove();
    },2000)
}

function displayResults(){
    loader.style.display = 'none';
    results.style.display = 'block';
}













