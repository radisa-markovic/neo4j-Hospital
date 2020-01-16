export interface Izvestaj
{
    IDIzvestaja: string,
    idPacijenta: string,
    KorisnickoImeDoktora: string //doktora koji je to napisao...
    sadrzaj: string,
    datumPisanja: string //u onom formatu DD-MM-GGGG
}