using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Models
{
    public class Doktor
    {
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Specijalnost { get; set; }
        public string KorisnickoIme { get; set; }
        public string Lozinka { get; set; }

        //public Doktor() //jer to hoce onaj neo4j klijent
        //{
        //    //this.Ime = "";
        //    //this.Prezime = "";
        //    //this.Specijalnost = "";
        //    //this.KorisnickoIme = "";
        //    //this.Lozinka = "";
        //}

        //public Doktor(string ime, string prezime, string specijalnost, string korisnickoIme, string lozinka)
        //{
        //    this.Ime = ime;
        //    this.Prezime = prezime;
        //    this.Specijalnost = specijalnost;
        //    this.KorisnickoIme = korisnickoIme;
        //    this.Lozinka = lozinka;
        //}
    }
}
