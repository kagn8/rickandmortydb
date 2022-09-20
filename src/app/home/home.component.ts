import { Component, OnInit, OnChanges } from '@angular/core';
import { Episode } from '../episode';
import { Personaggio } from '../personaggio';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges{
  constructor(private serv: ServService) {}

  ngOnInit(): void {
    this.getAllCharPage(this.currentPage);
    this.serv.favS
    localStorage.clear()
  }
  ngOnChanges(): void {
    this.serv.favS
    console.log(this.serv.favS);
  }

  currentPage: number = 1;

  loading: boolean = false;

  dettagli: boolean = false;

  testoRicerca: string = '';

  prev: boolean = false;
  next: boolean = true;

  home: Personaggio[] = [];

  fav: Personaggio[] = this.serv.favS

  singolo!: Personaggio;

  ep = false;

  favArr:boolean[] =[];

  episodeList: string = ' '

  getAllChar() {
    this.serv.getAll().subscribe((res: any) => {});
  }
  getAllCharPage(page: number) {
    this.loading = true;
    this.home = [];
    this.serv.getCharForPage(page).subscribe((res: any) => {
      this.home = res.results;
      this.favArr=[]
      for (const el of res.results) {
        this.checkFav(el)
        
      }
      // console.log(this.favArr);
      

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
  s:string =""

  getOne(id: number) {
    return this.serv.getSingle(id).subscribe((res: any) => {
      this.singolo = res
      this.episodeList = ''
      this.singolo.episode.forEach((e: string) => {
        if (e.length == 41) {
         this.episodeList += e.slice(40, 41) + ",";
        } else if (e.length == 42) {
         this.episodeList += e.slice(40, 42) + ",";
        }
        
      });
      this.episodeList=this.episodeList.slice(0, -1)
      this.dettagli = true;
    });
  }
  episode:any[] =[]
  getEpisodeList(){
    this.serv.getEpisode(this.episodeList).subscribe((res:any)=> {
      for (const ex of res) {
        
        this.episode.push(ex)
      }
    }
    
    )
    console.log(this.episode);
  }

  ricerca(): any {
    this.serv.getCharByName(this.testoRicerca).subscribe(
      (res: any) => {
        this.home = res.results;
      },
      (error) => (this.home = [])
    );
  }

  addToFav(i:number){
    this.favArr[i] = !this.favArr[i]

    if (this.fav.find(e=> e.id == this.singolo.id)) {
      this.fav.splice(this.serv.favS.indexOf(this.singolo), 1);
      localStorage.removeItem("fav" +String(this.singolo.id))
      
    }else {this.serv.favS.push(this.singolo); 
      localStorage.setItem("fav" +String(this.singolo.id), String(this.singolo.id))
      }
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


  checkFav(singolo:Personaggio){
  
    if (localStorage.getItem("fav"+singolo.id)) {
    
      return true
    }else return false
  }
}
