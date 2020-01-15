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

        //-->>opet cu da "varam" i vratim object, jer pacijent mozda nema izvestaje, pa nek bude da vraca onaj kod 1001
        //---<< Models ima los naziv, bolji naziv je ModeliSaFrontEnda
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
            var StaLiSamDobio = upit.ToList();//dobijam listu sa dva elementa, prvi je ovde korisnicko ime(tako sam naveo), drugi je izvestaj
           //korisnickoIme doktora iz veze dobijam odvojeno od izvestaja, moracu na frontend da ga krpim, ili da ovde prespajam..
           //..tako nesto slicno

            //---->>> a mozda je greska u meni, tj mozda drugacije trebam da saljem podatke, cak i da izbacim tudje reference kompletno?
            //--->> aj da vidim sta kaze net
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
