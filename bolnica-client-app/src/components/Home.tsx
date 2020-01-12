import React from "react";
import vojaParlamentarniIzbori from '../slikeZaHome/VojaParlamentarniIzbori.jpg';
import vojaMitingDOS from '../slikeZaHome/VojaMiting.jpg'
import vojaKalas from '../slikeZaHome/VojaKalas.jpg'
import vojaSrecan from '../slikeZaHome/VojaSrecan.jpg'
import stariDSS from '../slikeZaHome/stariDSS.jpg'

class HomePage extends React.Component<{}, {}>
{
    render(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-2 text-center">
                <h1>Dobrodošli u bolnicu "dr Vojislav Koštunica"</h1>
                <img src={vojaParlamentarniIzbori} alt="Nema slike" className="col-sm-12 offset-sm-3 text-center"/>
                <img src={vojaKalas} alt="Nema slike" className="col-sm-12 offset-sm-3 text-center"/>
                <img src={vojaSrecan} alt="Nema slike" className="col-sm-12 offset-sm-3 text-center"/>
                <img src={vojaMitingDOS} alt="Nema slike" className="col-sm-12 offset-sm-3 text-center"/>
                <img src={stariDSS} alt="Nema slike" className="col-sm-12 offset-sm-3 text-center"/>
            </div>
        );
    }
}

export default HomePage;