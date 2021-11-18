import { DateTime, Duration, ToRelativeOptions } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

/**
 * Gets a string that describes the difference between the current time, and a given date
 * @param date The date to get the relative time for compared to now. This can be a {@link DateTime} or an ISO-8601 date string
 * @param options The list of options for the relative time display, or how accurate it should be. The more accurate, the higher the performance toll. This defaults to 1 second
 */
export const useRelativeTime = (
  date: DateTime | string,
  options: {
    resolution: Duration;
    formattingOptions?: ToRelativeOptions;
  } = {
    resolution: Duration.fromMillis(1000),
  }
): string => {
  const getRelativeTime = useCallback(() => {
    const dateTime = typeof date === 'string' ? DateTime.fromISO(date) : date;

    return dateTime.toRelative(options.formattingOptions) ?? '';
  }, [date, options]);

  const [relativeTime, setRelativeTime] = useState(getRelativeTime);

  useEffect(() => {
    const intervalHandle = setInterval(() => {
      const time = getRelativeTime();
      setRelativeTime(time);
    }, options.resolution.toMillis());

    return () => clearInterval(intervalHandle);
  }, [date, options]);

  return relativeTime;
};
