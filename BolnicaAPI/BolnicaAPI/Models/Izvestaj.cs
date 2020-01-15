using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Models
{
    public class Izvestaj
    {
        public string IDIzvestaja { get; set; }
        public string IDPacijenta { get; set; }
        public string KorisnickoImeDoktora { get; set; }
        public string Sadrzaj { get; set; }
        public string DatumPisanja { get; set; }
    }
}
