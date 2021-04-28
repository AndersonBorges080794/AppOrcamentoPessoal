/* Abaixo criamos a nossa classe Despesa para receber e organizar os dados
outra coisa é que os parâmetros no nosso método constructor está vindo
da função cadastrarDespesas() e como já sabemos passamos esses parâmetros
para os atributos da classe Despesa.
*/
class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    /*Veja abaixo que criamos um método chamado de validarDados e dentro desse método
    tem um for(let i in this) que vai pecorrer o nosso objeto pois se observar o
    operador this está fazendo a referência para todos os nossos atributos da classe já
    dentro do nosso for temos uma condicional que vai fazer os testes com cada
    valor dos nossos atributos se vão ser undefined, vazio ou nulo e outra coisa
    interessante é que os colchetes serve tanto para pecorrer um array como para
    também pecorrer um objeto literal, classe ou funções construtoras.
    Para concluir esse trecho de código se algum campo não for preenchido nossa
    condicional vai dá um return false caso todos os campos seja preenchidos fora do
    for vai ter um return true dizendo que tudo foi preenchido corretamente. 
    */
    validarDados(){
        for(let i in this){
          
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}


/*Nessa classe Bd() vai ser a responsável de controlar toda a lógica de criação
e a inserção dos dados no nosso banco de dados que nesse caso será o localStorage.
*/
class Bd{

    /*Na construção do Objeto com o método construtor abaixo nós podemos verificar
    se a informação de um ID criado existe ou não.
    Caso não exista um ID criado em local Storage nós podemos fazer um teste com uma
    condicional if.
    Veja que se o id for igual idêntico a null ele executará uma inclusão de um ID
    junto com um valor único no nosso BD(localStorage).
    Nessa método construtor garante que será criado um Id dentro de local Storage.
    */
    constructor(){

        let id = localStorage.getItem('id')

        if(id === null){
           localStorage.setItem('id', 0) 
        }
    }
        
    
    
    /*Esse método abaixo vai verificar primeiro se já existe um id em local Storage.
    O getItem serve para recuperar um dado dentro do localStorage.
    No returno estamos aplicando uma conversão de string para int da variável
    proximoId e logo em seguida acrescentamos + 1 para os próximos id criados
    seja na ordem crescente.
    */
    getProximoId(){
        let proximoId = localStorage.getItem('id')

        return parseInt(proximoId) + 1

    }
    
           
    
    /*Abaixo estamos criando um método chamado gravar que ela vai receber um 
    parâmetro (d).
    Dentro do método vamos usar um mais novo recurso chamado de localStorage.setItem()
    essa propriedade serve para realizar a conversão de um objeto para uma anotação
    JASON(depois vamos saber mais sobre Jason) dentro do localStorage.setItem() vamos
    passar dois parâmetros um vai ser o objeto que nesse caso foi a variável id e o outro
    vai ser a propriedade JASON.stringify() e dentro dela vamos passar o parâmetro do
    método gravar que nesse caso foi (d).
    Quando for realizar a gravação dos dados no local storage do navegador vamos conseguir
    ver os dados digitados da nossa aplicação.
    O setItem serve para inserir um dado dentro de localStorage. 
    Estamos utilizando this.getProximoId() pois ele faz parte do proprio objeto
    em questão que nesse caso é Bd().
    Depois de recuperar o Id com é método this.getProximoId() vamos atribuir o
    valor para uma variável que nesse caso foi id.
    Abaixo desse processo de atribuição para a variável id vamos realizar uma
    atualização do proximo id pois toda vez que for criado um novo objeto ele
    terá um id único.
    */
    gravar(d){
        
       let id = this.getProximoId()

       localStorage.setItem(id, JSON.stringify(d))

       localStorage.setItem('id',id )
    }

        /*PAREI MINHA REVISÃO DO DIA 07/04/2021 AQUI----------------- */


    /*Esse método vai realizar a recuperação e organizar os dados
    de localStorage em um array.
    */
    recuperarTodosRegistros(){
       
        /*Aqui criamos um array para os dados recuperados no localStorage 
        seja inserido nesse array.
        */
        let despesas = Array()

        let id = localStorage.getItem('id')

        /*Aqui abaixo estamos usando um laço de repetição for para recuperar 
        todas as despesas cadastradas em localStorage
        */
        for(let i = 1; i <= id; i++){

            /*Aqui abaixo é a lógica de recuperação da despesa 
            E como a recuperção desses dados vem em uma notação
            JASON temos que realizar um JASON.parse() para converter
            esses dados para o formato de objeto literais.
            */
            let despesa = JSON.parse(localStorage.getItem(i))

            /*Aqui vamos verificar existe a possibilidade de haver índices que 
            foram pulados ou removidos nestes casos nós vamos usar uma condicional
            realizando uma comparação de igual idêntico de despesa com null e dentro
            dessa condicional iremos jogar o operador continue, caso essa condicional
            seja verdadeira simplesmente o laço vai continuar sem ir na operação de
            inserção push pois ele pulou esse índice null. 
            */
            if(despesa === null){
                continue
            }
            
            /*Aqui estamos recuperado a despesa e executar um tempo de
            execução no atributo id e associando esse atributo a variável i
            do trecho de codigo JSON.parse(localStorage.getItem(i)).
            Depois de feito isso teremos um atributo novo dentro do método 
            recuperarTodosRegistros().
            */
            despesa.id = i
            
            
            /*Aqui abaixo estamos inserindo informações em um array 
            como já sabemos bem esse push serve para isso.
            */
            despesas.push(despesa)            
       }
    
       /*Aqui estamos retornando o array com todos os dados recuperados.
       */
       return despesas
    
    }

    /*Aqui temos o método pesquisar() ele vai receber os dados da nossa função pesquisarDespesa()  
    e daqui ela realizar uma pesquisa no nosso banco de dados(localStorage).
    Veja que dentro do método pesquisar realizamos uma chamada de outro método que nesse caso foi
    o método recuperarTodosRegistros() e só para lembrar o this significa que estamos chamando o
    método de uma classe.
    E realizamos essa lógica pois assim enconomiza codigo e futuramente quando for fazer uma manutenção
    basta só mexer o método recuperarTodosRegistro().
    Observe também que criamos um array chamado despesasFiltradas e esse array vai receber o método
    recuperarTodosRegistros().
    */
    pesquisar(despesa){
        
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros() 
        
        /*Por questões de debug fizemos o console de despesasFiltradas e despesas.
        O array despesasFiltradas antes dos filtros.
        */
        console.log(despesasFiltradas) 
        console.log(despesa)
        
        /*Agora vamos realizar a lógica de filtro por ano.
        Fizemos uma condicional de despesa.ano é diferente de vazio e se for
        ele executará a lógica do filtro e se não for ele retornará tudo vazio.
        Outra coisa é que usamos uma função de callback e fizemos uma comparação
        de d.ano com despesa.ano.
        Observe que fizemos o filtro do array despesasFiltradas e o resultado dessa
        filtragem será atribuida para o array despesaFiltradas sendo assim fizemos
        uma atualização desse array.
        */
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
            console.log('Aplicando filtro de ano!!!')
        }

        /*Agora vamos realizar a lógica de filtro por mes. 
        A mesma lógica de filtro por ano acima.
        */
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
            console.log('Aplicando filtro de mês!!!')
        }

        /*Agora vamos realizar a lógica de filtro por dia. 
        A mesma lógica de filtro por ano acima.
        */
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
            console.log('Aplicando filtro de dia!!!')
        }
        
        /*Agora vamos realizar a lógica de filtro por tipo. 
        A mesma lógica de filtro por ano acima.
        */
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
            console.log('Aplicando filtro de tipo!!!')
        }

        /*Agora vamos realizar a lógica de filtro por descrição. 
        A mesma lógica de filtro por ano acima.
        */
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
            console.log('Aplicando filtro de descrição!!!')
        }

        /*Agora vamos realizar a lógica de filtro por valor. 
        A mesma lógica de filtro por ano acima.
        */
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
            console.log('Aplicando filtro de valor!!!')
        }
        
        /*O array despesasFiltradas depois dos filtros. */
        //console.log(despesasFiltradas)

        
        /*O array despesasFiltradas depois dos filtros. */
        return despesasFiltradas
    }

    /*Aqui abaixo estamos criando o método de remoção de dados
    da nossa aplicação. 
    Passamos como parâmetro o id(key) do elemento que desejamos excluir
    depois chamamos o localStorage e usamos a propriedade removeItem(id) e
    passamos o id do dado que dever ser removido.
    */
	remover(id){
		localStorage.removeItem(id)
	}
}

