const message = require('../modulo/config.js')

//Import do arquivo responsável pela 
const musicaDAO = require('../model/DAO/mus.js')

const getListarMusicas = async function(){

    let musicasJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosMusicas = await musicasDAO.selectAllMusicas


    //Validação para verificar se o DAO retornou dados
    if(dadosMusicas){

        //cria o JSON
        musicasJSON.musica = dadosFilmes
        musicasJSON.quantidade = dadosFilmes.length
        musicasJSON.status_code = 200

        return filmesJSON
    }else{
        return false
    }
}

module.exports = {
    getListarMusicas
}
