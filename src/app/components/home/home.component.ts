import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  
  nuevasCanciones: any[] = [];
  loading        : boolean;
  
  error       : boolean;
  mensajeError:string;
  
  constructor( private _spotifyService: SpotifyService ) { 
    this.loading = true;
    this.error = false;

    _spotifyService.getNewReleases().subscribe( (data:any) =>{
      this.nuevasCanciones = data;      
      this.loading = false;

    }, ( err ) => {
      this.error = true;
      this.loading = false;

      this.mensajeError = err.error.error.message
    });
  }

  ngOnInit(): void {
  }

}
