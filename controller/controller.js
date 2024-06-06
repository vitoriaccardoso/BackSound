/**************************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de músicas
 * Data: 04/06/2024
 * Autora: Vitória
 * Versão: 1.0
 */

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo responsável pela 
const musicasDAO = require('../model/DAO/musicasDAO.js')


const getListarMusicas = async function(){

    let musicasJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosMusicas = await musicasDAO.selectAllMusicas()


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

const getMusicaByID = async function(id){
    let idMusica = id

    //cria o objeto JSON
    let musicasJSON = {}


    //Validação para verificar se o id é válido (vazio, indefinido e não numerico)
    if(id == '' || idMusica == undefined || isNaN(idMusica)){
        return message.ERROR_INVALID_ID//400
    }else{
        
        //Encaminha para o DAO localizar o ID do filme
        let dadosMusicas = await musicasDAO.selectMusicaByID(idMusica)
        

        //Validação para verificar se existem dados de retorno
        if(dadosMusicas){

            if(dadosMusicas.length > 0){

            //cria o JSON de retorno
            musicasJSON.Musica = dadosMusicas
            musicasJSON.status_code = 200

            return musicasJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
        return message.ERROR_INTERNAL_SERVER_DB//500
    }
    }
}



const getListarUsuarios = async function(){

    let usuariosJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosUsuarios = await musicasDAO.selectAllUsuarios()


    //Validação para verificar se o DAO retornou dados
    if(dadosUsuarios){

        //cria o JSON
        usuariosJSON.Usuarios = dadosUsuarios
        usuariosJSON.Artistas = dadosUsuarios.length
        usuariosJSON.status_code = 200

        return usuariosJSON
    }else{
        return false
    }
}





const setInserirNovoUsuario = async function(dadosUsuarios, contentType) {

    try {

        //Validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            //Cria o objeto JSON para devolver os dados criados na requisição
            let novoUsuarioJSON = {}

            //Validação de campos obrigatórios ou com digitação inválida
            if( dadosUsuarios.nome == ''             || dadosUsuarios.nome == undefined           || dadosUsuarios.nome == null               || dadosUsuarios.nome.length > 80               ||
                dadosUsuarios.email == ''            || dadosUsuarios.email == undefined          || dadosUsuarios.email == null            || dadosUsuarios.email.length > 65000                 ||
                dadosUsuarios.senha == ''            || dadosUsuarios.senha == undefined          || dadosUsuarios.senha == null            || dadosUsuarios.senha.length > 8                     
            ){
                return message.ERROR_REQUIRE_FIELDS //400

            }else {

                let validateStatus = false

                //Validação da data de relançamento, já que ela não é obrigatória no Banco de Dados

                if (dadosUsuarios.foto_capa != null   &&
                    dadosUsuarios.foto_capa  != ''     &&
                    dadosUsuarios.foto_capa  != undefined ) {

                    //Validação para verificar se a data está com a quantidade de digitos corretos
                    if (dadosUsuarios.foto_capa.length != 500){
                        return message.ERROR_REQUIRE_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                //Validação para verificar se a variável booleana é verdadeira
                if(validateStatus){

                    //Encaminha os dados do Filme para o DAO inserir no Banco de Dados
                    let novoUsuario = await musicasDAO.insertUsuario(dadosUsuarios)
                    //Validação para verificar se DAO inseriu os dados do Banco
                    if(novoUsuario){

                        console.log("passei carai ");
                        
                        //Cria o JSON de retorno dos dados (201)
                    novoUsuarioJSON.nome        = dadosUsuarios
                    novoUsuarioJSON.email       = dadosUsuarios
                    novoUsuarioJSON.senha       = dadosUsuarios
                    novoUsuarioJSON.status      = message.SUCCESS_CREATED_ITEM.status
                    novoUsuarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoUsuarioJSON.message     = message.SUCCESS_CREATED_ITEM.message

                        return novoUsuarioJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch(error) {
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}









module.exports = {
getListarMusicas,
getMusicaByID,



//usuarios
getListarUsuarios,
setInserirNovoUsuario

}
