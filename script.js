function comecar() {
    var dificuldade = document.getElementById("dificuldade").value;
    var campo = Array.from({ length: 15 }, () => Array(15).fill(0));

    switch (dificuldade) {
        case "0":
            var quantidade = Math.floor(Math.random() * (15 - 11)) + 10;
            break;
        case "1":
            var quantidade = Math.floor(Math.random() * (20 - 16)) + 15;
            break;
        case "2":
            var quantidade = Math.floor(Math.random() * (25 - 21)) + 20;
            break;
    }
    console.log(quantidade);

    for (var i = 0; i < quantidade; i++) {


        var coluna = Math.floor(Math.random() * 14);
        var linha = Math.floor(Math.random() * 14);

        if (campo[linha][coluna] == 0) {
            campo[linha][coluna] = 1;
        }
        else {
            i = i - 1;
        }

    }
    console.table(campo);

    var tabela = document.querySelector("#tabela");
    tabela.addEventListener("click", (e) => {
        var celula = e.target.closest("td");
        var linhaCelula = celula.parentElement.rowIndex;
        var colunaCelula = celula.cellIndex;

        if (campo[linhaCelula][colunaCelula] == 1) {
            alert("bombaaa");
        } else {
            verificar(campo, linhaCelula, colunaCelula);
        }
    });

}

function verificar(campo, linha, coluna) {
    var totalBombas = 0;
    for (var verLinha = linha - 1; verLinha < linha + 1; verLinha++) {
        for (var verColuna = coluna - 1; verColuna < coluna + 1; verColuna++) {
            if(verLinha>0 && verColuna>0){
                if (campo[verLinha][verColuna] == 1) {
                    totalBombas++;
                }
            }
            console.log("ok");
        }
    }
    if (totalBombas == 0) {
        for (var verLinha = linha - 1; verLinha < linha + 1; verLinha++) {
            for (var verColuna = coluna - 1; verColuna < coluna + 1; verColuna++) {
                if (verLinha != linha && verColuna != coluna) {
                   verificar(campo, verLinha, verColuna);
                }
            }
        }
    }
    else{
        tabela.rows[linha].cells[coluna].textContent=totalBombas;
    }
}
