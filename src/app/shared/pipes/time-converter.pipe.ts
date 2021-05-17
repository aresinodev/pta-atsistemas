import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter'
})
export class TimeConverterPipe implements PipeTransform {
  transform(value: number): string {
    const hours = value / 60;
    const rHours = Math.floor(hours);
    const minutes = (hours - rHours) * 60;
    const rMinutes = Math.round(minutes);

    return `${ rHours }h ${ rMinutes }m`;
  }
}
