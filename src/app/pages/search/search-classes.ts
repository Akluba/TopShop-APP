export class SearchStep {
    status: {};
    method: string;
    icon: string;
    title: string;
    description?: string;
    loading = false;

    constructor(method, icon, title, description?) {
        this.method = method;
        this.icon = icon;
        this.title = title;
        this.description = description;
    }

    updateStatus(active, disabled, completed): void {
        this.status = {
            'active': active,
            'disabled': disabled,
            'completed': completed
        };
    }

    toggleLoading(): boolean {
        return this.loading = !this.loading;
    }
}
