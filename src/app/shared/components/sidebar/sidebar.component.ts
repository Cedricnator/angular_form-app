import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces';

@Component({
  selector: 'shared-sidebar-menu',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Basicos',  route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ]

  public authMenu: MenuItem[] = [
    { title: 'registro', route: './auth/register' }
  ]
}
