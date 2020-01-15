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
    public class OdeljenjeController : ControllerBase
    {
        private GraphClient _klijent = new GraphClient(new Uri("http://localhost:7474/db/data"), "neo4j", "bolnica");

        // GET: api/Odeljenje/NaziviOdeljenja, //--->> potencijalno cu ovo da hardkodujem, videcu
        [HttpGet]
        public string NaziviOdeljenja()//uvek moze object ako ovo krene da zeza...
        {
            this._klijent.Connect();
            var naziviOdeljenja = this._klijent.Cypher
                                               .Match("(odeljenje:Odeljenje)")
                                               .Return(odeljenje => odeljenje.As<Odeljenje>())
                                               .Results;

            return naziviOdeljenja.ToList().ToString();
        }

        // GET: api/Odeljenje/PacijentiSaOdeljenja/{nazivOdeljenja}
        [HttpGet("{nazivOdeljenja}")]
        public IEnumerable<Pacijent> PacijentiSaOdeljenja(string nazivOdeljenja)
        {
            this._klijent.Connect();
            var pacijenti = this._klijent.Cypher
                                         .Match($"(pacijenti:Pacijent)-[:NALAZI_SE_NA]->(odeljenje:Odeljenje{{ Naziv: '{nazivOdeljenja}'}})")
                                         .Return(pacijenti => pacijenti.As<Pacijent>())
                                         .Results;
            return pacijenti.ToList();
        }

        // POST: api/Odeljenje/DodajPacijenta
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Odeljenje/5
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
