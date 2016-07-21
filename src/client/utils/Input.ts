export class Input {

    public static numeric(item: HTMLElement): void {
        item.addEventListener('keypress', (e) => {
            if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 46) {
                e.preventDefault();
            }
        });
    }

}