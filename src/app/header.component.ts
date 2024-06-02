import { Component } from '@angular/core';
import { Feature } from './feature.enum';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  collapsed = true;

  Feature = Feature;
}
