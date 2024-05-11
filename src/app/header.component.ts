import { Component, Output, EventEmitter } from '@angular/core';
import { Feature } from './feature.enum';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  collapsed = true;

  @Output() selectedFeatureEvent = new EventEmitter<string>();
  Feature = Feature;

  onSelected(feature: Feature) {
    this.selectedFeatureEvent.emit(feature);
  }
}
