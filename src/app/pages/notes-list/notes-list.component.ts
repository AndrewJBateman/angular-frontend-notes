import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // entry animation
      transition('void => *', [
				// initial state
				style({
					height: 0,
					opacity: 0,
					transform: 'scale(0.85)',
					'margin-bottom': 0,
					paddingTop: 0,
					paddingBottom: 0,
					paddingLeft: 0,
					paddingRight: 0
				}),
				// animate spacing - height & margin
				animate('50mS', style({
					height: '*',
					'margin-bottom': '*',
					paddingTop: '*',
					paddingBottom: '*',
					paddingLeft: '*',
					paddingRight: '*'
				})),
				animate(68)
			]),

			transition('* => void', [
				// first scale up
				animate(50, style({
					transform: 'scale(1.05)'
				})),
				// scale back to normal size while beginning to fade out
				animate(50, style({
					transform: 'scale(1)',
					opacity: 0.75
				})),
				// scale down and fade out
				animate('120ms ease-out', style({
					transform: 'scale(0.68)',
					opacity: 0
				})),
				// then spacing - height, margin & padding
				animate('150ms ease-out', style({
					height: 0,
					'margin-bottom': 0,
					paddingTop: 0,
					paddingBottom: 0,
					paddingRight: 0,
					paddingLeft: 0,
				}))
			])
		]),
		
		trigger('listAnim', [
			transition('* => *', [
				query(':enter', [
					style({
						opacity: 0,
						height: 0
					}),
					stagger(100, [
						animate('0.3s')
					])
				], {
					optional: true
				})
			])
		])

  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    // retrieve all notes using NotesService
    this.notes = this.notesService.getAll();
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }

}
