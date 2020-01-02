import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  searchArtist(keyWord: string): Observable<any> {
    return this.httpClient.get(
      "https://itunes.apple.com/search?term="
      + keyWord
      + "&entity=album&attribute=artistTerm&limit=50"
    ).pipe(
      map(reponse => {
        return reponse as any
      })
    )
  }
}
