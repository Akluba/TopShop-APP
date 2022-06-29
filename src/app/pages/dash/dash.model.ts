export class Filter {
    private title: string;
    private primary: string;
    private sub: any[];

    constructor(title, primary, sub) {
        this.title = title;
        this.primary = primary;
        this.sub = sub;
    }
}

export class Note {
    created_by: string;
    created_date: string;
    created_for: {};
    note_text: string;
    tags: null | any[];
}

export class PaginatedNotes {
    current_page: number;
    data: Note[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  }
