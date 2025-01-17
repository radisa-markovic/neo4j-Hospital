﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BolnicaAPI.Models;
using BolnicaAPI.Servisi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;

namespace BolnicaAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PacijentController : ControllerBase
    {
        private IGrafBaza GrafBaza { get; }

        public PacijentController(IGrafBaza grafBaza)
        {
            this.GrafBaza = grafBaza;
        }

        // GET: api/Pacijent/Pacijenti
        [HttpGet]
        public IEnumerable<Pacijent> Pacijenti()
        {
            var upit = this.GrafBaza.GraphClient
                                    .Cypher
                                    .Match("(pacijent: Pacijent)")
                                    .Return(pacijent => pacijent.As<Pacijent>())
                                    .Results;
            return upit.ToList();
        }

        // GET: api/Pacijent/PodaciOPacijentu/idPacijenta
        [HttpGet("{idPacijenta}")]
        public Pacijent PodaciOPacijentu(string idPacijenta)
        {
            var upit = this.GrafBaza.GraphClient
                                    .Cypher
                                    .Match("(pacijent: Pacijent)")
                                    .Where((Pacijent pacijent) => pacijent.IDPacijenta == idPacijenta)
                                    .Return(pacijent => pacijent.As<Pacijent>())
                                    .Results;
            return upit.First(); 
        }

    }
}
