const Membro = require('../model/Membro');
var idAtual = 0;

var listaDeMembros = [];

function obterTodos(){
    return listaDeMembros;
}

function obterPorId(id){
    return listaDeMembros.find(p => p.id == id);
}

function cadastrar(obj){
    var membro = new Membro(obj);
    idAtual++;
    membro.id = idAtual;
    listaDeMembros.push(membro);

    return membro;
}

function atualizar(membro){
    var indice = listaDeMembros.findIndex(p => p.id == membro.id);
    
    if(indice < 0){
        return;
    }

    listaDeMembros.splice(indice, 1, membro);
    return membro;
}

function deletar(id){
    var indice = listaDeMembros.findIndex(p => p.id == id);
    if(indice < 0){
        return;
    }

    // Deleta de dentro do array a posicição especifica
    listaDeMembros.splice(indice, 1);
}


module.exports = {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}