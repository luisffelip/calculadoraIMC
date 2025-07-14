document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById('myForm');
    // O ideal era pegar todas as coisas do getElement aqui por fora pra conseguir usar depois (Sem precisar chamar função).

    form.addEventListener("submit", function(e){
        e.preventDefault();
        resetarMsg();   
        if (!validarCampos()){
        } else {
            result();
            calcularIMC();
            categoria();
            alerta();
        }

        // Mais pra baixo eu fiz uma forma de imprimir um objeto chave valor com as informações. Mas, poderia ser feito assim:
        // document.getElementByID('categoria').value = categoria;
        // let dados = new FormData(form);
        
        //for (let [chave,valor] of dados.entries())
        // console.log(chave + ':' + valor); 
    })

    function validarCampos(){
        let camposObrigatorios = document.querySelectorAll('.nome');
        let camposValidos = true;

        for (let i = 0; camposObrigatorios.length > i; i++){
            let campo = camposObrigatorios[i];

            if (campo.value === ''|| campo.value === null){
                showError(campo, 'Por favor, insira seu nome.');
                camposValidos = false;
            }
        }
        return camposValidos
    }

    function showError(element, msg){
        // element: representa o elemento do DOM, como um campo de entrada, e a mensagem será escrita como uma string quando a função for chamada.
        let errorMessage = element.parentElement.querySelector('.error-message');
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
    }

    function resetarMsg (){
        let errorMessages = document.querySelector('.error-message');

        errorMessages.textContent = '';
        errorMessages.style.display = 'none';
    }

    let imc;

    function calcularIMC(){
        let altura = document.querySelector('.height').value;
        let peso = document.querySelector('.weight').value;

        if (altura && peso){
            imc = peso/(altura**2).toFixed(2);
            console.log('IMC: ' + imc.toFixed(2));
            return imc
        }
    }

    function categoria(){
        if (imc < 16.9) {
            console.log('Categoria: Muito abaixo do peso.');
        } else if (imc >= 17 && imc <= 18.4) {
            console.log('Categoria: Abaixo do peso.');
        } else if (imc >= 18.5 && imc <= 24.9) {
            console.log('Categoria: Peso normal.');
        } else if (imc >= 25 && imc <= 29.9) {
            console.log('Categoria: Sobrepeso.');
        } else if (imc >= 30 && imc <= 34.9) {
            console.log('Categoria: Obesidade Grau I.');
        } else if (imc >= 35 && imc <= 40) {
            console.log('Categoria: Obesidade Grau II.');
        } else {
            console.log('Categoria: Obesidade Grau III.');
        }
    }

    
    function result(){
        let nome = document.querySelector('.nome').value;
        let altura = document.querySelector('.height').value;
        let peso = document.querySelector('.weight').value;
        let obj = {
            nome: nome,
            altura: altura,
            peso: peso
        };

        for (info in obj){
            console.log(`${info}: ${obj[info]}`);
        }
    }

    
    function alerta(){
        let nome = document.querySelector('.nome').value;
        let box = document.getElementById('result')
        
        if (imc < 16.9){
            // box.textContent = `${nome}, seu IMC é ${imc.toFixed(2)}.`
            box.style.backgroundColor = 'red';
            box.textContent = nome + ', ' + 'seu IMC é ' + imc.toFixed(2) + '.\nVocê está na categoria: Muito abaixo do peso.' ;
            // box.textContent = 'Você está na categoria: Muito abaixo do peso.'
        } else if (imc >= 17 && imc <= 18.4){
            box.textContent = nome + ', ' + 'seu IMC é ' + imc.toFixed(2) + '.\nVocê está na categoria: Abaixo do peso.' ;
            box.style.backgroundColor = 'orange';
        }else if (imc >= 18.5 && imc <= 24.9){
            box.textContent = nome + ', ' + 'seu IMC é ' + imc.toFixed(2) + '.\nVocê está na categoria: Peso normal.' ;
            box.style.backgroundColor = 'green';
            // box.textContent = 'Você está na categoria: Peso normal.'
        }else if (imc >= 25 && imc <= 29.9){
            box.style.backgroundColor = 'yellow';
            box.textContent = nome + ', ' + 'seu IMC é ' + imc.toFixed(2) + '.\nVocê está na categoria: Sobrepeso.' ;
        } else if (imc >= 30 && imc <= 34.9){
            box.style.backgroundColor = 'darkorange';
            box.textContent = nome + ', ' + 'seu IMC é ' + imc.toFixed(2) + '.\nVocê está na categoria: Obesidade Grau I.';
        } else if (imc >= 35 && imc <= 40){
            box.style.backgroundColor = 'brown';
            box.textContent = nome + ', ' + 'seu IMC é ' + imc.toFixed(2) + '.\nVocê está na categoria: Obesidade Grau II.';
        }else {
            box.style.backgroundColor = 'darkred';
            box.textContent = nome + ', ' + 'seu IMC é ' + imc.toFixed(2) + '.\nVocê está na categoria: Obesidade Grau III.';
        }
    }

})