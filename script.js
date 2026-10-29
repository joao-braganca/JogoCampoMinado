function comecar() {


    //document.getElementById("tabela").style="visibility: visible";
    document.getElementById("cobertura").classList.add("iniciar");

    var dificuldade = document.getElementById("dificuldade").value;
    var campo = Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => ({ "bomba": 0, "verificado": 0, "bandeira": 0, "quantidade": ""})));

    switch (dificuldade) {
        case "0":
            var quantidade = Math.floor(Math.random() * (25 - 21)) + 20;
            break;
        case "1":
            var quantidade = Math.floor(Math.random() * (30 - 26)) + 25;
            break;
        case "2":
            var quantidade = Math.floor(Math.random() * (45 - 31)) + 30;
            break;
    }
    console.log(quantidade);

    for (var i = 0; i < quantidade; i++) {


        var coluna = Math.floor(Math.random() * 14);
        var linha = Math.floor(Math.random() * 14);

        if (campo[linha][coluna].bomba == 0) {
            campo[linha][coluna].bomba = 1;
        }
        else {
            i = i - 1;
        }

    }
    console.table(campo);

    var tabela = document.getElementById("tabela");

    tabela.addEventListener("contextmenu", (e) => {
        var celula = e.target.closest("td");
        e.preventDefault()
        var linhaCelula = celula.parentElement.rowIndex;
        var colunaCelula = celula.cellIndex;

        if(campo[linhaCelula][colunaCelula].bandeira==0){
            campo[linhaCelula][colunaCelula].bandeira=1;
            tabela.rows[linhaCelula].cells[colunaCelula].innerHTML="<span class='bandeira'>🚩</span>";
        }else{
            campo[linhaCelula][colunaCelula].bandeira=0;
            tabela.rows[linhaCelula].cells[colunaCelula].textContent="";
            tabela.rows[linhaCelula].cells[colunaCelula].textContent=campo[linhaCelula][colunaCelula].quantidade;
        }
    });
    tabela.addEventListener("click", (e) => {
        var celula = e.target.closest("td");
        var linhaCelula = celula.parentElement.rowIndex;
        var colunaCelula = celula.cellIndex;

        if (campo[linhaCelula][colunaCelula].bomba == 1) {
            alert("bombaaa");
            window.location.reload();

        } else {
            if (campo[linhaCelula][colunaCelula].verificado == 0) {
                

                verificar(campo, linhaCelula, colunaCelula);
                ganhar(campo, linhaCelula, colunaCelula);
            }
        }
    });

}

function verificar(campo, linha, coluna) {
    
    var totalBombas = 0;
    var pulos = 0;
    var itemLinha = 0;
    var itemColuna = 0;

    var arrayLinha = Array.from({ length: 15 }, () => itemLinha++);
    var arrayColuna = Array.from({ length: 15 }, () => itemColuna++);

    for (var verLinha = (linha - 1); verLinha < (linha + 2); verLinha++) {
        for (var verColuna = (coluna - 1); verColuna < (coluna + 2); verColuna++) {
            pulos++;
            if (arrayLinha.includes(verLinha) && arrayColuna.includes(verColuna)) {
                if (campo[verLinha][verColuna].bomba == 1) {
                    totalBombas++;
                }
            }
        }
    }
    if (totalBombas == 0) {
        for (var verLinha = (linha - 1); verLinha < (linha + 2); verLinha++) {
            for (var verColuna = (coluna - 1); verColuna < (coluna + 2); verColuna++) {
                pulos++;


                
               
                if (arrayLinha.includes(verLinha) && arrayColuna.includes(verColuna) && campo[verLinha][verColuna].bomba == 0 && campo[verLinha][verColuna].verificado == 0) {
                    tabela.rows[verLinha].cells[verColuna].style.backgroundColor = "#ffffff";

                    campo[verLinha][verColuna].verificado = 1;
                    //console.log("linhaclicada: " + linha + " colunaclicada: " + coluna + " verlinha: " + verLinha + " vercoluna: " + verColuna + " quantidade pulos: " + pulos + " array: " + arrayLinha, arrayColuna);
                    verificar(campo, verLinha, verColuna);

                }
                
            }
        }
        
    }

    else {
        tabela.rows[linha].cells[coluna].textContent = totalBombas;
        campo[linha][coluna].quantidade=totalBombas;
        tabela.rows[linha].cells[coluna].style.backgroundColor = "#ffffff";
        
    }
}

function ganhar(campo, linha, coluna){
var campo = campo;
campo[linha][coluna].verificado = 1;
if(!campo.some(linha => linha.some(coluna => coluna.bomba == 0 && coluna.verificado == 0))){
alert("parabens vc ganhou");
}
}

