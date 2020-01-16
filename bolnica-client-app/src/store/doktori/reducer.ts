import { Doktor } from "../../models/Doktor";
import { Action } from "redux";
import { AkcijeDoktor, LoginDoktoraUspesan, LoginDoktoraPogresanUsername, LoginDoktoraPogresnaSifra, RegistracijaDoktoraUspeh, RegistracijaDoktoraZauzetUsername, LoginDoktoraProba } from "./model";

export interface DoktorStanje
{
    doktor: Doktor,
    prijavaSeObradjuje: boolean,
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
    prijavaSeObradjuje: false,
    doktorJePrijavljen: false,
    korisnickoImeJeZauzeto: false,
    korisnickoImeNePostoji: false,
    lozinkaJePogresna: false
};

export default function reducer(stanje: DoktorStanje = pocetnoStanje, akcija: Action<any>): DoktorStanje
{
    switch(akcija.type)
    {
        case AkcijeDoktor.LOGIN_DOKTORA_POKUSAJ:
        {
            return {
                ...stanje,
                prijavaSeObradjuje: true
            }
        }

        case AkcijeDoktor.REGISTRACIJA_DOKTORA_POKUSAJ:
        {
            return {
                ...stanje,
                prijavaSeObradjuje: true
            }
        }

        case AkcijeDoktor.LOGIN_DOKTOR_USPEH:
        {
            const { doktor } = akcija as LoginDoktoraUspesan;
            return {
                ...stanje,
                doktor: doktor,
                prijavaSeObradjuje: false,
                doktorJePrijavljen: true,
                korisnickoImeJeZauzeto: false,
                korisnickoImeNePostoji: false,
                lozinkaJePogresna: false,
            }
        }
        
        case AkcijeDoktor.LOGIN_DOKTORA_NEPOSTOJECI_USERNAME:
        {
            const { usernameJeLos } = akcija as LoginDoktoraPogresanUsername;
            return {
                ...stanje,
                korisnickoImeNePostoji: usernameJeLos,
                prijavaSeObradjuje: false,
                lozinkaJePogresna: false 
            }
        }

        case AkcijeDoktor.LOGIN_DOKTORA_POGRESNA_SIFRA:
        {
            const { lozinkaJeLosa } = akcija as LoginDoktoraPogresnaSifra;
            return {
                ...stanje,
                korisnickoImeNePostoji: false,
                prijavaSeObradjuje: false,
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
                prijavaSeObradjuje: false,
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
                prijavaSeObradjuje: false,
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
                prijavaSeObradjuje: false,
                korisnickoImeJeZauzeto: false,
                korisnickoImeNePostoji: false,
                lozinkaJePogresna: false
            }
        }

        default:
            return stanje;
    }
}