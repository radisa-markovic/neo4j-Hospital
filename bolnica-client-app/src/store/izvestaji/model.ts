import { Izvestaj } from "../../models/Izvestaj";

export enum AkcijeIzvestaji
{
    DODAJ_IZVESTAJ = "[Akcije izvestaji] Dodaj izvestaj",
    VRATI_IZVESTAJE_PACIJENTA = "[Akcije izvestaji] Vrati izvestaje pacijenta",
    PROSLEDI_IZVESTAJE_REDUCERU = "[Akcije izvestaji] Prosledi izvestaje reduceru",
    PROSLEDI_IZVESTAJE_REDUCERU_GRESKA = "[Akcije izvestaji] Prosledi izvestaje reduceru greska",//<<--nema izvestaja
    VRATI_STATUSE_ZA_UCITAVANJE = "[Akcije izvestaji] Vrati statuse za ucitavanje"
}

export interface DodajIzvestaj
{
    type: AkcijeIzvestaji,
    noviIzvestaj: Izvestaj
}

export interface VratiPacijentoveIzvestaje
{
    type: AkcijeIzvestaji,
    IDPacijenta: string
}

export interface ProslediIzvestajeReduceru
{
    type: AkcijeIzvestaji,
    izvestaji: Izvestaj[]
}

export interface ProsledjivanjeIzvestajaReduceruGreska
{
    type: AkcijeIzvestaji
}

export interface ResetujStatuseZaUcitavanje
{
    type: AkcijeIzvestaji
}