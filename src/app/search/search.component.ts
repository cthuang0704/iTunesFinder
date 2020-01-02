import { Component, OnInit } from '@angular/core';
import { Artist } from '../Model/artist';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../Services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  artistList: Artist[] = [];
  artistListDropDown: Artist[] = []; 
  searchKeyWord: string = '';
  resultCounter: number = 0;
  searchForm: FormGroup;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchBar': new FormControl('', [Validators.required])
    });
    //updated if input changes
    this.searchForm.get('searchBar').valueChanges.subscribe(value => {
      this.onSearch(value);
    })
  }

  onSearch(keyWord: string) {
    this.searchKeyWord = keyWord;
    
    this.searchService.searchArtist(keyWord).subscribe(
      data => {
        this.resultCounter = data.resultCount;//
        this.artistList = [];
        data.results.forEach( element => this.artistList.push({
          artistName: element.artistName,
          collectionName: element.collectionName,
          artworkUrl100: element.artworkUrl100
        }));
      //dropdown List
        if(this.artistList.length > 0) {
          this.artistListDropDown = [this.artistList[0]]
          let dropDownCounter = 1;
          this.artistList.forEach(element => {
            if(dropDownCounter < 10) {
              if(element.artistName != this.artistListDropDown[dropDownCounter - 1].artistName) {
                this.artistListDropDown.push(element);
                dropDownCounter++;
              }
            }
          });
        }
    })
  }
  
  onSubmit() {
    console.log(this.searchForm);
    console.log(this.searchForm.value);
  }

}
