export class Element {
    id = 0;
    name: string = null;
}

export class Column {
    field: string;
    header: string;
    type: string;
    options: any[];

    constructor(field, header, type, options?) {
        this.field = field;
        this.header = header;
        this.type = type;
        this.options = this.formatOptions(options);
    }

    formatOptions(options): any[] {
        if (options === undefined || options.length < 0) {
            return null;
        }

        const formattedOptions = [];

        for (const option of Object.keys(options)) {
            formattedOptions.push({
                label: options[option]['title'],
                value: options[option]['title']
            });
        }

        return formattedOptions;
    }
}
