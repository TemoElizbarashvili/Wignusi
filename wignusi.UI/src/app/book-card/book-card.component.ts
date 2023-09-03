import { Component, Input, OnInit } from '@angular/core';


interface bookCardInfo {
  imageSrc: string;
  title: string;
  author: string;
  price: number;
}

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: bookCardInfo;


  ngOnInit(): void {
    
  }

}
