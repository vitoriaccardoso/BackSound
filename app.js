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