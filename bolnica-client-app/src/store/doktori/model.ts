import { Doktor } from "../../models/Doktor";

export interface LoginDoktoraPodaci
{
    korisnickoIme: string,
    lozinka: string
}

export enum AkcijeDoktor
{
    LOGIN_DOKTORA_POKUSAJ = "[Akcije doktor] login doktora pokusaj",
    LOGIN_DOKTOR_USPEH = "[Akcije doktor] Login doktora uspeh",
    LOGIN_DOKTORA_POGRESAN_USERNAME = "[Akcije doktor] Login doktora pogresan username",
    LOGIN_DOKTORA_POGRESNA_SIFRA = "[Akcije doktor] Login doktora pogresna sifra",
    REGISTRACIJA_DOKTORA_POKUSAJ = "[Akcije doktor] Registracija doktora pokusaj",
    REGISTRACIJA_DOKTORA_USPEH = "[Akcije doktor] Registracija doktora uspeh",
    REGISTRACIJA_DOKTORA_ZAUZET_USERNAME = "[Akcije doktor] Registracija doktora zauzet username"
}

export interface LoginDoktoraProba
{
    type: AkcijeDoktor,
    loginPodaci: LoginDoktoraPodaci
}

export interface LoginDoktoraUspesan
{
    type: AkcijeDoktor,
    doktor: Doktor
}

export interface LoginDoktoraPogresanUsername
{
    type: AkcijeDoktor,
    usernameJeLos: boolean
}

export interface LoginDoktoraPogresnaSifra
{
    type: AkcijeDoktor,
    lozinkaJeLosa: boolean
}

export interface RegistracijaDoktoraPokusaj
{
    type: AkcijeDoktor,
    noviDoktor: Doktor
}

export interface RegistracijaDoktoraUspeh
{
    type: AkcijeDoktor,
    doktor: Doktor
}

export interface RegistracijaDoktoraZauzetUsername
{
    type: AkcijeDoktor,
    usernameJeZauzet: boolean
}