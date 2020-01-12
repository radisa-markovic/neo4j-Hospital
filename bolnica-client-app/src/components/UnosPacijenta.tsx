import React from "react";

interface State
{
    ime: string,
    prezime: string,
    dijagnoza: string,
    datumSmestanja: string
}

class UnosPacijenta extends React.Component<{}, State>
{
    readonly state = {
        ime: "",
        prezime: "",
        dijagnoza: "",
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
                    <input type="text" 
                           name="dijagnoza" 
                           placeholder="Unesi dijagnozu" 
                           className="form-control"
                           onChange={this.onChangeInput}/>

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

    potvrdiPacijenta = (): void => {
        this.setState({ datumSmestanja: new Date().toLocaleDateString() })
        console.log(this.state);
        alert(`Klik na dugme`);
    }
}

export default UnosPacijenta;