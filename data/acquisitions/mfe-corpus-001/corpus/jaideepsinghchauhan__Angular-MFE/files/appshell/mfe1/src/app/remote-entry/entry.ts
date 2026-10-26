import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcome } from './nx-welcome';
import { Button } from '@angular-monorepo/button';
@Component({
  imports: [CommonModule, NxWelcome, Button],
  selector: 'app-mfe1-entry',
  template: `<app-nx-welcome></app-nx-welcome>`,
})
export class RemoteEntry {}
