import { Doktor } from "../../models/Doktor";
import { Action } from "redux";

export interface DoktorStanje
{
    doktor: Doktor
    doktorJePrijavljen: boolean,
    korisnickoImeJeZauzeto: boolean,
    korisnickoImeNePostoji: boolean,
    lozinkaJePogresna: boolean
}

const pocetnoStanje: DoktorStanje = {
    doktor: {
        ime: '',
        prezime: '',
        specijalnost: '',
        korisnickoIme: '',
        lozinka: ''
    },
    doktorJePrijavljen: false,
    korisnickoImeJeZauzeto: false,
    korisnickoImeNePostoji: false,
    lozinkaJePogresna: false
};

export default function reducer(stanje: DoktorStanje = pocetnoStanje, akcija: Action<any>): DoktorStanje
{
    switch(akcija.type)
    {
        default:
            return stanje;
    }
}