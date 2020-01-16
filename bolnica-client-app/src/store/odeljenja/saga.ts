import * as saga from 'redux-saga/effects';
import { AkcijeOdeljenja, UcitavanjeOdeljenjaIzBaze, DodavanjePacijenta, OtpustanjePacijenta } from './model';
import { ProslediOdeljenjeReduceru } from './akcije';
import { Pacijent } from '../../models/Pacijent';

const OdeljenjeOsnovniURL: string = "https://localhost:44389/api/Odeljenje";

export function* rootSagaZaOdeljenja()
{
    yield saga.all([saga.fork(posmatrajZahteve)]);
}

function* posmatrajZahteve()
{
    yield saga.takeEvery(AkcijeOdeljenja.UCITAJ_ODELJENJE_IZ_BAZE, ucitajOdeljenje);
    yield saga.takeEvery(AkcijeOdeljenja.DODAJ_PACIJENTA, dodajPacijenta);
    yield saga.takeEvery(AkcijeOdeljenja.OTPUSTI_PACIJENTA, otpustiPacijenta);
}

function* ucitajOdeljenje(akcija: UcitavanjeOdeljenjaIzBaze)
{
    let { nazivOdeljenja } = akcija;
    
    //--->> ovo vraca ona dva koda, ono da je sve OK, i da nije
    const pacijentiSaNavedenogOdeljenja: Pacijent[] = yield uputiZahtevKaBazi("GET", 
                                                   `${OdeljenjeOsnovniURL}/PacijentiSaOdeljenja/${nazivOdeljenja}`);
    
    console.log(pacijentiSaNavedenogOdeljenja);
    yield saga.put(ProslediOdeljenjeReduceru(pacijentiSaNavedenogOdeljenja));
}

function* dodajPacijenta(akcija: DodavanjePacijenta)
{
    const { pacijent } = akcija;
    
    yield uputiZahtevKaBazi("POST", `${OdeljenjeOsnovniURL}/DodajPacijenta`, pacijent);
}

function* otpustiPacijenta(akcija: OtpustanjePacijenta)
{
    const { IDPacijenta } = akcija;
    yield uputiZahtevKaBazi("DELETE", `${OdeljenjeOsnovniURL}/OtpustiPacijenta/${IDPacijenta}`)
}

function* uputiZahtevKaBazi(metoda: string, URL: string, podaci?: any)//podaci su opcioni, valjda ovako ide
{
    let HTTPZahtev: RequestInit = {
        method: metoda,
        headers:
        {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'Accept': 'application/json, text/plain, */*'
        }
    };

    if(podaci)
        HTTPZahtev.body = JSON.stringify(podaci);

    console.log(podaci);
    let ishodFetcha = yield fetch(URL, HTTPZahtev);
    console.log(ishodFetcha);

    if(metoda !== "DELETE")
        return yield ishodFetcha.json();
}