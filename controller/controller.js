/**************************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de músicas
 * Data: 04/06/2024
 * Autora: Vitória
 * Versão: 1.0
 */

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo responsável pela 
const musicaDAO = require('../model/DAO/musicasDAO.js')


const getListarMusicas = async function(){

    let musicasJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosMusicas = await musicaDAO.selectAllMusicas()


    //Validação para verificar se o DAO retornou dados
    if(dadosMusicas){

        //cria o JSON
        musicasJSON.Músicas = dadosMusicas
        musicasJSON.Artistas = dadosMusicas.length
        musicasJSON.status_code = 200

        return musicasJSON
    }else{
        return false
    }
}

module.exports = {
getListarMusicas

}
