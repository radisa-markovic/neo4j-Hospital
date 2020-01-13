export interface Pacijent
{
    ime: string,
    prezime: string,
    dijagnoza: string, //ili odeljenje, videcu, samo je sad fora sto ne znam jos uvek kako da predstavim veze
    //izmedju izvestaja koje dobije pacijent i zasebnih izvestaja... Moram jos malo da proucavam ove graf baze
    datumSmestanja: string //imam ono sto izdvaja u formatu DD-MM-GGGG
}