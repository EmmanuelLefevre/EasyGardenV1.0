import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, throwError, delay } from 'rxjs';

import { LightningService } from './lightning.service';
import { IDataLightning } from './lightningModel';


@Injectable({
  providedIn: 'root'
})

export class LightningResolver implements Resolve<IDataLightning[]> {
  
  constructor(private lightningService: LightningService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDataLightning[]> {
    return this.lightningService.getAllLightnings().pipe(
      delay(600),
      catchError(
        () => {
          this.router.navigate([""]);
          return throwError(() => ('Aucun éclairage n\'a été trouvé.'))
        }
      )
    );
  }
  
}
