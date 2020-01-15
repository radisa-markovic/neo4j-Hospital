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
        //----->> pogledacu dal trebam da dodam odgovarajuci atribut umesto NULL, posto tek posle trebam da radim frontend
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
        //---->> iz one forme za dodavanje pacijenta se naziv odeljenja izvlaci iz onog select-a, i to cu da hardkodujem...
        //...--->> jer sam kratak sa vremenom, sto automatski znaci da su odeljenja unikatna
        [HttpPost]
        public void DodajPacijenta([FromBody] Pacijent noviPacijent)
        {
            this._klijent.Connect();
            this._klijent.Cypher
                         .Merge($"(odeljenje:Odeljenje{{Naziv: '{noviPacijent.Odeljenje}'}})")
                         .With("odeljenje")
                         .Merge($"(pacijent:Pacijent { this.IzvuciPodatkeZaCvor(noviPacijent) })")
                         .With("pacijent, odeljenje")
                         .Merge("(pacijent)-[:NALAZI_SE_NA]->(odeljenje)")
                         .ExecuteWithoutResults();
        }

        private string IzvuciPodatkeZaCvor(Pacijent pacijent)
        {
            string atributiPacijentaZaBazu = '{' + $"IDPacijenta:'{pacijent.IDPacijenta}', Ime:'{pacijent.Ime}'" +
                                             $",Prezime:'{pacijent.Prezime}', DatumSmestanja:'{pacijent.DatumSmestanja}'" + '}';
            return atributiPacijentaZaBazu;
        }

        // DELETE: api/Odeljenje/OtpustiPacijenta/{IDPacijenta}
        //--->> regulise i onu vezu sa Odeljenjem, jer odeljenje se ne brise kad obrisem pacijenta, za razliku od izvestaja
        [HttpDelete("{IDPacijenta}")]
        public void OtpustiPacijenta(string IDPacijenta)
        {
            this._klijent.Connect();
            this._klijent.Cypher
                         .Match($"(pacijent: Pacijent {{IDPacijenta:\"{IDPacijenta}\"}})-[:POSEDUJE]->(izvestaji:Izvestaj)")
                         .DetachDelete("izvestaji")
                         .DetachDelete("pacijent")
                         .ExecuteWithoutResults();
        }
    }
}
