import { Component, OnInit, Renderer2 } from '@angular/core';
import { ArticlesService } from '../Services/article.service';

interface Article {
  title: string;
  description: string;
  source: { name: string };
  author: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
}
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  error: string = '';
  currentPage: number = 1;
  articlesPerPage: number = 9;

  constructor(
    private articlesService: ArticlesService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articlesService.getDietArticles().subscribe(
      (data) => {
        this.articles = data.articles.map((article: any) => ({
          title: article.title,
          description: article.description,
          source: article.source,
          author: article.author,
          url: article.url,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
        }));
        this.loading = false;
      },
      (error) => {
        this.error = 'Error fetching articles. Please try again later.';
        this.loading = false;
      }
    );
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

  get pagedArticles(): Article[] {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.articles.slice(startIndex, endIndex);
  }
}
