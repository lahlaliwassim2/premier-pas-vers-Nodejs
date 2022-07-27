let http = require('http')
let fs = require('fs')
let url = require('url')




let server = http.createServer()
server.on('request', (request,Response) => {
  Response.writeHead(200)
  let query = url.parse(request.url , true).query
  // if(query.name === undefined){
  //   Response.write('bonjour anonyme')
  // }else{
  // Response.write('bonjour' + query.name)
  // }
  // Response.end()

  let name = query.name === undefined ? 'anonyme' : query.name 
    fs.readFile('index.html', 'utf-8' , (err,data)=> {
         if (err) {
            Response.writeHead(404)
            Response.end("ce fichier n existe pas")
         }else{         
          Response.writeHead(200, {
            'content-type': 'text/html; charset=utf-8; '
          })
          data = data.replace('{{ name }}' , name)
          Response.end(data)
        }
    })


})
server.listen(80) 


//systeme d evenement 

// const EventEmetter = require('events')
// let monEcouteur = new EventEmetter()

// monEcouteur.on('saute' , function () {

//     console.log("j'ai sauté")
// })
// monEcouteur.emit('saute')