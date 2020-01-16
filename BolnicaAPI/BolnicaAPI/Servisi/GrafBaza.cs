using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Servisi
{
    public class GrafBaza : IGrafBaza
    {
        public IGraphClient GraphClient { get; }

        public GrafBaza()
        {
            this.GraphClient = new GraphClient(new Uri("http://localhost:7474/db/data"), "neo4j", "bolnica");
            this.GraphClient.Connect();
        }
    }
}
