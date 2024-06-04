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



const insertMusica = async function(dadosMusicas){
   
  
        let sql;

        if (dadosMusicas.data_relancamento != '' && 
        dadosMusicas.data_relancamento != null &&
        dadosMusicas.data_relancamento != undefined
        ){

         sql = `insert into tbl_musica ( nome,
                duracao,
                foto_capa,
                URL
                tbl_classificacao_id
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                ${dadosFilme.valor_unitario},
                ${dadosFilme.tbl_classificacao_id}


    )`;        
} else {

            sql = `insert into tbl_filme ( nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                tbl_classificacao_id
        ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                 null,
                '${dadosFilme.foto_capa}',
                ${dadosFilme.valor_unitario},
                ${dadosFilme.tbl_classificacao_id}
        )`;
    }
    console.log(sql);

    let result=await prisma.$executeRawUnsafe(sql)
    if(result){
        let idFilme=await selectLastId()
        //caso chegue até aqui é pq inseriu corretamente os dados da nacionalidade, então só retorna verdadeiro para indicar q deu certo
        return true
    }
    else
        return false 
}
              



module.exports = {
    selectAllMusicas
}