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
           battery.ondischargingtimechange = this.handleTimeLeft(battery);
       });
    }

    handleTimeLeft(battery) {
        let secondsLeft = battery.dischargingTime;

        secondsLeft < this.minSeconds ? this.showNotification() : this.logRemainingTime(secondsLeft);
    }

    showNotification() {
        let minutesLeft = Math.floor(this.minSeconds/60),
            title = 'Battery left: '+ minutesLeft + ' min.',
            options = {
                body: 'Go get your charger!',
                icon: 'data:image/png;base64,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'
            };

        new Notification(title, options);
    }

    logRemainingTime(seconds) {
        let date = new Date(null);
            date.setSeconds(seconds);

        let timeLeft = date.toISOString().substr(11, 8);

        console.log(timeLeft);
    }
}
