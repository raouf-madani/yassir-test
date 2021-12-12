import { FastifyRequest, FastifyReply } from "fastify";
import { PokemonWithStats } from "models/PokemonWithStats";
require('dotenv').config();

export async function getPokemonByName(request: FastifyRequest, reply: FastifyReply) {
  const name: string = request.params['name']
  
  reply.headers['Accept'] = 'application/json'
  
  let urlApiPokeman = `https://pokeapi.co/api/v2/pokemon`;//fix error number 1 * delete (/)

  

  //fix error 2 * delete additional quotes in '"?offset=20"'
  (name == null) || (name.trim() != '')
      ? (urlApiPokeman = urlApiPokeman + '?offset=20', urlApiPokeman = urlApiPokeman + "&limit=20")
      : ( urlApiPokeman = urlApiPokeman + '/', urlApiPokeman = urlApiPokeman + name)
     
      
  console.log(urlApiPokeman);

  const http = require('http');
  const keepAliveAgent = new http.Agent({ keepAlive: true });

 
  // fix error 3 * add method GET to our http request and assign port number via environment
  http.get(urlApiPokeman, (res:any) => {
    
    let mydata = '';
        res.on("data", (data) =>{
          
            mydata += data;
        });
        res.on('end', () => {
            const response = JSON.parse(mydata);
            console.log(response);
            computeResponse(response);
            res.send(response.name);
            
        });
 
    })

  


 
}

//fix error 4 by replacing unknown type with any and delete second parameter

const computeResponse = async (response: any) => {
  const resp = response as any

  let types = resp.types.map(type => type.type);
  let typesURL= types.map(type => { return type.url });
  // no need for reduce method because it must have a function as a first input
  // We'll loop through typesURL array to make a request to every link
  

  let pokemonTypes = []

  typesURL.forEach(element => {
    const http = require('http');
    const keepAliveAgent = new http.Agent({ keepAlive: true });

    http.request({ hostname: element }, (response) => pokemonTypes.push(response))

  });

  if (pokemonTypes == undefined)
    throw pokemonTypes

  response.stats.forEach(element => {
    var stats = []

    pokemonTypes.map(pok =>
        pok.stats.map(st =>
            st.stat.name.toUpperCase() == element.stat.name
                ? stats.push(st.base_state)
                : ([])
        )
    )

    if (stats) {
      let avg = stats.reduce((a, b) => a + b) / stats.length
      element.averageStat = avg
    } else {
      element.averageStat = 0
    }
  });

}