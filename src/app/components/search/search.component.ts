import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {
  
  artistas: any[] = [];
  loading : boolean;

  error       : boolean;
  mensajeError:string;

  constructor( private _spotifyService: SpotifyService ) { }

  buscar( termino:string ){
    this.loading = true;
    this.error = false;
    
    if( termino.length <= 0 ){
      termino = ' ';
    }

    this._spotifyService.getArtistas( termino ).subscribe( (resp: any) =>{
      this.artistas = resp;
      this.loading = false;
      
      // console.log(this.artistas);
    }, ( err ) => {
      this.error = true;
      this.loading = false;

      this.mensajeError = err.error.error.message
    });
    
  }
}
