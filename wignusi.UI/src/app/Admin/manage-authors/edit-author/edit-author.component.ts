import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { AuthorDto } from 'src/app/api/models';
import { AuthorService } from 'src/app/api/services';

@Component({
  selector: 'app-edit-author',
  templateUrl: '../add-author/add-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent {
  bookId: number;
  authorForm: FormGroup = new FormGroup({
    'name': new FormControl(),
    'description': new FormControl(),
    'nationality': new FormControl(),
    'image': new FormControl
  });
  author: AuthorDto;
  action = 'რედაქტირება';


  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = +params.get('id');
    });
    this.authorService.getByIdAuthor({id: this.bookId})
      .subscribe(response => {
        this.author = {
          name: response.name,
          description: response.description,
          image: response.image,
          nationality: response.nationality
        };
        this.initForm();
      }, err => console.error(err));
  }


  initForm() { 
    let name = this.author.name ?? '';
    let description = this.author.description ?? '';
    let nationality = this.author.nationality ?? '';
    let image = this.author.image ?? '';
    console.log('name', name);
    console.log('description', description);
    console.log('nationality', nationality);
    console.log('image', image);
    this.authorForm = new FormGroup({
      'name': new FormControl(name, [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),
      'description': new FormControl(description, Validators.required),
      'nationality': new FormControl(nationality, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      'image': new FormControl(image, Validators.required)
    });
  }

  onSubmit() {

    console.log('Clicked');

    const author: AuthorDto = {
      name: this.authorForm.get('name').value,
      description: this.authorForm.get('description').value,
      nationality: this.authorForm.get('nationality').value,
      image: this.authorForm.get('image').value
    };
    this.authorService.editAuthor({ id: this.bookId ,body: author  })
      .subscribe(response => {
        console.log('Author edited ' + author);
        this.router.navigate(['/admin', 'authors']);
      });
  }


}
