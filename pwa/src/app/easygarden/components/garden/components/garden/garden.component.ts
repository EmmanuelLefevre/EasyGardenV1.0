import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPen, faTrash, faSort, faSearch, faTree } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { GardenService } from '../../garden.service';
import { UserModel } from '../../../../../_models/userModel';
import { IGardenFilter } from '../../gardenModel';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirmDialogComponent/confirm-dialog.component';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})

export class GardenComponent implements OnInit, OnDestroy {

  title = "Jardin";
  faPen = faPen;
  faTrash = faTrash;
  faSort = faSort;
  faSearch = faSearch;
  faTree = faTree;

  // Confirm Dialog this.result = boolean
  result: boolean | undefined;

  // Ngx-paginator
  p: number = 1;
  // Ngx-order
  orderHeader: String = '';
  isDescOrder: boolean = true;
  sort(headerName:String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }
  // Ngx-filter
  searchInput: IGardenFilter = { name: ''};
  clearInput() {
    this.searchInput.name = '';
  }

  users: UserModel[] = [];

  constructor(private gardenService: GardenService,
              private dialog: MatDialog,
              public router: Router) {
    window.scrollTo(0, 0)
  } 

  ngOnInit(): void {
    this.fetchGardens()
  }

  // Display Gardens
  fetchGardens(): void {
    // id = 
    this.gardenService.getAllGardens()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member'))
          this.users = res['hydra:member']
        }
      )
  }

  // Delete Garden
  confirmDialog(id: string, name: string): void {
    const value = name;
    const message = 'Êtes-vous certain de vouloir supprimer l\'équipement "'+ name +'" ?';
    const dialogData = new ConfirmDialogModel("Confirmer l'action!", message, value);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result === true) {
        this.gardenService.deleteGarden(id).subscribe(
          () => {
            this.fetchGardens()           
          }
        )
      }   
    })
  }

  ngOnDestroy() {
    // this.gardenService.unsubscribe()
  }

}
