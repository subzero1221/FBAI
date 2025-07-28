export function matchMinute(timeStamp, startDate) {
    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
    const minutes = Math.floor((timeStamp - startTimestamp) / 60);
    return minutes;
  }