import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '4yYYqHIjJiry5EfGEYL0STztRDJcalGn';

  private servicioURL: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('imagenes')!) || []

    // if (localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)   ES LO MISMO QUE LA LINEA DE ARRIBA!
    // }
  }

  buscarGifs (query: string){

    query = query.trim().toLocaleLowerCase();

    

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

          

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
          .subscribe(  (respuesta) => {
            this.resultados = respuesta.data;
            localStorage.setItem('imagenes',JSON.stringify(this.resultados));
          });
    

  }



}