/*Estamos instânciando o objeto bd() */
let bd = new Bd()


/*Veja abaixo que criamos uma função chamada cadastrarDespesa e o evento onclick
que está na tag button do arquivo arquivo index.html está recebendo essa função.
*/
function cadastrarDespesa(){
    /* Observe que criamos variáveis e elas estão recebendo a instrução document.get...
    e se observa podemos selecionar o valor(value) desse elemento chamando a
    variável e usando o operador ponto(.) e a propriedade value ou podemos usar
    o operador ponto diretamente na atribuição da variável e utilizar a propriedade
    value igual no exemplo:
    let ano = document.getElementById('ano').value
    Depois basta só chamar a variável, esse modo é legal porém o professor disse
    que pode ter alguns problemas e por isso vamos fazer da primeira forma que
    é usar a variável o operador ponto(.) e depois a propriedade desejada.
    */
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    
    
    /*Aqui estamos instânciando o nosso objeto despesa veja também que os 
    parâmetros estamos usando as variáveis crianda dentro da nossa função
    e elas estão usando o operador ponto(.) e a propriedade value. Dessa forma
    os valores serão passados para o nosso método constructor, através dos 
    parâmetros do mesmo e atribuindo para os valores para os nossos atributos
    da classe Despesa().  
    */
    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
        )

        /**/
        if(despesa.validarDados()){

            /*Aqui abaixo é o processo de gravar os dados no local Storage 
            */
            bd.gravar(despesa)

            
            /*Abaixo estamos utilizando a propriedade innerHTML ela acessa uma tag através
            de id/classe/valor/nome e pode ser passado algum texto que foi no nosso caso
            fizemos isso pois lá no arquivo index.html tinha uma estrutura modal que era
            igual tanto para sucesso na gravação de dados como no erro de gravação dos dados
            e sendo assim montamos uma lógica para não precisar ficar com muito codigo no
            nosso view(index.html) 
            */
            document.getElementById('modal_titulo').innerHTML = 'Gravação Realizada com sucesso'
            document.getElementById('modalConteudo').innerHTML = 'Despesa salva com sucesso.'
            document.getElementById('modalBtn').innerHTML = 'Voltar'


            /*Abaixo estamos utilizando a propriedade className ela faz dizer que aquela tag 
            com id tal vai usar a classe desejada ou seja a classe que for passado como 
            atribuição igual no exemplo abaixo.  
            tinha uma estrutura modal que era igual tanto para sucesso na gravação de dados 
            como no erro de gravação dos dados e sendo assim montamos uma lógica para não 
            precisar ficar com muito codigo no nosso view(index.html) 
            */
            document.getElementById('modalTituloDiv').className='modal-header text-success'
            document.getElementById('modalBtn').className = 'btn btn-success'
            

            /* */
            $('#modalRegistraDespesa').modal('show')

            
            /* Aqui abaixo fizemos a limpeza dos campos de cadastro
            assim que finalizar com sucesso um cadastro.
            Essa foi minha lógica para o desafio.
            
            document.getElementById('ano').value = ""
            document.getElementById('mes').value = ""
            document.getElementById('tipo').value = ""
            document.getElementById('dia').value = ""
            document.getElementById('descricao').value = ""
            document.getElementById('valor').value = ""
            */

            
            /*Aqui fizemos a limpeza dos campos de cadastro assim que finalizar
            com sucesso um cadastro porém essa foi a lógica do professor.
            */
            ano.value = ''
            mes.value = ''
            dia.value = ''
            tipo.value = ''
            descricao.value = ''
            valor.value = ''

        }else{
            

            /*Abaixo estamos utilizando a propriedade innerHTML ela acessa uma tag através
            de id/classe/valor/nome e pode ser passado algum texto que foi no nosso caso
            fizemos isso pois lá no arquivo index.html tinha uma estrutura modal que era
            igual tanto para sucesso na gravação de dados como no erro de gravação dos dados
            e sendo assim montamos uma lógica para não precisar ficar com muito codigo no
            nosso view(index.html) 
            */
            document.getElementById('modal_titulo').innerHTML = 'Erro na gravação dos dados'
            document.getElementById('modalConteudo').innerHTML = 'Preencha todos os campos'
            document.getElementById('modalBtn').innerHTML = 'Voltar e Corrigir'
            
            
            /*Abaixo estamos utilizando a propriedade className ela faz dizer que aquela tag 
            com id tal vai usar a classe desejada ou seja a classe que for passado como 
            atribuição igual no exemplo abaixo.  
            tinha uma estrutura modal que era igual tanto para sucesso na gravação de dados 
            como no erro de gravação dos dados e sendo assim montamos uma lógica para não 
            precisar ficar com muito codigo no nosso view(index.html)  
            */
            document.getElementById('modalTituloDiv').className='modal-header text-danger'
            document.getElementById('modalBtn').className = 'btn btn-danger'
           

             //dialog de erro
            /*Abaixo temos um seletor de jquery mas vamos falar disso mais para 
            frente. 
            */
            $('#modalRegistraDespesa').modal('show')
        }    
        
}

