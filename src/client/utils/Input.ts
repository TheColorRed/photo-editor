export class Input {

    public static numeric(item: HTMLInputElement, min?: number, max?: number): void {
        item.addEventListener('keypress', (e) => {
            if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 46) {
                e.preventDefault();
            }
        });
        if (min || max) {
            item.addEventListener('keyup', (e) => {
                if (min && parseInt(item.value) < min) {
                    item.value = min.toString();
                }
                if (max && parseInt(item.value) > max) {
                    item.value = max.toString();
                }
            });
        }
    }

}