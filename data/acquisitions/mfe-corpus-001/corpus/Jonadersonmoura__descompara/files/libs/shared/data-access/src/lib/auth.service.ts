import { computed, Injectable, signal } from '@angular/core';
import { AuthUser, UserRole } from '@descompara/shared-types';

const ANONYMOUS: AuthUser = { id: '', nome: '', role: 'publico' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<AuthUser>(ANONYMOUS);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal().role !== 'publico');

  hasRole(...roles: UserRole[]): boolean {
    return roles.includes(this.currentUserSignal().role);
  }

  login(nome: string, role: UserRole): void {
    this.currentUserSignal.set({ id: crypto.randomUUID(), nome, role });
  }

  logout(): void {
    this.currentUserSignal.set(ANONYMOUS);
  }

  setRole(role: UserRole): void {
    this.currentUserSignal.update((user) => ({ ...user, role }));
  }
}
