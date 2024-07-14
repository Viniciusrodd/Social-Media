

//MIDDLEWARE DE VERIFICAÇÃO DE SESSÃO DE USER SE ESTÁ LOGADA OU NÃO
function userAuth(req, res, next){
    if(req.session.user != undefined){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports = userAuth