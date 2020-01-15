using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Models
{
    public class Odeljenje
    {
        public string Naziv { get; set; } //--->> omogucicu da ovo bude unikatno
        public int Kapacitet { get; set; } //--->> ako sam lepo razumeo, ovo neo4j ne moze da sam obezbedi, al znam foru..
        //... na frontendu regulisem ubacivanje, ako nema mesta, onda cu da pravim vezu :CEKA izmedju pacijenta i odeljenja
    }
}
