import { Component, Input, OnInit } from "@angular/core";

interface Author {
    name: string;
    nationality: string;
    aboutAuthor: string;
    authorImg: string;
}


@Component({
    selector: 'app-author-card',
    templateUrl: 'author-card.html',
    styleUrls: ['author-card.css']
})
export class AuthorCardComponent implements OnInit {

    @Input() author: Author;

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}