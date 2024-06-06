const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use((_request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
})

const controllerMusicas = require('./controller/controller.js')

    //http://localhost:8080/v1/soundhub/musicas
    app.get('/v1/soundhub/musicas', cors(),async function (request,response,next){

        // chama a função da controller para retornar os filmes;
        let dadosMusicas = await controllerMusicas.getListarMusicas();
    
        // validação para retornar o Json dos filmes ou retornar o erro 404;
        if(dadosMusicas){
            response.json(dadosMusicas);
            response.status(200);
        }else{
            response.json({message: 'Nenhum registro foi encontrado'});
            response.status(404);
        }
    })

    app.listen('8080', function(){
        console.log('API FUNCIONANDO')
    })


 app.get('/v1/soundhub/musicas/:id', cors(), async function(request, response, next){


        //recebe o ID da requisição
        let idMusica = request.params.id
    
    
        //encaminha o ID para a controller buscar o filme
        let dadosMusicas = await controllerMusicas.getMusicaByID(idMusica)
    
        response.status(dadosMusicas.status_code)
        response.json(dadosMusicas)
    })
    
    app.post('/v1/soundhub/musica', cors(), bodyParserJson, async function(request, response){
        //recebe o contente-type da requisição
        let contentType = request.headers['content-type']
    
    
        
        //recebe todos os daoos encaminhados na requisição pelo body
        let dadosBody = request.body
    
    
        //encaminha os dados para o controller enviar para DAO
        let resultDadosNovoUsuario = await controllerMusicas.setInserirNovoUsuario(dadosBody, contentType)
        response.status(resultDadosNovoUsuario.status_code)
        response.json(resultDadosNovoUsuario)
    })


    app.listen('8080', function(){
        console.log('API FUNCIONANDO')
    })
