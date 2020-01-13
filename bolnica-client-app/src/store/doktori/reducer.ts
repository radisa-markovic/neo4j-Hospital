import { Doktor } from "../../models/Doktor";
import { Action } from "redux";
import { AkcijeDoktor, LoginDoktoraUspesan, LoginDoktoraPogresanUsername, LoginDoktoraPogresnaSifra, RegistracijaDoktoraUspeh, RegistracijaDoktoraZauzetUsername } from "./model";

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
        case AkcijeDoktor.LOGIN_DOKTOR_USPEH:
        {
            const { doktor } = akcija as LoginDoktoraUspesan;
            return {
                ...stanje,
                doktor: doktor,
                doktorJePrijavljen: true,
                korisnickoImeJeZauzeto: false,
                korisnickoImeNePostoji: false,
                lozinkaJePogresna: false
            }
        }
        
        case AkcijeDoktor.LOGIN_DOKTORA_NEPOSTOJECI_USERNAME:
        {
            const { usernameJeLos } = akcija as LoginDoktoraPogresanUsername;
            return {
                ...stanje,
                korisnickoImeNePostoji: usernameJeLos,
                lozinkaJePogresna: false //-->> logika: dva atributa iznad se medjusobno ponistavaju, jer..
                //..jos kao ne znam dal taj username sto neko unosi nema odgovarajucu sifru
            }
        }

        case AkcijeDoktor.LOGIN_DOKTORA_POGRESNA_SIFRA:
        {
            const { lozinkaJeLosa } = akcija as LoginDoktoraPogresnaSifra;
            return {
                ...stanje,
                korisnickoImeNePostoji: false,
                lozinkaJePogresna: lozinkaJeLosa
            }
        }

        case AkcijeDoktor.REGISTRACIJA_DOKTORA_USPEH:
        {
            const { doktor } = akcija as RegistracijaDoktoraUspeh;
            return {
                ...stanje,
                doktor: doktor,
                doktorJePrijavljen: true,
                korisnickoImeJeZauzeto: false,
                korisnickoImeNePostoji: false,
                lozinkaJePogresna: false
            }
        }

        case AkcijeDoktor.REGISTRACIJA_DOKTORA_ZAUZET_USERNAME:
        {
            const { usernameJeZauzet } = akcija as RegistracijaDoktoraZauzetUsername;
            return {
                ...stanje,
                korisnickoImeJeZauzeto: usernameJeZauzet
            }
        }

        case AkcijeDoktor.ODJAVI_DOKTORA:
        {
            return {
                ...stanje,
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
            }
        }

        default:
            return stanje;
    }
}