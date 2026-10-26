import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent, CardComponent } from '@descompara/shared-ui';
import { AuthService } from '@descompara/shared-data-access';

@Component({
  selector: 'app-admin-login',
  imports: [ButtonComponent, CardComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.auth.login('Admin do Sistema', 'admin');
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
