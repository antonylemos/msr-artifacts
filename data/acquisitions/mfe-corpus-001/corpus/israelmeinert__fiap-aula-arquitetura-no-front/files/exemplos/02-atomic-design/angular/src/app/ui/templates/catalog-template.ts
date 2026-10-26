import { Component } from '@angular/core';

@Component({ selector: 'ef-catalog-template', standalone: true, 
  template: `<main><h1>02 · Atomic Design</h1><ng-content select="[busca]" /><ng-content select="[lista]" /></main>`,
})
export class CatalogTemplate {  }
