import { Pacijent } from "./Pacijent";

export interface Izvestaj
{
    identifikator: string,
    idPacijenta: string,
    imePacijenta: string,
    prezimePacijenta: string,
    sadrzaj: string,
    idDoktora: string
    imeDoktora: string,
    prezimeDoktora: string,
    datumPisanja: string //u onom formatu DD-MM-GGGG
}