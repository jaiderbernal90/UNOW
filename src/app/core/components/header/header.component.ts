import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public hasThemeDark:boolean = false;

  public handleOnClickBtnTheme(): void {
    this.hasThemeDark = !this.hasThemeDark;
  }

}
