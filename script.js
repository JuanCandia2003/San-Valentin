
document.addEventListener('DOMContentLoaded', () => {
    // Reference Date: July 2, 2025
    // Note: Month is 0-indexed in JS Date object (0 = Jan, 6 = July)
    const startDate = new Date(2025, 6, 2, 0, 0, 0); 

    const els = {
        months: document.getElementById('months'),
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function updateCounter() {
        const now = new Date();
        
        let diff = now - startDate;
        
        // Handling future date case (if user opens before July 2025)
        if (diff < 0) {
            // Can show "Countdown" if needed, but requirements say "Elapsed time"
            // Assuming we are post-date. If pre-date, it will show 0 or we handle absolute.
             // For safety, let's treat it as 0 if hasn't started, or show negatives?
             // "Tiempo transcurrido" implies past. 
        }

        /* 
           Accurate Month Calculation:
           Since months have variable days, a simple division isn't 100% "human" accurate.
           We will use calendar logic.
        */

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        // Adjust for negatives (borrowing logic)
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            // Borrow days from previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of prev month
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        // Total months including years
        const totalMonths = (years * 12) + months;

        // Update DOM
        els.months.textContent = String(totalMonths).padStart(2, '0');
        els.days.textContent = String(days).padStart(2, '0');
        els.hours.textContent = String(hours).padStart(2, '0');
        els.minutes.textContent = String(minutes).padStart(2, '0');
        els.seconds.textContent = String(seconds).padStart(2, '0');
    }

    // Initial call
    updateCounter();
    
    // Update every second
    setInterval(updateCounter, 1000);

    // Carousel Interaction (Pause on Hover)
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });
});
