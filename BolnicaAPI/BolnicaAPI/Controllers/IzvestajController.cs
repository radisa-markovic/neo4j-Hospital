using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BolnicaAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;

namespace BolnicaAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class IzvestajController : ControllerBase
    {
        private GraphClient _klijent = new GraphClient(new Uri("http://localhost:7474/db/data"), "neo4j", "bolnica");
        // GET: api/Izvestaj/VratiPacijentoveIzvestaje/idPacijenta
        [HttpGet ("{idPacijenta}")]
        public IEnumerable<Izvestaj> VratiPacijentoveIzvestaje(string idPacijenta)
        {
            this._klijent.Connect();

            return new List<Izvestaj>();
        }

        // GET: api/Izvestaj/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }


        //---->> ne moram da vodim racuna ni o kakvoj unikatnosti, jer ne moze da se desi duplikat po id-u, tako kaze onaj sa npm-a
        // POST: api/Izvestaj/DodajIzvestaj
        //---->> nista, ovo je dodalo izvestaj, i vezalo ga je za pacijenta, sad cu ja da vidim sta mogu sa time
        //--->> sad trebam da napravim situaciju da doktor moze da napise izvestaj za nekog pacijenta
        //---->> sto znaci da se pravi izvestaj, pa se dodaju dve veze (doktor)-[:NAPISAO]->(izvestaj)<-[:POSEDUJE]-(pacijent)
        [HttpPost]
        public void DodajIzvestaj([FromBody] Izvestaj noviIzvestaj)
        {
            //this._klijent.Connect();
            //this._klijent.Cypher
            //             .Create("(izvestaj: Izvestaj {noviIzvestaj})")
            //             .WithParam("noviIzvestaj", noviIzvestaj)
            //             .ExecuteWithoutResults();//ovo ovde do sada treba da doda jedan izvestaj, a posle cu da pravim veze...

            //da vidim dal moze ovako sa 3 ugnjezdena upita i onaj With
            this._klijent.Connect();
            this._klijent.Cypher
                         .Merge($"(pacijent:Pacijent {{idPacijenta: \"{noviIzvestaj.IdPacijenta}\"}})")
                         .With("pacijent")
                         .Merge($"(izvestaj:Izvestaj {{noviIzvestaj: \"{noviIzvestaj}\"}})")
                         .With("pacijent, izvestaj")
                         .Merge($"(doktor:Doktor {{Ime: \"{noviIzvestaj.ImeDoktora}\"}})")
                         .Merge("(pacijent)-[:POSEDUJE]->(izvestaj)<-[:NAPISAO]-(doktor)")
                         .ExecuteWithoutResults();
        }

        // PUT: api/Izvestaj/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
