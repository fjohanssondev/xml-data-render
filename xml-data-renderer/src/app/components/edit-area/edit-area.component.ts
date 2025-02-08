import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ArticleService } from '../../services/article/article.service';

@Component({
  selector: 'app-edit-area',
  imports: [QuillModule, FormsModule],
  templateUrl: './edit-area.component.html',
  styleUrl: './edit-area.component.css'
})
export class EditAreaComponent implements OnInit {
  content = "";
  articleId = "";

  constructor(
    private route: ActivatedRoute,
    private ArticleService: ArticleService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']){
        this.articleId = params['id']
        this.ArticleService.getArticle(this.articleId).subscribe((data: any) => {
          this.content = atob(data.texter.$.text)
        })
      }
    })
  }
}
