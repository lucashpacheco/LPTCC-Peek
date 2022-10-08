import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root', 
})

export class Pagination {

    public page: number;
    public regPerPage: number;

    public static createButtons(countButtons: number): Array<number> {
        let buttons = []
        for (let i = 1; i <= countButtons; i++) {
            buttons.push(i)
        }
        return buttons;
    }

    public static countButtons(totalCount: number, regPerPage: number): number {

        var math = totalCount / regPerPage
        var buttons = Math.round(math) < math ? Math.round(math) + 1 : Math.round(math)

        return buttons;
    }

    public static calculateOffset(regPerPage: number, page: number): number {

        var offset = (regPerPage * page) - regPerPage

        return offset;
    }

    public static setPage(page: number) {

        page = page
    }

}