import React from "react";
import { Pacijent } from "../models/Pacijent";
import { RouteComponentProps, Redirect, Link } from "react-router-dom";
import { RootStanje } from "../store";
import { Dispatch } from "redux";
import { A_UcitajOdeljenjeIzBaze, A_VratiStatuseNaPocetno } from "../store/odeljenja/akcije";
import { connect } from "react-redux";
import PacijentView from "./PacijentView";

import vojaMitingDOS from '../slikeZaHome/VojaMiting.jpg'

//putanja: /Odeljenja/{Naziv}
interface Props
{
    pacijenti: Pacijent[],
    nekoJePrijavljen: boolean,
    odeljenjeSeUcitava: boolean,
    odeljenjeJePrazno: boolean
}

interface ActionProps
{
    ucitajPacijente: (nazivOdeljenja: string) => void,
    resetujStatuse: () => void
}

type CompleteProps = Props & ActionProps & RouteComponentProps<{Naziv: string}>;

class Odeljenje extends React.Component<CompleteProps, {}>
{
    componentDidMount(): void
    {
        this.props.ucitajPacijente(this.props.match.params.Naziv);
    }

    componentWillUnmount(): void
    {
        this.props.resetujStatuse();
    }

    render(): JSX.Element
    {
        if(!this.props.nekoJePrijavljen)
            return <Redirect to="/" />;

        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>{this.props.match.params.Naziv}</h1>
                <h1 className="col-sm-6 offset-sm-3 text-center border">
                     <Link to="/Odeljenja">Nazad u odeljenja</Link> 
                </h1>
                {
                    this.props.odeljenjeSeUcitava?
                              this.renderujLoading()
                            : this.props.odeljenjeJePrazno? <h1>Nema nikog u odeljenju</h1>
                                                           : this.izrenderujPacijente()
                }
            </div>
        );
    }

    izrenderujPacijente(): JSX.Element[]
    {
        return (
            this.props.pacijenti.map((pacijent: Pacijent, redniBroj: number) => {
                return <PacijentView key={redniBroj} 
                                     pacijent={pacijent}
                                     odeljenje={this.props.match.params.Naziv}/>
            })
        );
    }

    renderujLoading(): JSX.Element
    {
        return(
            <React.Fragment>
                <h3 className="col-sm-6 offset-sm-3 text-center border">PRIJAVA SE OBRAĐUJE...</h3>
                <img src={vojaMitingDOS} alt="Nema slike" className="col-sm-18 offset-sm-1 text-center"/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji, odeljenjaDetalji } = rootStanje;
    return {
        nekoJePrijavljen: doktorDetalji.doktorJePrijavljen,
        pacijenti: odeljenjaDetalji.pacijenti,
        odeljenjeSeUcitava: odeljenjaDetalji.odeljenjeSeUcitava,
        odeljenjeJePrazno: odeljenjaDetalji.odeljenjeJePrazno
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        ucitajPacijente: (nazivOdeljenja: string) => dispatch(A_UcitajOdeljenjeIzBaze(nazivOdeljenja)),
        resetujStatuse: () => dispatch(A_VratiStatuseNaPocetno())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Odeljenje);