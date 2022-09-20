import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  apiUrl:string = "https://rickandmortyapi.com/api/character/"
  apiUrlP:string = "https://rickandmortyapi.com/api/character/?page="
  apiUrlR:string = "https://rickandmortyapi.com/api/character/?name="

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

  getCharByName(name:string){

      return this.http.get(this.apiUrlR + name)

  }

  constructor( private http: HttpClient ) { }
}
