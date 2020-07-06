import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent{

  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];
  constructor( private activatedRoute: ActivatedRoute,
               private _spotifyService: SpotifyService ) {

    this.activatedRoute.params.subscribe( (params:any) =>{
      this.getArtista( params.id );
    });
    
  }

  getArtista( id:string ){
    this.loading = true;
    
    this._spotifyService.getArtista( id ).subscribe( resp=>{

      this.artista = resp;
      this.getTopTracks( id );

      this.loading = false;
    });
  }
  
  getTopTracks( id: string ){
    this._spotifyService.getTopTracks( id ).subscribe( tracks =>{
      this.topTracks = tracks;
    });
  }

}
