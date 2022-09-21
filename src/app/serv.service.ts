import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personaggio } from './personaggio';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  apiUrl:string = "https://rickandmortyapi.com/api/character/"
  apiUrlP:string = "https://rickandmortyapi.com/api/character/?page="
  apiUrlR:string = "https://rickandmortyapi.com/api/character/?name="
  apiUrlE:string = "https://rickandmortyapi.com/api/episode/"

  getAll(){
    return this.http.get(this.apiUrl)
  }
  getCharForPage(page:number){
    return this.http.get(this.apiUrlP + page)
  }
  
  tuttiIPersonaggi:object[] = []

  getSingle(id:number){
    return this.http.get(this.apiUrl + id)
  }
  getEpisode(s:string){
    return this.http.get(this.apiUrlE + s)
  }

  getCharByName(name:string){
      return this.http.get(this.apiUrlR + name)
  }

  favS:Personaggio[] =[]

  constructor( private http: HttpClient ) { }
}
