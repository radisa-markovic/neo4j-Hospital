using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolnicaAPI.Servisi
{
    public interface IGrafBaza
    {
        IGraphClient GraphClient { get; }
    }
}