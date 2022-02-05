import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, exhaustMap, switchMap } from 'rxjs/operators';
import { ImageCropperComponent } from '../shared/components/image-cropper/image-cropper.component';
import { IonRouterOutlet } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-setup-profile',
    templateUrl: './setup-profile.page.html',
    styleUrls: ['./setup-profile.page.scss'],
})
export class SetupProfilePage implements OnInit {
    @ViewChild('stepper') stepper: MatStepper; 
    userName = new FormControl('', [Validators.required]);
    sporstGoal = new FormControl('');
    selectedClubs = [];

    imageChangedEvent: any = '';
    croppedImage: any = '';

    isModalOpen = false;

    clubs = [
        { id: 1, val: "Club 1", isChecked: false },
        { id: 2, val: "Club 2", isChecked: false },
        { id: 3, val: "Club 3", isChecked: false },
        { id: 4, val: "Club 4", isChecked: false },
        { id: 5, val: "Club 5", isChecked: false },
        { id: 6, val: "Club 6", isChecked: false },
        { id: 7, val: "Club 7", isChecked: false },
        { id: 8, val: "Club 8", isChecked: false },
        { id: 9, val: "Club 9", isChecked: false }
    ];

    clickProcessing = false;
    profileImg: string = `assets/profile_avatar_placeholder.png`;
    croppedImg: string = '';



    constructor(
        public modalController: ModalController, 
        public routerOutlet: IonRouterOutlet,
        private dialog: MatDialog,
        private db: AngularFireDatabase
        ) { }

    userNameExists = 0;
    searching = false;
    ngOnInit() {
        this.userName.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap( (value: any) => {
                    return value ? this.db.list('/Users', ref => ref.orderByChild('userName').equalTo(value.toLowerCase()).limitToFirst(1)).valueChanges() : [];
                })
            )
            .subscribe(val => { 
                this.userNameExists = val.length; 
                this.searching = true;
            });
    }

    searchUserName(username: string) {
        
        
    }

    changeSelection(event: any, id: string) {
        event.stopImmediatePropagation();
        const index = this.selectedClubs.findIndex(c => c === id);
        if (!this.clickProcessing) {
            this.clickProcessing = true;
            if (index >= 0) {
                this.selectedClubs.splice(index, 1);
            } else {
                if (this.selectedClubs.length >= 3) return;
                this.selectedClubs.push(id);
            }
        }
        setTimeout(() => {
            this.clickProcessing = false;
        });
    }

    checkSelected(value: string): boolean {
        return this.selectedClubs.includes(value);
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.presentModal(event);
    }



    async presentModal(event) {
        let dialogRef = this.dialog.open(ImageCropperComponent, {
            data: event,
            panelClass: 'image-cropper-modal',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe (
            res => {
                if (res) {
                    this.croppedImg = res;
                }
            }
        );
    }

    next(allowed = true) {
        if(allowed) this.stepper.next();
    }

    previous(allowed = true) {
        if(allowed) this.stepper.previous();
    }
}
