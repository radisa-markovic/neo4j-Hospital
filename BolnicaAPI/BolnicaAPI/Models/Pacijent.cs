using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Models
{
    public class Pacijent
    {
        //ovo mi treba da bih mogao da razlikujem dva pacijenta koja potencijalno imaju ista imena i prezimena, doktore...
        //ovaj parametar ce sam da se generise, neki djavo sa npm-a cu da skinem da to regulise

        //------>> razmisliti o tome kako da upamtim izvestaje koje ovaj pacijent ima, i kako da upamtim njegovog doktora..
        //..---->> a kad vec pamtim doktora, mozda mogu i da upamtim na kojoj je ordinaciji pacijent, bem ga
        public string Identifikacija { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Dijagnoza { get; set; }
        public string DatumSmestanja { get; set; }//format je DD-MM-GGGG, sam se generise, po prijemu pacijenta
    }
}
