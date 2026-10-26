import { Component, input } from '@angular/core';

@Component({ selector: 'ef-status', standalone: true, 
  template: `<p role="status">{{ mensagem() }}</p>`,
})
export class Status { readonly mensagem = input(''); }
