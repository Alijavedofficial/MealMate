import { Component, OnInit, Renderer2 } from '@angular/core';
import { ArticlesService } from '../Services/article.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  
  loading: boolean = true;
  error: string = '';
  currentPage: number = 1;
  articlesPerPage: number = 9;

  constructor(
    private articlesService: ArticlesService,
    private renderer: Renderer2
  ) {}

 

  articles: any[] = [];
ngOnInit() {
    this.articlesService.getArticles('health').subscribe((data: any) => {
      this.articles = data.articles;
    });
 }
 


  nextPage(): void {
    this.loading = true;
    setTimeout(() => {
      this.currentPage++;
      this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
      this.loading = false;
    }, 1000);
  }

  previousPage(): void {
    this.currentPage--;
  }

 
}
