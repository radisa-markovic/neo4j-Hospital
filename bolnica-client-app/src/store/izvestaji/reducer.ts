import { Izvestaj } from "../../models/Izvestaj";
import { Action } from "redux";
import { AkcijeIzvestaji, ProslediIzvestajeReduceru, VratiPacijentoveIzvestaje, DodajIzvestaj } from "./model";

export interface StanjeIzvestaja
{
    IDPacijenta: string,
    izvestaji: Izvestaj[],
    izvestajiSuUcitani: boolean,
    izvestajiPostoje: boolean
}

const pocetnoStanje: StanjeIzvestaja = {
    IDPacijenta: '',
    izvestaji: [],
    izvestajiSuUcitani: false,
    izvestajiPostoje: false
};

export default function reducer(stanje: StanjeIzvestaja = pocetnoStanje, akcija: Action<any>): StanjeIzvestaja
{
    switch(akcija.type)
    {
        case AkcijeIzvestaji.VRATI_IZVESTAJE_PACIJENTA:
        {
            const { IDPacijenta } = akcija as VratiPacijentoveIzvestaje;
            return {
                ...stanje,
                IDPacijenta: IDPacijenta
            }
        }

        case AkcijeIzvestaji.PROSLEDI_IZVESTAJE_REDUCERU_GRESKA:
        {
            return {
                ...stanje,
                izvestajiSuUcitani: true,
                izvestajiPostoje: false
            }
        }

        case AkcijeIzvestaji.PROSLEDI_IZVESTAJE_REDUCERU:
        {
            const { izvestaji } = akcija as ProslediIzvestajeReduceru;
            return {
                ...stanje,
                izvestaji: izvestaji,
                izvestajiSuUcitani: true,
                izvestajiPostoje: true
            }
        }

        case AkcijeIzvestaji.DODAJ_IZVESTAJ:
        {
            const { noviIzvestaj } = akcija as DodajIzvestaj;
            return {
                ...stanje,
                izvestaji: [...stanje.izvestaji, noviIzvestaj]
            }
        }

        case AkcijeIzvestaji.VRATI_STATUSE_ZA_UCITAVANJE:
        {
            return {
                ...stanje,
                IDPacijenta: '',
                izvestaji: [],
                izvestajiSuUcitani: false,
                izvestajiPostoje: false
            }
        }

        default:
            return stanje;
    }
}