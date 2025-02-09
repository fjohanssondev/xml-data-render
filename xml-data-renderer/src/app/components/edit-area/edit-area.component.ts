import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ArticleService } from '../../services/article/article.service';
import { RightMenuComponent } from '../right-menu/right-menu.component';

@Component({
  selector: 'app-edit-area',
  imports: [QuillModule, FormsModule, RightMenuComponent],
  templateUrl: './edit-area.component.html',
})
export class EditAreaComponent implements OnInit {
  fields: any[] = []
  articleId = "";

  constructor(
    private route: ActivatedRoute,
    private ArticleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']){
        this.articleId = params['id']
        this.ArticleService.getArticle(this.articleId).subscribe((data: any) => {
          this.fields = Array.isArray(data.texter) ? data.texter : [data.texter]
          if (this.fields.length > 0){
            this.fields.forEach((field: any) => {
              field.$.text = atob(field.$.text)
            })
          }
        })
      }
    })
  }
}