/*Aqui abaixo temos uma função para realizar o carregamento da lista na nossa view
do arquivo consulta.html.
Observe que passamos um parâmetro chamado despesas e ele recebe um Array() com default
e fizemos isso porque ela pode ser chamada pela função pesquisarDespesa() que nesse caso
será passado um Array de despesas ou ela pode ser chamada lá no onload do body do arquivo
consulta.html.
Criamos também um parâmetro chamado filtro e atribuimos o valor de false.
*/
function carregaListaDespesas(despesas = Array(), filtro = false){
    
    
    /*Aqui abaixo fizemos uma condicional para verificar se o 
    length(quantidade de índices de um array) é igual a zero e se for
    ele irá exibir todos os registros e por isso precisamos recuperar
    todos os dados e se não for igual a zero esse Array possui valor
    e precisa ser apresentado.
    Para resumir essa exibição de todos os dados do método recuperarTodosRegistros()
    só vai funcionar quando não realizar um filtro e sendo assim ele exibirá todos os
    dados. Caso realize um filtro o length não terá o valor de 0 e automaticamente essa
    condicional if será ignorada e só irá exibir o registro filtrado na nossa view consulta.html
    e para completar caso o cliente não queira exibir nenhum registro quando o filtro que foi 
    realizado não existir basta incluir o operador && e verificar se o parâmetro filtro == false
    aí nossos registros só irão exibir quando for atendido essas duas condições.
    */
    if(despesas.length == 0 && filtro == false){
    
        /*Já aqui abaixo é o processo de recebimento dos dados do método 
        recuperarTodosRegistros() como já sabemos esse método tem todo o
        processo de extrair os dados do nosso banco de dados(localStorage)
        e realizar o tratamento que nesse caso foi usar um laço de repetição
        para pegar todas as informações tanto o id como os valores e jogar em
        um array, e essa função vai retornar um array que vai ser usando dentro
        dessa função carregarListaDespesas().
        Veja que nosso array criado no escopo da função recebe o método 
        recuperarTodosRegistros() do objeto bd.*/
        despesas =bd.recuperarTodosRegistros()
    
    }      

    /*Aqui estamos selecionando o elemento do tbody da tabela través do id*/
    let listaDespesas = document.getElementById('listaDespesas')

    /*Aqui abaixo estamos realizando a limpeza do tbody da parte de consulta
    pois quando realizamos um filtro no arquivo consulta.html ele está retornando
    todos os valores contido no tbody e consequentimente ele realiza uma inclusão
    do conteúdo pesquisado na nossa tabela(view) do arquivo consulta.html e para
    resolver simplesmente selecionamos a tag através do id e a propriedade innerHTML
    que é responsável dos conteúdos dentro de uma tag e atribuimos vazio para realizar
    a limpeza dessa view antes da lógica de filtro seja aplicada. */
    listaDespesas.innerHTML = ''

    /*Aqui estamos pecorrendo o array despesas, listando cada despesa de forma 
    dinâmica utilizando o forEach com uma função callback.*/
    despesas.forEach(function(d) {
        
        //console.log(d)
        
        /*Aqui estamos recuperando a variável listaDespesas que por sua vez 
        realiza a seleção do id listaDespesas do tbody do arquivo consulta.html
        e usando a propriedade insertRow() ele realiza a criação de linhas(tr)
        dentro do tbody. Uma observação é que o tbody permite isso.       
        */
        let linha = listaDespesas.insertRow()
    
        
        /* Aqui estamos criando uma coluna (td) e para isso precisamos passar
        a variável responsavel pela linha e usar a propriedade insertCell e 
        outra coisa importante é que precisamos passar como parâmetro a numero
        da coluna da onde ele deve partir.
        Veja que usamos o innerHTML para exibir os dados da função cadastrarDespesa()
        e o parâmetro d serve para acessar esses dados da função informada.

        */
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        /* Aqui abaixo estamos ajustando o tipo pois na nossa view ela estava
        aparecendo a numeração e para reolver isso usamos um switch case para
        ajustar de string representado como numero para string letras.
        Podemos também usar um parseInt(d.tipo) para converter de string para
        numero mas usamos desse jeito abaixo mesmo ambos estão corretos.
        */
        switch(d.tipo){
            case '1': 
                d.tipo = 'Alimentação'
                    break
            case '2':
                d.tipo = 'Educação'
                    break
            case '3':
                d.tipo = 'Lazer'
                    break
            case '4':
                d.tipo = 'Saúde'
                    break
            case '5':
                d.tipo = 'Transporte'
                    break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        
        /*Aqui abaixo vamos criar um botão de exclusão.
        Primeiro criamos uma variável chamada de btn(botão),
        depois apontamos um elemento do DOM(document) chamado
        de .createElement("button") e passamos um botão como
        parâmetro dentro dessa propriedade, vale lembrar que precisa
        está entre aspas do jeito que mostra abaixo.
        Depois de feito isso vamos pegar a variável linha e usar a 
        propriedade .insertCell(4) para inserir uma coluna e como parâmetro
        dessa propriedade passamos o numero da coluna que nesse caso foi 4
        e depois usamos outra propriedade chamada de .append(btn) para inserir
        um elemento na coluna 4 que nesse caso foi a variável btn(button) que
        está recebendo o elemento do DOM .createElemento("button").
        Isso vai se repetir a cada interação do forEach. */
        let btn = document.createElement('button')
        
        /*Aqui abaixo antes do codigo linha.insertCell(4).append(btn) 
        estamos estilizando o nosso botão criado usamos as propriedades
        className e innerHTML para dá estilo no botão de exlusão. */
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa fa-times"  ></i>'
        
        /*Aqui abaixo estamos criando o atributo id do elemento   
        html e ele vai receber d.id e só lembrando a variável d é
        aqui está sendo utilizada dentro do forEach() que corre na
        relação de despesa relacionada a aplicação.
        sendo assim estamos acessando o id do objeto despesa e 
        associando no elemento btn(botão).
        fizemos uma concatenação para não dá bug nos outros elementos da
        aplicação.
        */
        btn.id = `id_despesa_${d.id}`

        /*Aqui abaixo estamos usando o propriedade onclick do botão
        criado e passando uma função para executar a lógica de remoção. 
        */
        btn.onclick = function(){
            
            /*Aqui criamos uma variável e passamos this.id.replace('id_despesa', '') 
            para substituir nossa template string 'id_despesa_' por ''(vazio) e sendo
            assim só irá aparecer o nosso id sem o id_despesa_ e quem faz essa substituição
            é a propriedade replace().
            */
            let id = this.id.replace('id_despesa_','')

            /*Aqui estamos executando o método remover e como parâmetro passamos
            o id da informação que deve ser excluida. Como a variável id está
            recebendo o contexto da classe Bd(let id = this.id) só precisamos
            passar o nome da variável que está recebendo esse contexto que nesse
            caso foi id que está no escopo da função associada ao onclick.  
            */
            bd.remover(id)

            /* */
            window.location.reload()

            //alert(id)
        }


        linha.insertCell(4).append(btn)

        console.log(d)

    })
}

/*Aqui abaixo temos a função pesquisarDespesa ele é responsável de recuperar os valores da nossa view que
nesse caso é o arquivo consulta.html.
Veja que o processo de recuperação dos valores(value) não é mais novidade, depois de realizar esse processo
instanciámos o objeto Despesa e passamos como parâmetros as variáveis criadas no escopo da função 
pesquisarDespesa().
Veja que dentro do objeto Despesa estamos utilizando as variáveis criada na função só para não confundir.
Outra coisa importante é que abaixo do objeto Despesa realizamos a passagem da variável despesa que é do
objeto Despesa como parâmetro do método pesquisar() da classe Bd().
Sendo assim todos os valores serão passados para a classe Bd() que é a responsável de trabalhar diretamente
com o nosso banco de dados que nesse caso é localStorage.  
*/
function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)


    /*Aqui abaixo estamos chamando a nossa função carregaListaDespesas() para realizar 
    a lógica de exibição do filtro no arquivo consulta.html e como já sabemos passamos 
    a variável despesas como parâmetro dessa função pois ela recebe os dados do método
    pesquisar(despesa) da classe Bd e nesse método pesquisar ele recebe como parâmetro
    a variável despesa que recebe os dados da classe Despesa(). 
    Já o parâmetro true diz que o filtro é verdadeiro portanto o valor recebido por padrão(default) 
    será substituido por true. */
    carregaListaDespesas(despesas, true)

}