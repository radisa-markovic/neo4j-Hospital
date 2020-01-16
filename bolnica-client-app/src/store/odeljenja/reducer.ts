import { Pacijent } from "../../models/Pacijent";
import { Action } from "redux";
import { AkcijeOdeljenja, DodavanjePacijenta, OtpustanjePacijenta, ProsledjivanjeOdeljenjaUReducer, UcitavanjeOdeljenjaIzBaze, ProslediPraznoOdeljenjeUReducer } from "./model";

export interface StanjeOdeljenja
{
    nazivOdeljenja: string,
    pacijenti: Pacijent[],
    odeljenjeSeUcitava: boolean,
    odeljenjeJePrazno: boolean
}

const pocetnoStanje: StanjeOdeljenja = {
    nazivOdeljenja: '',
    pacijenti: [],
    odeljenjeSeUcitava: true,
    odeljenjeJePrazno: true //odakle znam dal nesto ima ako je prazno
};

export default function reducer(stanje: StanjeOdeljenja = pocetnoStanje, akcija: Action<any>): StanjeOdeljenja
{
    switch(akcija.type)
    {
        case AkcijeOdeljenja.UCITAJ_ODELJENJE_IZ_BAZE:
        {
            const { nazivOdeljenja } = akcija as UcitavanjeOdeljenjaIzBaze;
            return {
                ...stanje,
                nazivOdeljenja: nazivOdeljenja
            };
        }

        case AkcijeOdeljenja.PROSLEDI_PRAZNO_ODELJENJE_U_REDUCER:
        {
            return {
                ...stanje,
                odeljenjeSeUcitava: false,
                odeljenjeJePrazno: true
            }            
        }

        case AkcijeOdeljenja.PROSLEDI_ODELJENJE_U_REDUCER:
        {
            const { pacijenti } = akcija as ProsledjivanjeOdeljenjaUReducer;
            return {
                ...stanje,
                pacijenti: pacijenti,
                odeljenjeSeUcitava: false,
                odeljenjeJePrazno: false
            }
        }

        case AkcijeOdeljenja.DODAJ_PACIJENTA:
        {
            const { pacijent } = akcija as DodavanjePacijenta;
            return {
                ...stanje,
                pacijenti: [...stanje.pacijenti, pacijent]
            }
        }

        case AkcijeOdeljenja.OTPUSTI_PACIJENTA:
        {
            const { IDPacijenta } = akcija as OtpustanjePacijenta;
            return {
                ...stanje,
                pacijenti: stanje.pacijenti.filter(pacijent => pacijent.idPacijenta !== IDPacijenta)
            }
        }

        case AkcijeOdeljenja.VRATI_STATUSE_NA_POCETNO:
        {
            return {
                ...stanje,
                odeljenjeSeUcitava: true,
                odeljenjeJePrazno: true
            }
        }

        default:
            return stanje;
    }
}