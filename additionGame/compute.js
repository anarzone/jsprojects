class Addition {
    constructor(){
        this.num1 = document.getElementById('num1')
        this.num2 = document.getElementById('num2')
        this.counterDisplay = document.querySelector('.counter')
        this.pointDisplay = document.getElementById('points')
        this.counter = 3
        this.endGame = false
        this.points = 0;
    }

    getRandom(){
        return Math.ceil(Math.random()*10);
    }

    display(){
        this.num1.textContent = this.getRandom();
        this.num2.textContent = this.getRandom();
        this.counterDisplay.textContent = this.counter;
        document.querySelector('.text-danger').innerHTML = ''
        this.pointDisplay.textContent = this.points
    }
    compute(){
        if(!this.endGame){
            document.getElementById('answer').addEventListener('keypress',(e)=>{
                if(e.keyCode === 13){
                    if(/^[0-9]+$/.test(e.target.value)){
                        if((parseInt(this.num1.textContent) + parseInt(this.num2.textContent)) === parseInt(e.target.value)){
                            this.points += parseInt(this.num1.textContent) + parseInt(this.num2.textContent)
                            console.log(12)
                            this.display()
                        }else{
                            if(this.counter === 0){
                                this.endGame = true
                            }else{
                                this.counter--;
                                this.display()
                            }
                        }
                    }else{
                        document.querySelector('.text-danger').innerHTML = 'Please enter number'
                    }
                    
                 e.target.value = ''   
                }
            })
        }
        
    }
    test(n1,n2){
        if((n1+n2)===8){
            console.log(12)
        }else{
            console.log('wrong')
        }
    }
}