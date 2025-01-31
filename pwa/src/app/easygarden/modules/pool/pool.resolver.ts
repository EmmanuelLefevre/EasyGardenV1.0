import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, throwError, delay } from 'rxjs';

import { PoolService } from './pool.service';
import { IDataPool } from './poolModel';


@Injectable({
  providedIn: 'root'
})

export class PoolResolver implements Resolve<IDataPool[]> {

  constructor(private poolService: PoolService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDataPool[]> {
    
    return this.poolService.getAllPools().pipe(
      delay(600),
      catchError(
        () => {
          this.router.navigate([""]);
          return throwError(() => ('Aucun équipement n\'a été trouvé.'))
        }
      )
    );
  }

}
