import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, timeout } from 'rxjs';
import { parseResumo } from './parse-resumo';
@Injectable({ providedIn: 'root' })
export class ResumoApi {
  private readonly http = inject(HttpClient);
  carregar() { return this.http.get<unknown>('/bff/resumo').pipe(timeout(5000), map(parseResumo)); }
}
