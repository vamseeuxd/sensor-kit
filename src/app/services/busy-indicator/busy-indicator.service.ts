import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class BusyIndicatorService {
  private busyIndicatorsList: number[] = [];
  private loading;

  constructor(public loadingController: LoadingController) {}

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: null,
    });
    await this.loading.present();
  }

  show(logMessage = ''): number {
    const indicatorId = new Date().getTime();
    setTimeout(() => {
      this.hide(indicatorId);
      // console.log(logMessage, indicatorId);
    }, 5000);
    setTimeout(() => {
      if (this.busyIndicatorsList.length === 0) {
        this.presentLoading();
      }
      this.busyIndicatorsList.push(indicatorId);
    });
    return indicatorId;
  }

  hide(busyIndicatorId: number): void {
    this.busyIndicatorsList = this.busyIndicatorsList.filter(
      (id) => id !== busyIndicatorId
    );
    if (this.busyIndicatorsList.length === 0 && this.loading) {
      this.loading.dismiss();
    }
  }

  isBusyIndicator(): boolean {
    return this.busyIndicatorsList.length > 0;
  }
}
