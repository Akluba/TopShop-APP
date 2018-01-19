import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {
    transform(notes: any[], filter: any): any[] {
        if (!notes || (!filter.class && !filter.field)) {
            return notes;
        }

        if (filter.field) {
            return notes.filter(note => note.filters.field === filter.field);
        } else {
            return notes.filter(note => note.filters.class === filter.class);
        }
    }
}
