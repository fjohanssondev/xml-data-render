import { Component, OnInit, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MenuService } from '../../services/menu/menu.service';

interface MenuItem {
  id: string,
  title: string,
  subfolders: MenuItem[]
}

@Component({
  selector: 'app-menu',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  menu: MenuItem[] = []
  private readonly route = inject(ActivatedRoute);
  
  openFolders = new Set<string>()

  constructor(private menuService: MenuService) { }

  ngOnInit(){
    this.menuService.getMenu().subscribe((data: any) => {
      this.menu = data
      console.log(this.menu)
    })
  }

  openFolder(id: string){
    if (this.openFolders.has(id)){
      this.openFolders.delete(id)
    } else {
      this.openFolders.add(id)
    }
  }

  isOpen(id: string):boolean {
    return this.openFolders.has(id)
  }
}
