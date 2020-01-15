import { Izvestaj } from "../../models/Izvestaj";

export enum AkcijeIzvestaji
{
    DODAJ_IZVESTAJ = "[Akcije izvestaji] Dodaj izvestaj",
    VRATI_IZVESTAJE_PACIJENTA = "[Akcije izvestaji] Vrati izvestaje pacijenta",
    PROSLEDI_IZVESTAJE_REDUCERU = "[Akcije izvestaji] Prosledi izvestaje reduceru"
}

export interface DodavanjeIzvestaja
{
    type: AkcijeIzvestaji,
    noviIzvestaj: Izvestaj
}

export interface VracanjeIzvestajaPacijenta
{
    type: AkcijeIzvestaji,
    IDPacijenta: string
}

export interface ProsledjivanjeIzvestajaReduceru
{
    type: AkcijeIzvestaji,
    izvestaji: Izvestaj[]
}