using BolnicaAPI.Models;
using BolnicaAPI.Servisi;
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
        private IGrafBaza GrafBaza { get; } //on ce da zna da nadje implementaciju jer sam je ja registrovao tako u onom Startup.cs falju
        public DoktorController(IGrafBaza grafBaza)
        {
            this.GrafBaza = grafBaza;
        }
        // GET: api/Doktor/VratiDoktore
        [HttpGet]
        public IEnumerable<Doktor> VratiDoktore()
        {
            var query = this.GrafBaza.GraphClient
                                     .Cypher
                                     .Match("(doktor: Doktor)")
                                     .Return(doktor => doktor.As<Doktor>())
                                     .Results;

            return query.ToList();
        }

        // GET: api/Doktor/VratiJednogDoktora/korisnickoIme
        [HttpGet("{korisnickoIme}")]
        public Doktor VratiJednogDoktora(string korisnickoIme)
        {
            var upit = this.GrafBaza.GraphClient
                                    .Cypher
                                    .Match("(doktor: Doktor)")
                                    .Where((Doktor doktor) => doktor.KorisnickoIme == korisnickoIme)
                                    .Return(doktor => doktor.As<Doktor>())
                                    .Results;

            return upit.First();
        }

        // POST: api/Doktor/RegistrujDoktora
        [HttpPost]
        public string RegistrujDoktora([FromBody] Doktor noviDoktor)
        {
            var upit = this.GrafBaza.GraphClient
                                    .Cypher
                                    .Match("(doktor: Doktor)")
                                    .Where((Doktor doktor) => doktor.KorisnickoIme == noviDoktor.KorisnickoIme)
                                    .Return(doktor => doktor.As<Doktor>())
                                    .Results;
            if (upit.Count() != 0)
                return "1001";//korisnicko ime je zauzeto

            this.GrafBaza.GraphClient
                         .Cypher
                         .Create("(doktor: Doktor {noviDoktor})")
                         .WithParam("noviDoktor", noviDoktor)
                         .ExecuteWithoutResults(); //ovo zadnje je void, pa i ne trebam da dodeljujem nicemu
            
            return "1000";//ovo znaci da je sve u redu
        }

        //POST: api/Doktor/UlogujDoktora, podaciZaLogin = {korisnickoIme: nesto, lozinka: nestoDrugo}
        [HttpPost]
        public object UlogujDoktora([FromBody] Dictionary<string, string> podaciZaLogin)
        {
            string prosledjenoKorisnickoIme = podaciZaLogin.ElementAt(0).Value;
            string prosledjenaLozinka = podaciZaLogin.ElementAt(1).Value;

            var upit = this.GrafBaza.GraphClient
                                    .Cypher
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
                    return pronadjeniDoktor;//sve je u redu, i korisnik se onda loguje
                else
                    return "1002";//ispravno korisnicko ime, al neispravna lozinka
            }

        }

    }
}
