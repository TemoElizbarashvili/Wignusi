import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";


interface bookCardInfo {
    imageSrc: string;
    title: string;
    author: string;
    price: number;
  }


@Component({
    selector: 'app-book-card-carousel',
    templateUrl: 'book-card-carousel.component.html',
    styleUrls: ['book-card-carousel.component.css'],
})
export class BookCardCarousel implements OnInit {
    @Input() books: bookCardInfo[];
    @Input() endIndex:number = 4;
    startIndex:number = -1;

    ngOnInit(): void {
        
    }

    onNextArrow() {
        if (this.books.length <= (this.endIndex)){
            return;
        } else {
            this.endIndex += 2;
            this.startIndex += 2;
            console.log(this.startIndex);
            console.log(this.endIndex);
            console.log('book length: ', this.books.length)
        }
        
    }

    onPrevArrow() {
        if (this.startIndex <= 0) {
            return;
        } else {
            this.endIndex -= 2;
            this.startIndex -=2;            
        }
    }
}