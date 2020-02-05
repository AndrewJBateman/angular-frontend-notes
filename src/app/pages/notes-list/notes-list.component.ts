import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
	filteredNotes: Note[] = new Array<Note>();

	@ViewChild('filterInput', {static: false}) filterElementRef: ElementRef<HTMLInputElement>;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    // retrieve all notes using NotesService
		this.notes = this.notesService.getAll();
		// this.filteredNotes = this.notesService.getAll();
		this.filter('');
  }

  deleteNote(note: Note) {
		let noteId = this.notesService.getId(note);
		this.notesService.delete(noteId);
		this.filter(this.filterElementRef.nativeElement.value);
	}
	
	generateNoteURL(note: Note) {
		let noteId = this.notesService.getId(note);
		return noteId;
	}

  filter(query: string) {
		query = query.toLowerCase().trim();
		let allResults: Note[] = new Array<Note>();
		let terms: string[] = query.split(' '); // split on spaces
		terms = this.removeDuplicates(terms);
		// compile all relevent results into the allResults array
		terms.forEach(term => {
			let results: Note[] = this.releventNotes(term);
			// append results to the allResults array
			allResults = [...allResults, ...results];
		});

		// remove duplicates from allResults array
		let uniqueResults = this.removeDuplicates(allResults);
		this.filteredNotes = uniqueResults;
		this.sortByRelevancy(allResults);
	}
	
	// Use ES6 sets - only distinct elements allowed in
	removeDuplicates(arr: Array<any>) : Array<any> {
		let uniqueResults: Set<any> = new Set<any>();
		// loop through the input add add the items to the set
		arr.forEach(e => uniqueResults.add(e));

		return Array.from(uniqueResults);
	}

	releventNotes(query: string) : Array<Note> {
		query = query.toLowerCase().trim();
		let releventNotes = this.notes.filter(note => {
			if (note.title && note.title.toLowerCase().includes(query)) {
				return true;
			}
			if (note.body && note.body.toLocaleLowerCase().includes(query)) {
				return true;
			}
			return false;
		})

		return releventNotes;
	}

	sortByRelevancy(searchResults) {
		let noteCountObj: Object = {};
		
		searchResults.forEach(note => {
			let noteId = this.notesService.getId(note);

			if (noteCountObj[noteId]) {
				noteCountObj[noteId] += 1;
			} else {
				noteCountObj[noteId] = 1;
			}
		})

		this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
			let aId = this.notesService.getId(a);
			let bId = this.notesService.getId(b);

			let aCount = noteCountObj[aId];
			let bCount = noteCountObj[bId];

			return bCount - aCount;
		});
	}

}
