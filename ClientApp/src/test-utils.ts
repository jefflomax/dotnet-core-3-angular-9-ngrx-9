import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class DebugUtils {
    private element: DebugElement;

    constructor( debugElement: DebugElement ) {
        this.element = debugElement;
    }

    public getById( id: string, element: DebugElement = this.element ): DebugElement {
        return element.query(By.css(id));
    }

    public getByCss( css: string, element: DebugElement = this.element ): DebugElement[] {
        return element.queryAll(By.css( css ));
    }

    public getOneByCss( css: string, element: DebugElement = this.element ): DebugElement {
        return element.query(By.css( css ) );
    }

    public getOneByAttribute( name: string, value: string, element: DebugElement = this.element ): DebugElement {
        return this.getOneByCss( `[${name}="${value}"]`, element );
    }
}
