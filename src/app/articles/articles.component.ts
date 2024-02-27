import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../Services/article.service';

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
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{
  articles: Article[] = []; 
  loading: boolean = true;
  error: string = '';

constructor(private articlesService: ArticleService) {}

ngOnInit(): void {
  this.articlesService.getDietArticles().subscribe(
    data => {
      this.articles = data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        source: article.source,
        author: article.author,
        url: article.url,
        imageUrl: article.urlToImage,
        publisedAt: article.publisedAt
      }));
      this.loading = false;
    },
    error => {
      this.error = 'Error fetching articles. Please try again later.';
      this.loading = false;
    }
  );
}


}
