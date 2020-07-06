# :zap: Angular Frontend Notes

* Angular tutorial app to allow user to add notes to a notes list. Notes can be viewed and deleted from this list. Includes a filter so user can search for key words and filtered results will order themselves in terms of relevancy.
* Clicking on a note navigates to that note where it can be edited.
* All code by [Devstackr](https://www.youtube.com/channel/UCbwsS1m4Hib6R-9F1alus_A/featured) from Youtube [tutorial series]([Project Demo & Introduction - [1] Build a Notes App w/ Angular](https://www.youtube.com/watch?v=dlXEeOk-MrI&t=7s)).

## :page_facing_up: Table of contents

* [:zap: Angular Frontend Notes](#zap-angular-frontend-notes)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To-do list](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* 5 part Youtube tutorial series in Angular 8. Upgraded to Angular 9.

## :camera: Screenshots

![Angular page](./img/list.png)

## :signal_strength: Technologies

* [Angular v10](https://angular.io/)
* [Bulma v0.9](https://bulma.io/documentation/) CSS framework
* [Font Awesome v5](https://fontawesome.com/) icons
* [rxjs v6](https://angular.io/guide/rx-library) reactive programming library

## :floppy_disk: Setup

* To start the server on _localhost://4200_ type: 'ng serve'
* To create a build file type `ng build --prod`

## :computer: Code Examples

* on initialisation of `note-details.component.ts` check if note is new

```typescript
ngOnInit() {
  // new note or editing existing one?
  this.route.params.subscribe((params: Params) => {
    this.note = new Note();
    if (params.id) {
      this.note = this.notesService.get(params.id);
      this.noteId = params.id;
      this.new = false;
    } else {
      this.new = true;
    }
  })
}
```

## :cool: Features

* Bulma CSS styles used for the first time.

## :clipboard: Status & To-do list

* Status: App complete and working.
* To-do: Nothing. Could add local storage or a backend (e.g. google Firebase).

## :clap: Inspiration

* [Project Demo & Introduction - [1] Build a Notes App w/ Angular](https://www.youtube.com/watch?v=dlXEeOk-MrI&t=7s)
* [Creating the UI (Angular) - [2] Build a Notes App w/ Angular](https://www.youtube.com/watch?v=akUcKvEsG8w)
* [Creating the Note Details Page - [3] Build a Notes App w/ Angular](https://www.youtube.com/watch?v=Rghqrp59XJA)
* [Adding Animations to Note Cards | Angular Animations - [4] Build a Notes App w/ Angular](https://www.youtube.com/watch?v=0DnL5awucWE)
* [Searching Notes - [5] Build a Notes App w/ Angular](https://www.youtube.com/watch?v=vWt9WvjUfRA)

* [Devstackr: Github repo](https://github.com/Devstackr/basic-notes-app-mean-stack)
* [Maya Shavin: Medium article: ES6 — Set vs Array — What and when?](https://medium.com/front-end-weekly/es6-set-vs-array-what-and-when-efc055655e1a)

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
