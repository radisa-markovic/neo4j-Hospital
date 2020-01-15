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
            return upit.ToList();
        }

        // GET: api/Pacijent/PodaciOPacijentu/idPacijenta
        [HttpGet("{idPacijenta}")]
        public Pacijent PodaciOPacijentu(string idPacijenta)
        {
            this._klijent.Connect();
            var upit = this._klijent.Cypher
                                    .Match("(pacijent: Pacijent)")
                                    .Where((Pacijent pacijent) => pacijent.IDPacijenta == idPacijenta)
                                    .Return(pacijent => pacijent.As<Pacijent>())
                                    .Results;
            return upit.First(); 
        }

    }
}
