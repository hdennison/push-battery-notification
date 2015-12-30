'use strict';

class BatteryNotifier {
    constructor() {
        this.minSeconds = 600;

        Notification.requestPermission((permission) => {
            if (permission === "granted") {
                this.bindEvents();
            }
        });
    }

    bindEvents() {
        navigator.getBattery().then((battery) => {
           battery.addEventListener('dischargingtimechange', () => {
               this.handleTimeLeft(battery);
           });
       });
    }

    handleTimeLeft(battery) {
        let secondsLeft = battery.dischargingTime;

        if (typeof(secondsLeft) !== 'number') {
            return;
        }

        secondsLeft < this.minSeconds ? this.showNotification() : this.logRemainingTime(secondsLeft);
    }

    showNotification() {
        let minutesLeft = Math.floor(this.minSeconds / 60),
            title = 'Battery left: '+ minutesLeft + ' min.',
            options = {
                body: 'Go get your charger!',
                icon: 'battery-icon.png',
                sound: 'bell.ogg',
                sticky: true
            };

        new Notification(title, options);
    }

    logRemainingTime(seconds) {
        let date = new Date(null);

        date.setSeconds(seconds);

        let timeLeft = date.toISOString().substr(11, 5) + " min";

        console.log(timeLeft);
    }
}
