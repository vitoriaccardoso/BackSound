const { PrismaClient } = require ('@prisma/client')



//Instância da classe prisma client 
const prisma = new PrismaClient()



const selectAllMusicas = async function(){


    let sql = 'select * from tbl_musica'

    let rsMusicas = await prisma.$queryRawUnsafe(sql)

    if(rsMusicas.length > 0)
        return rsMusicas
    else 
        return false
}

const selectMusicaByID = async function(id){
    try {
        let sql = `select * from tbl_musica where id_musica = ${id}`
    
        let rsMusica = await prisma.$queryRawUnsafe(sql)
        return rsMusica
        
    } catch (error) {
        return false
        
    }

}

const insertMusica = async function(dadosMusicas){
    
    let sql;
    try {
        if (dadosMusicas.foto_capa != '' && dadosMusicas.foto_capa != null && dadosMusicas.foto_capa != undefined) {
            sql = `insert into tbl_musica (nome, email, senha, data_registro, id_musica, foto_capa) 
            values(
                '${dadosMusicas.nome}',
                '${dadosMusicas.email}',
                '${dadosMusicas.senha}',
                '${dadosMusicas.data_registro}',
                '${dadosMusicas.data_relancamento}',
                '${dadosMusicas.id_musica}',
                '${dadosMusicas.foto_capa}'
            )`
        }
        else {
            `insert into tbl_musica (nome, email, senha, data_registro, id_musica, foto_capa) 
            values(
                '${dadosMusicas.nome}',
                '${dadosMusicas.email}',
                '${dadosMusicas.senha}',
                '${dadosMusicas.data_registro}',
                '${dadosMusicas.data_relancamento}',
                '${dadosMusicas.id_musica}',
               null
                )`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}



              

const selectAllUsuarios = async function(){
    let sql = 'select * from tbl_usuario'

    let rsMusicas = await prisma.$queryRawUnsafe(sql)

    if(rsMusicas.length > 0)
        return rsMusicas
    else 
        return false
}


const insertUsuario = async function(dadosUsuarios){
    
    let sql;
    try {
        if (dadosMusicas.nome == '' || dadosMusicas.nome == undefined || dadosMusicas.nome == null || dadosMusicas.nome.length > 80 ||
        dadosMusicas.email == '' || dadosMusicas.email == undefined || dadosMusicas.email == null || dadosMusicas.email.length > 65000 ||
        dadosMusicas.senha == '' || dadosMusicas.senha == undefined || dadosMusicas.senha == null || dadosMusicas.senha.length > 8 ||
        dadosMusicas.id_musica == '' || dadosMusicas.id_musica == undefined || dadosMusicas.id_musica == null || dadosMusicas.id_musica > 200||
        dadosMusicas.foto_capa == '' || dadosMusicas.foto_capa == undefined || dadosMusicas.foto_capa == null || dadosMusicas.foto_capa > 2000) {
            sql = `insert into tbl_usuario (nome, email, senha, id_musica, foto_capa) 
            values(
                '${dadosUsuarios.nome}',
                '${dadosUsuarios.email}',
                '${dadosUsuarios.senha}',
                '${dadosUsuarios.id_musica}',
                '${dadosUsuarios.foto_capa}'
                
            )`
        }
        else {
            sql = `insert into tbl_usuario (nome, email, senha, id_musica, foto_capa) 
                values(
                    '${dadosUsuarios.nome}',
                    '${dadosUsuarios.email}',
                    '${dadosUsuarios.senha}',
                    null,
                    null
                )`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}


module.exports = {
    selectAllMusicas,
    selectMusicaByID,
    insertMusica,


    //usuarios
    selectAllUsuarios,
    insertUsuario
}
