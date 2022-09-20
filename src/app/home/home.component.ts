import { Component, OnInit } from '@angular/core';
import { Personaggio } from '../personaggio';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private serv: ServService) {}

  ngOnInit(): void {
    this.getAllCharPage(this.currentPage);
  }

  currentPage: number = 1;

  loading: boolean = false;

  dettagli: boolean = false;

  testoRicerca: string = '';

  prev: boolean = false;
  next: boolean = true;

  home: Personaggio[] = [];

  fav: Personaggio[] = [];

  singolo!: Personaggio;

  ep = false;

  favArr:number[] =[];

  episodeList: string = ' '

  getAllChar() {
    this.serv.getAll().subscribe((res: any) => {});
  }
  getAllCharPage(page: number) {
    this.loading = true;
    this.home = [];
    this.serv.getCharForPage(page).subscribe((res: any) => {
      this.home = res.results;
      if (page <= 1) {
        this.prev = false;
        this.next = true;
      } else if (page == 42) {
        this.next = false;
        this.prev = true;
      } else {
        this.next = true;
        this.prev = true;
      }
      this.currentPage = page;

      this.loading = false;
    });
  }
  getOne(id: number) {
    return this.serv.getSingle(id).subscribe((res: any) => {
      this.singolo = res
      this.episodeList = ''
      this.singolo.episode.forEach((e: string) => {
        if (e.length == 41) {
          this.episodeList += e.slice(40, 41);
        } else if (e.length == 42) {
          this.episodeList += e.slice(40, 42);
        }
      });

      this.dettagli = true;
    });
  }

  ricerca(): any {
    this.serv.getCharByName(this.testoRicerca).subscribe(
      (res: any) => {
        this.home = res.results;
      },
      (error) => (this.home = [])
    );
  }

  addToFav(){
    if (this.fav.find(e=> e.id == this.singolo.id)) {
      this.fav.splice(this.fav.indexOf(this.singolo), 1);
      this.favArr.splice(this.favArr.indexOf(this.singolo.id), 1);
      
      console.log(this.favArr);
      
    }else {this.fav.push(this.singolo);  this.favArr.push(this.singolo.id); console.log(this.favArr);}
  }
  
  getFav(){
    if (this.fav.length >= 1) {
      this.home = this.fav
     
    }else{
      alert("the favorite list i empty")
    }
  }
  getHome(){
    this.getAllCharPage(1);
  }
}
