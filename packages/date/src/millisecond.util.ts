export function milliseconds(timeString: string) {
  const timeUnits = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    // Add more units as needed
  };

  const matches = timeString.match(/^(\d+)(ms|s|m|h|d|w)$/);
  if (!matches) {
    throw new Error('Invalid time format');
  }

  const value = parseInt(matches[1], 10);
  const unit = matches[2];
  if (!['ms', 's', 'm', 'h', 'd', 'w'].includes(unit)) {
    throw new Error('Invalid time unit');
  }
  if (!timeUnits[unit as 'ms' | 's' | 'm' | 'h' | 'd' | 'w']) {
    throw new Error('Invalid time unit');
  }

  return value * timeUnits[unit as 'ms' | 's' | 'm' | 'h' | 'd' | 'w'];
}
