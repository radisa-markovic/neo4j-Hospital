import * as saga from 'redux-saga/effects';
import { AkcijeOdeljenja, UcitajOdeljenjaIzBaze, DodajPacijenta, OtpustiPacijenta } from './model';
import { A_ProslediOdeljenjeReduceru, A_ProslediPraznoOdeljenje } from './akcije';
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

function* ucitajOdeljenje(akcija: UcitajOdeljenjaIzBaze)
{
    let { nazivOdeljenja } = akcija;
    
    const pacijentiSaNavedenogOdeljenja: Pacijent[] = yield uputiZahtevKaBazi("GET", 
                                        `${OdeljenjeOsnovniURL}/PacijentiSaOdeljenja/${nazivOdeljenja}`);
    
    if(pacijentiSaNavedenogOdeljenja.length === 0)
        yield saga.put(A_ProslediPraznoOdeljenje());
    else
        yield saga.put(A_ProslediOdeljenjeReduceru(pacijentiSaNavedenogOdeljenja));
}

function* dodajPacijenta(akcija: DodajPacijenta)
{
    const { pacijent } = akcija;
    
    yield uputiZahtevKaBazi("POST", `${OdeljenjeOsnovniURL}/DodajPacijenta`, pacijent);
}

function* otpustiPacijenta(akcija: OtpustiPacijenta)
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

    let ishodFetcha = yield fetch(URL, HTTPZahtev);
  
    if(metoda !== "DELETE" && metoda !== "POST")
        return yield ishodFetcha.json();
}