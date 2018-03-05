export class MenuItem {
    profilePermission: boolean;
    header: string;
    links: any[];

    constructor(header, links, permission = true) {
        this.profilePermission = permission;
        this.header = header;
        this.links = links;
    }


}

export class NavLink {
    href: any[];
    text: string;

    constructor(href, text) {
        this.href = href;
        this.text = text;
    }
}
