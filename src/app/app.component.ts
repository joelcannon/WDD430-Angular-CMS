import { Component } from '@angular/core';
import { Feature } from './feature.enum';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cms';
  Feature = Feature;
}
