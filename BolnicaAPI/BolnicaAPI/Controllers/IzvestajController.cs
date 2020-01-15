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

        // GET: api/Izvestaj/VratiPacijentoveIzvestaje/{idPacijenta}
        [HttpGet("{idPacijenta}")]
        public object VratiPacijentoveIzvestaje(string idPacijenta)
        {
            this._klijent.Connect();

            var upit = this._klijent.Cypher
                                    .Match($"(pacijent:Pacijent {{IDPacijenta: \"{idPacijenta}\"}})-[:POSEDUJE]->(izvestaj:Izvestaj)<-[:NAPISAO]-(doktor:Doktor)")
                                    .Return((doktor, izvestaj, pacijent) => new
                                    {
                                        izvestaj.As<Izvestaj>().IDIzvestaja,
                                        pacijent.As<Pacijent>().IDPacijenta,
                                        KorisnickoImeDoktora = doktor.As<Doktor>().KorisnickoIme,
                                        izvestaj.As<Izvestaj>().Sadrzaj,
                                        izvestaj.As<Izvestaj>().DatumPisanja
                                    })
                                    .Results;
            if (upit.Count() == 0)
                return "1001";//nema izvestaja
            else
                return upit.ToList();
        }

        // POST: api/Izvestaj/DodajIzvestaj
        [HttpPost]
        public void DodajIzvestaj([FromBody] Izvestaj noviIzvestaj)
        {
            this._klijent.Connect();
            this._klijent.Cypher
                         .Merge($"(pacijent:Pacijent {{IDPacijenta: \"{noviIzvestaj.IDPacijenta}\"}})")
                         .With("pacijent")
                         .Merge($"(izvestaj:Izvestaj { this.IzvuciPodatkeZaCvor(noviIzvestaj) })")
                         .With("pacijent, izvestaj")
                         .Merge($"(doktor:Doktor {{KorisnickoIme: \"{noviIzvestaj.KorisnickoImeDoktora}\"}})")
                         .Merge("(pacijent)-[:POSEDUJE]->(izvestaj)<-[:NAPISAO]-(doktor)")
                         .ExecuteWithoutResults();
        }

        private string IzvuciPodatkeZaCvor(Izvestaj izvestaj)
        {
            string atributiCvoraUBazi = "{" + $"IDIzvestaja: \"{izvestaj.IDIzvestaja}\"," +  
                                         $"Sadrzaj: \"{izvestaj.Sadrzaj}\"," +
                                         $"DatumPisanja: \"{izvestaj.DatumPisanja}\"" + "}";
            
            return atributiCvoraUBazi;
        }

    }
}
