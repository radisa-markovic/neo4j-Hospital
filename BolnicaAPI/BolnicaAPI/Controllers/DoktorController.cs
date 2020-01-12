using BolnicaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient; //klijent, a ne ono sto sam skinuo, mada ono, i nisam nesto narocito bistar....
using System;
using System.Collections.Generic;
using System.Linq;

namespace BolnicaAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DoktorController : ControllerBase
    {
        //stavljam sve ovde jer ne znam kako da odradim Dependency Injection, a i ako radi, nek ide...
        private GraphClient _klijent = new GraphClient(new Uri("http://localhost:7474/db/data"), "neo4j", "bolnica");
        // GET: api/Doktor/VratiDoktore
        [HttpGet]
        public IEnumerable<Doktor> VratiDoktore(string korisnickoIme, string prezimeNeko)
        {
            this._klijent.Connect();//kapiram da je ruzno, al za sada nek radi, kad bude vreme cu da se ucim i DI-ja i tako toga
            var query = this._klijent.Cypher
                                     .Match("(doktor: Doktor)")
                                     .Return(doktor => doktor.As<Doktor>())//ovo mora da se poklapa sa ovim iznad izgleda
                                     .Results;

            List<Doktor> doktori = query.ToList();
            
            return doktori;
        }

        // GET: api/Doktor/VratiJednogDoktora/korisnickoIme
        [HttpGet("{korisnickoIme}")]
        public Doktor VratiJednogDoktora(string korisnickoIme)
        {
            this._klijent.Connect();
            var upit = this._klijent.Cypher
                                    .Match("(doktor: Doktor)")
                                    .Where((Doktor doktor) => doktor.KorisnickoIme == korisnickoIme)
                                    .Return(doktor => doktor.As<Doktor>())
                                    .Results;

            Doktor doktor = upit.First<Doktor>();

            return doktor;
        }

        // POST: api/Doktor/DodajDoktora
        [HttpPost]
        public string DodajDoktora([FromBody] Doktor noviDoktor)
        {
            this._klijent.Connect();

            var upit = this._klijent.Cypher
                                    .Match("(doktor: Doktor)")
                                    .Where((Doktor doktor) => doktor.KorisnickoIme == noviDoktor.KorisnickoIme)
                                    .Return(doktor => doktor.As<Doktor>())
                                    .Results;
            if (upit.Count() != 0)
                return "1001";//korisnicko ime je zauzeto

            this._klijent.Cypher
                         .Create("(doktor: Doktor {noviDoktor})")
                         .WithParam("noviDoktor", noviDoktor)
                         .ExecuteWithoutResults(); //ovo zadnje je void, pa i ne trebam da dodeljujem nicemu
            
            return "1000";//ovo znaci da je sve u redu
        }

        //POST: api/Doktor/UlogujDoktora, podaciZaLogin = {korisnickoIme: nesto, lozinka: nestoDrugo}
        [HttpPost]
        public string UlogujDoktora([FromBody] Dictionary<string, string> podaciZaLogin)
        {
            this._klijent.Connect();

            string prosledjenoKorisnickoIme = podaciZaLogin.ElementAt(0).Value;
            string prosledjenaLozinka = podaciZaLogin.ElementAt(1).Value;

            var upit = this._klijent.Cypher
                                    .Match("(doktor: Doktor)")
                                    .Where((Doktor doktor) => doktor.KorisnickoIme == prosledjenoKorisnickoIme)
                                    .Return(doktor => doktor.As<Doktor>())
                                    .Results;
            if (upit.Count() == 0)
                return "1001";//nepostojece korisnicko ime
            else
            {
                Doktor pronadjeniDoktor = upit.First();//...and only
                if (pronadjeniDoktor.Lozinka == prosledjenaLozinka)
                    return "1000";//sve je u redu, i korisnik se onda loguje
                else
                    return "1002";//ispravno korisnicko ime, al neispravna lozinka
            }

        }

    }
}
