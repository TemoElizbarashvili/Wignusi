import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  constructor(private router: Router) { }

  images = [
    {
      imageSrc: 
        'https://apiv1.biblusi.ge/storage/sliders/lAkmUOVI80iyw2lbveYfzUa2s7CG7BNtG6I0EbKB.jpg',
        imageAlt: 'skolisaken'
    },
    {
      imageSrc: 
        'https://apiv1.biblusi.ge/storage/sliders/sMYial8IobRnkCV1pil5op8TLgMZBkDTi5CTgKo6.png',
        imageAlt: 'aksesuarebi'
    },
    {
      imageSrc: 
        'https://apiv1.biblusi.ge/storage/sliders/4gUtRkoJQzqhnZYW93LxsvA3SkN6vqO1JKYAoL5g.png',
        imageAlt: 'wignebi'
    },
    {
      imageSrc: 
        'https://apiv1.biblusi.ge/storage/sliders/lf7h5qvVq2CWZ5K2JkaBgp9OBtvybUYlIg4bqtyu.png',
        imageAlt: 'top50 wigni'
    },
  ]

  books = [
    {
      imageSrc: 'https://apiv1.biblusi.ge/storage/book/QB7qRlfbwKotKPXCkf5wAR4jR4EvrLpyUWjFnR2E.jpg',
      title: 'დოგმენი',
      author:'დეივ პილკი ',
      price: 14.9
    },
    {
      imageSrc: 'https://apiv1.biblusi.ge/storage/book/W4kjM04Ncl58ufqEAyTaW2kfvm4O7Hw5V8DXKEXU.jpg',
      title: 'ჩემი არ გესმით',
      author:'ნერმინ ბეზმენი',
      price: 14.95
    },
    {
      imageSrc: 'https://apiv1.biblusi.ge/storage/book/G6KabIAN58HWZuxNPpf70TItkEYx2UekeSlMmzgP.jpg',
      title: 'ეველინ ჰიუგოს შვიდი ქმარი',
      author:'ტეილორ ჯენკინს რეიდი',
      price: 16.95
    },
    {
      imageSrc: 'https://apiv1.biblusi.ge/storage/book/MvPHkKxtUxngcHzU6Ww8nAqNXmGZw4bgppZX0N20.jpg',
      title: 'მოთხრობები ქართლიდან',
      author:'რევაზ-გიორგი არველაძე',
      price: 17.95
    },
    {
      imageSrc: '/assets/images/best-sellers/paemani-sikvdiltan.png',
      title: 'პაემანი სიკვდილთან',
      author:'აგათა კრისტი',
      price: 15.95
    },
    {
      imageSrc: '/assets/images/best-sellers/moparuli-siyvaruli.png',
      title: 'მოპარული სიყვარული',
      author:'თინათინ ბერიძე',
      price: 14.95
    },
    {
      imageSrc: '/assets/images/best-sellers/gadamwvari-xidebi.jpg',
      title: 'გადამწვარი ხიდები',
      author:'ნათია ჯაგოდნიშვილი',
      price: 14.95
    },
    {
      imageSrc: '/assets/images/best-sellers/ekimi-dzili.png',
      title: 'ექიმი ძილი',
      author:'სტივენ კინგი',
      price: 23.95
    },
    {
      imageSrc: '/assets/images/best-sellers/shvidi-grdznoba.png',
      title: 'შვიდი მომაკვდინებელი გრძნობა',
      author:'ნიკოლოზ ტოტოღაშვილი',
      price: 12.95 
    },
  ]

  authors = [
    {
      name: 'ენი ლეკი',
      nationality: 'ამერიკა',
      aboutAuthor: 'ენ ლეკი (დაიბადა 1966 წელს) [3] არის სამეცნიერო ფანტასტიკისა და ფანტასტიკის ამერიკელი ავტორი .' +
      'მისმა 2013 წლის სადებიუტო რომანმა დამხმარე სამართალი , ნაწილობრივ ხელოვნური ცნობიერებისა და გენდერული სიბრმავის შესახებ ,' + 
      'მოიგო 2014 წლის ჰიუგოს პრემია "საუკეთესო რომანისთვის", [4] [5] ასევე ნებულა ჯილდო , [6] არტურ კლარკის ჯილდო.' +
      ', [7] და BSFA ჯილდო . [8] გაგრძელება, დამხმარე ხმალი და დამხმარე წყალობა , თითოეულმა მოიგოLocus Award და იყო ნომინირებული Nebula Award-ზე. Provenance' +
      ', რომელიც გამოქვეყნდა 2017 წელს, ასევე განლაგებულია Imperial Radch-ის სამყაროში. ლეკის პირველი ფანტასტიკური რომანი, The Raven Tower , 2019 წლის თებერვალში გამოიცა [9]',
      authorImg: 'https://apiv1.biblusi.ge/storage/author/d1RK7F59NomBBCvrw3N6JLqiNM3BIV47wQJbcZB0.jpg',
    },
    {
      name: 'პეტერ ჰანდკე',
      nationality: 'ავსტრალია',
      aboutAuthor: 'ავსტრიელი რომანისტი, დრამატურგი, მთარგმნელი, პოეტი, კინორეჟისორი და სცენარისტი.' + 
      '2019 წელს მიენიჭა ნობელის პრემია ლიტერატურაში „გავლენიანი შემოქმედებისთვის,' + 
      'რომელიც ლინგვისტური გამჭრიახობით ადამიანის გამოცდილების პერიფერიებსა და სპეციფიკას იკვლევს.“' + 
      'მიუხედავად იმისა, რომ ჰანდკეს ღირსეულ ლაურეატად აფასებდნენ, საერთაშორისო დონეზე მისთვის პრემიის მინიჭება დაგმო არაერთმა საჯარო ფიგურამ' +
      'და აკადემიკოსმა ინტელექტუალმა, მწერალმა თუ ჟურნალისტმა, რისი მიზეზიც ჰანდკეს მიერ სლობოდან მილოშევიჩის მხარდაჭერა იყო.' + 
      'ჰანდკეს რომანები ძირითადად უკიდურესად ობიექტური ხასიათისაა, მათში ავტორი ექსტრემალურ სიტუაციაში მყოფი პერსონაჟების მდგომარეობას უემოციოდ, აუღელვებლად აღწერს.',
      authorImg: 'https://apiv1.biblusi.ge/storage/author/vkHCkCYAccSguCnY3Buz7DvuKPNoxeLTGQpEzj3y.jpg',
    },

    
  ]

  onShowAccessories() {
    
  }

  onShowMeBestSellers() {
    this.router.navigate(['books' , '?ganre=ბესტსელერი']);
  }

  onShowBooks() {
    this.router.navigate(['books']);
  }
}
