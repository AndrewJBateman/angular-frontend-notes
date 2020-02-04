import { Component, OnInit, ViewChild, ElementRef, Input, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', {static: false}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: false}) bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // work  out if there is a text overflow then if not hide the truncator
    // let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    // let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    // if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
    //   // if this is a text overflow, show the fade out truncator
    //   this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    // } else {
    //   // if this is no text overflow, dont show the fade out truncator
    //   this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    // }
  }

  onXButtonClick() {
    this.deleteEvent.emit();
  }

}
