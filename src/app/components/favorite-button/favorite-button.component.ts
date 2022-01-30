import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {
  @Input() selected: boolean;
  @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.selected = false;
  }

  ngOnInit(): void { }

  toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
