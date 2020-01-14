using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Models
{
    public class Izvestaj
    {
        public string Identifikator { get; set; }
        public string IdPacijenta { get; set; }
        public string ImePacijenta { get; set; }
        public string PrezimePacijenta { get; set; }
        public string Sadrzaj { get; set; }
        public string IdDoktora { get; set; }
        public string ImeDoktora { get; set; }
        public string PrezimeDoktora { get; set; }
        public string DatumPisanja { get; set; }
    }
}
