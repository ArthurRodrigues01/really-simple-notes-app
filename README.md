# Description

This a personal project of an app built on react-native consisting of a note management app. As of right now i'm only offering android support for this application, but perhaps this will change in the future. Current version is: **1.3**

# Android

You may download and install the "really-simple-notes-1.3.apk" file in your cellphone or generate another ".apk" file.
To generate an android installer file (.apk) you need to generate a keystore file (.keystore) with name "really-simple-notes", with alias "really-simple-notes" and password "111111" and paste in "android/app", or you can generate a different keystore file with different values and name and just change the values accordingly in "android/app/build.gradle".

# Android Example

Home screen is where all notes created will be displayed at, when your first launch the app you will have created no notes so you'll have a home screen like this.

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/empty-home-screen.png" />

## Note Creation

So lets create our first note, just click the big blue button in the home screen and you'll be redirected to the note creation screen, there you can add the title and text of your note

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/note-creation-screen.png" />

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/note-creation-modal.png" />

And it will be displayed at Home screen

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/1-note-home-screen.png" />

Lets add a couple more notes to help on the examples of our guide

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/5-note-home-screen.png" />

## Note Sorting

You can also sort the notes on your home screen, by default it will be sorted by creation date, showing the most recent created notes first

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/sorting-by-newest" />

But you can change the sorting mode whenever you want

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/sorting-by-oldest.png" />

## Note Editing

You can also edit your existing notes, lets edit the first note we created

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/note-edit-modal.png" />

The changes will be reflected on the home screen, no more "created on..."("Criado em...") message now there will be an "edited on..."("Editado em...") message

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/5-notes-home-screen-1-edited.png" />

If you want to easily find your edited notes, just alter the sorting mode to "Edited (latest)"("Edição (Mais novo)") or "Edited (oldest)"("Edição (Mais antigo)")

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/sorting-by-edited.png" />

## Note Deletion

If you don't want specific notes anymore, you can just delete them, this can be done for all of them, some of them(selected ones) or just a single one(editing page of specific note), here we selected three notes and pressed the delete button(Trashbin icon), the confirmation modal will appear, in case you change your mind or pressed the wrong button on accident just cancel it

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/note-deletion-modal.png" />

And now the notes you deleted will not appear on the home screen anymore

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/2-notes-home-screen.png" />

## Trash bin


The notes you delete will go to the "trash bin", which can be accessed by pressing the "Trash bin"("Lixeira") button on the more actions menu(Three dots icon), notes on the trash bin may not further edited, after all, they were discarded

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/more-actions-home-screen.png" />

There you'll see the notes you deleted, ordered by most recent deleted

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/not-empty-trashbin.png" />

### Note Permanent Deletion

So you are sure you will not use that not any longer, so may delete them permanently so that they do not impair the viewing of other deleted notes that may still be of use restoring, you may delete the notes on the trashbin, this can be done for all of them, some of them(selected ones) or just a single one(reading page of specific deleted note), here we selected three notes and pressed the delete button(Trash bin icon)

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/note-permadeletion-modal.png" />

Since these three notes were all we had in the trash bin, now it is empty

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/empty-trashbin.png" />

### Note Restoring 


Maybe, you made a mistake and deleted a note that you shouldn't have deleted, that's alright, if they are still on the trash bin you can just restore them, this can be done for all of them, some of them(selected ones) or just a single one(reading page of specific deleted note)

Since our trash bin is empty, let's delete another note

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/note-deletion-modal-2.png" />

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/1-note-home-screen.png" />

Now we select the notes we want to restore and press the restore button(Looping arrow icon)

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/note-restoring-modal.png" />

They will appear on the home screen the same they were before being sent to the trash bin

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/2-notes-home-screen.png" />

## Other Features

All other features can be found in the more actions buttons on the note creation screen and home screen

### Alter Fontsize

You may access the "fontsize altering" screen by clicking the "Alter fontsize"("Alterar Tamanho da Fonte") button

<img src="https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/docs-assets/alter-fontsize-modal.png" />

### Delete all notes

You may access the "delete all notes" feature by clicking the "Delete all notes"("Excluir todas as notas") button

### Import notes 

You may access the "Import notes" feature by clicking the "Import notes"("Importar notas") button, it will import a previously exported notes backup json file, if the json file is not a valid backup file it will cancel the "import notes" action

### Export notes

You may access the "Export notes" feature by clicking the "Export notes"("Exportar notas") button, it will export a notes backup json file to your "Downloads" folder on your cellphone

### Copy note

You may access the "Copy note" feature by clicking the "Copy note"("Copiar nota") button,
it will copy the text of your note and you can just paste it anywhere else

### Send as email

You may access the "Send as email" feature by clicking the "Send as email"("Enviar como email") button, it will open the main email app on your cellphone, and start writing a new email with the note title and note text already copied on to the subject area and body area respectively 

# History

## [Versions](https://github.com/ArthurRodrigues01/really-simple-notes-app/blob/main/version-logs.md)
- 1.3 (current)
- 1.2.1
- 1.2
- 1.1
- 1.0