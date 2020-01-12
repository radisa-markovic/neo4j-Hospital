import React from "react";

interface State
{
    ime: string,
    prezime: string,
    dijagnoza: string,
    odeljenje: string,
    datumSmestanja: string
}

class UnosPacijenta extends React.Component<{}, State>
{
    readonly state = {
        ime: "",
        prezime: "",
        dijagnoza: "",
        odeljenje: "Kardiovaskularno", //hardkodovano je, to je ono iz select-a pa option selected
        datumSmestanja: ""
    };

    render(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Unesi detalje o pacijentu</h1>
                <div className="form-group">
                    <input type="text" 
                           name="ime" 
                           placeholder="Unesi ime" 
                           className="form-control"
                           onChange={this.onChangeInput}/>
                    <input type="text" 
                           name="prezime" 
                           placeholder="Unesi prezime" 
                           className="form-control"
                           onChange={this.onChangeInput}/>
                    <textarea name="dijagnoza" 
                              placeholder="Unesi dijagnozu" 
                              className="form-control"
                              onChange={this.onChangeDijagnoza}/>
                    <p>Odeljenje</p>
                    <select className="form-control" 
                            onChange={this.onChangeOdeljenje}> 
                        <option defaultValue="Kardiovaskularno">Kardiovaskularno</option>
                        <option value="Gastroenterologija">Gastroenterologija</option>
                        <option value="Grudno">Grudno</option>
                        <option value="Ortopedija">Ortopedija</option>
                        <option value="Fizikalno">Fizikalno</option>
                        <option value="Ostalo">Ostalo</option>
                    </select>
                    <button className="btn btn-primary btn-lg"
                            onClick={this.potvrdiPacijenta}>
                        Potvrdi detalje
                    </button>
                </div>
            </div>
        );
    }

    //neki pokusaj da za mnogo onChange eventova imam jedan hendler
    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ [event.target.name] : event.target.value } as Pick<State, any>);
    }

    onChangeDijagnoza = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({dijagnoza : event.target.value});
    }

    onChangeOdeljenje = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({odeljenje: event.target.value});
    }

    potvrdiPacijenta = (): void => {
        //this.setState({ datumSmestanja: new Date() })
        let danasnjiDatum = new Date();
        let dan = danasnjiDatum.getDate().toString();
        let mesec = (danasnjiDatum.getMonth() + 1).toString();
        let godina = danasnjiDatum.getFullYear().toString();

        if(parseInt(dan) < 10)
            dan = '0' + dan;
        
        if(parseInt(mesec) < 10)
            mesec = '0' + mesec;

        let punDatumPrijave: string = `${dan}-${mesec}-${godina}`;
        console.log(punDatumPrijave);
        
        alert(`Klik na dugme`);
    }
}

export default UnosPacijenta;