export interface Izvestaj
{
    idIzvestaja: string,
    idPacijenta: string,
    korisnickoImeDoktora: string //doktora koji je to napisao...
    sadrzaj: string,
    datumPisanja: string //u onom formatu DD-MM-GGGG
}