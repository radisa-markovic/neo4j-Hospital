import React from "react";
import { Pacijent } from "../models/Pacijent";
import { RouteComponentProps, Redirect, Link } from "react-router-dom";
import { RootStanje } from "../store";
import { Dispatch } from "redux";
import { UcitajOdeljenjeIzBaze } from "../store/odeljenja/akcije";
import { connect } from "react-redux";
import PacijentView from "./PacijentView";

//putanja: /Odeljenja/{Naziv}
interface Props
{
    pacijenti: Pacijent[],
    nekoJePrijavljen: boolean
}

interface ActionProps
{
    ucitajPacijente: (nazivOdeljenja: string) => void
}

type CompleteProps = Props & ActionProps & RouteComponentProps<{Naziv: string}>;

class Odeljenje extends React.Component<CompleteProps, {}>
{
    componentDidMount(): void
    {
        console.log(!this.props.pacijenti);
        console.log(this.props.pacijenti);
        this.props.ucitajPacijente(this.props.match.params.Naziv);
    }

    render(): JSX.Element
    {
        if(!this.props.nekoJePrijavljen)
            return <Redirect to="/" />;

        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1><Link to="/Odeljenja">Nazad</Link> || {this.props.match.params.Naziv}</h1>
                {this.props.pacijenti && this.props.pacijenti.map((pacijent: Pacijent, redniBroj: number) => {
                    return <PacijentView key={redniBroj} 
                                         pacijent={pacijent}
                                         odeljenje={this.props.match.params.Naziv}/>  
                })}
            </div>
        );
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji, odeljenjaDetalji } = rootStanje;
    return {
        nekoJePrijavljen: doktorDetalji.doktorJePrijavljen,
        pacijenti: odeljenjaDetalji.pacijenti
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        ucitajPacijente: (nazivOdeljenja: string) => dispatch(UcitajOdeljenjeIzBaze(nazivOdeljenja))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Odeljenje);