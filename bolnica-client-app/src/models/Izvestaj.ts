import Pacijent from "../components/Pacijent";

export interface Izvestaj
{
    id: string,
    pacijent: Pacijent,
    sadrzaj: string,
    imeDoktora: string,
    prezimeDoktora: string,
    datumPisanja: string //u onom formatu DD-MM-GGGG
}