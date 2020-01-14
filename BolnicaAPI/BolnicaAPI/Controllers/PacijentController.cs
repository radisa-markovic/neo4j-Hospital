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
    public class PacijentController : ControllerBase
    {
        private GraphClient _klijent = new GraphClient(new Uri("http://localhost:7474/db/data"), "neo4j", "bolnica");
        // GET: api/Pacijent/Pacijenti
        [HttpGet]
        public IEnumerable<Pacijent> Pacijenti()
        {
            this._klijent.Connect();
            var upit = this._klijent.Cypher
                                    .Match("(pacijent: Pacijent)")
                                    .Return(pacijent => pacijent.As<Pacijent>())
                                    .Results;
            List<Pacijent> pacijenti = upit.ToList();
            return pacijenti;
        }

        // GET: api/Pacijent/DetaljiOPacijentu/idPacijenta
        [HttpGet("{idPacijenta}")]
        public Pacijent DetaljiOPacijentu(string idPacijenta)
        {
            this._klijent.Connect();
            var upit = this._klijent.Cypher
                                    .Match("(pacijent: Pacijent)")
                                    .Where((Pacijent pacijent) => pacijent.Identifikacija == idPacijenta)
                                    .Return(pacijent => pacijent.As<Pacijent>())
                                    .Results;
            return upit.First(); 
        }

        // POST: api/Pacijent/DodajPacijenta, ovo ne bi trebalo nikad da ne uspe, mozda posle doduse ako ubacim neki constraint..
        [HttpPost]
        public void DodajPacijenta([FromBody] Pacijent noviPacijent)
        {
            this._klijent.Connect();
            this._klijent.Cypher
                         .Create("(pacijent: Pacijent {noviPacijent})")
                         .WithParam("noviPacijent", noviPacijent)
                         .ExecuteWithoutResults();
            //---->> za sada ovo ne vraca nista, a ako zatreba lako cu da dodam neke stvari
        }

        //----->> sta je ovde fora: pacijent ima nekoliko veza(nalazi_se_na, ceka), i objekte koji su vezani za njega(izvestaj)
        //---->> pa ja, ako zelim da otpustim pacijenta, moram da mu obrisem izvestaje, da mu uklonim veze, i na kraju i njega samog
        // DELETE: api/Pacijent/OtpustiPacijenta/idPacijenta
        [HttpDelete ("{idPacijenta}")]
        public void ObrisiPacijenta(string idPacijenta)
        {
            this._klijent.Connect();
            this._klijent.Cypher
                         .Match("(pacijent: Pacijent)-[:POSEDUJE]->(izvestaji:Izvestaj)")
                         .Where((Pacijent pacijent) => pacijent.Identifikacija == idPacijenta)
                         .Delete("izvestaji")
                         .DetachDelete("pacijent")
                         .ExecuteWithoutResults();
            //nek bude da ne vraca nista, to se lako moze promeniti
            //--->>zbog niza delete-detach delete, moram da proverim da li ovo radi
        }
    }
}
