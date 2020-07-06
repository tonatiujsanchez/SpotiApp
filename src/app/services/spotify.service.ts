import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token:string= 'BQBRF0kcAIYrgnYQnAnIO865ewyuTikXMP6cwOOoFD3KVOmr2FSH8novQKrPdZGi8swoiEfT0IcYsI2rhiE';
  limite:number = 20;

  constructor( private http: HttpClient ) { 

  }

  getQuery( query ){
    let url = `https://api.spotify.com/v1${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(){
      return this.getQuery( `/browse/new-releases?limit=${ this.limite }` ).pipe( map( data=>{
        return data['albums'].items;
      }));
  }

  getArtistas( termino: string ){      
      return this.getQuery( `/search?q=${ termino }&type=artist&limit=${ this.limite }`)
        .pipe( map( data => data['artists'].items ));
  }

  getArtista(id:string){
    return this.getQuery(`/artists/${id}`);
  }
  
  getTopTracks( id: string ){
    return this.getQuery(`/artists/${id}/top-tracks?country=US`)
      .pipe(map( tracks => tracks['tracks'] ));
  }
}
