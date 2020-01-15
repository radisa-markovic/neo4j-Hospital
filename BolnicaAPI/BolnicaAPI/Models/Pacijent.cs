using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Models
{
    public class Pacijent
    {
        public string IDPacijenta { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Odeljenje { get; set; }
        public string DatumSmestanja { get; set; }//format je DD-MM-GGGG, sam se generise, po prijemu pacijenta
    }
}
