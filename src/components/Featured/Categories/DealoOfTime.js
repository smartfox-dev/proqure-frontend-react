// Set the end date and time of the deal
import { getDealOfTime } from '../../../utils';
export const setDealOfTime = () => {
  const dealEndDate = getDealOfTime();
  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = dealEndDate - now;
    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    // Update the countdown elements if they exist
    const hourElement = document.getElementById("dealhour");
    const minuteElement = document.getElementById("dealminute");
    const secondElement = document.getElementById("dealsecond");
    if (hourElement) {
      hourElement.innerHTML = hours;
    }
    if (minuteElement) {
      minuteElement.innerHTML = minutes;
    }
    if (secondElement) {
      secondElement.innerHTML = seconds;
    }
    // Update the countdown every second
    if (timeRemaining > 0) {
      setTimeout(updateCountdown, 1000);
    } else {
      const countdownElement = document.getElementById("deal-countdown");
      if (countdownElement) {
        countdownElement.innerHTML = "Deal has ended";
      }
    }
  }
  // Start the countdown
  updateCountdown();
}
