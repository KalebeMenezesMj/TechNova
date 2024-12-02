const cep = document.querySelector('#cep');

const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade'); 
const estado = document.querySelector('#estado');

cep.addEventListener('focusout', async () => { 
    
        const limitar = /^[0-9]+$/;
        const cepValido = /^[0-9]{8}$/;

        if (!limitar.test(cep.value) || !cepValido.test(cep.value)) {
            throw new Error('CEP inválido');
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        

        const responseCep = await response.json();


        // Preenche os campos
        logradouro.value = responseCep.logradouro;
        bairro.value = responseCep.bairro;
        cidade.value = responseCep.localidade; 
        estado.value = responseCep.uf; 
 
});
