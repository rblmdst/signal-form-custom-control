import { Component, computed, effect, input, linkedSignal, model, untracked } from '@angular/core';
import { MONTHS, dateIsValid } from './utils';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
@Component({
  selector: 'app-date-picker',
  imports: [FormsModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
})
export class DatePicker implements FormValueControl<string> {
  readonly label = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly value = model<string>('');
  protected readonly months = MONTHS;

  protected day = linkedSignal<string, string>({
    source: this.value,
    computation: (value, previous) =>
      value && value.match(DATE_PATTERN) ? value.split('-')[2] : previous?.value || '',
    equal: (a, b) => +a == +b,
  });

  protected month = linkedSignal<string, string>({
    source: this.value,
    computation: (value, previous) => {
      if (value && value.match(DATE_PATTERN)) {
        const month = value.split('-')[1];
        const selectedMonthOption = MONTHS.find((m) => +m.value == +month);
        const selectedMonthValue = selectedMonthOption?.value ?? '';
        return selectedMonthValue;
      }
      return previous?.value || '';
    },
  });

  protected year = linkedSignal<string, string>({
    source: this.value,
    computation: (value, previous) =>
      value && value.match(DATE_PATTERN) ? value.split('-')[0] : previous?.value || '',
  });

  // YYYY-MM-DD
  protected finalDate = computed(() => {
    const day = +this.day();
    const day2Digit = day < 10 ? `0${day}` : day;
    const month = this.month();
    const year = this.year();
    if (day && month && year) {
      const formated = `${year}-${month}-${day2Digit}`;
      return formated.match(DATE_PATTERN) && dateIsValid(formated) ? formated : '';
    }
    return '';
  });

  // Instead of using 3 signal (day, month, year)
  // and listen to change using updateFromOutside effect
  // updateFromOutside effect is replaced by the
  //  3 linkedSignal (day, month, year) above to avoid using effect

  // form -> control
  /* protected updateFromOutside = effect(() => {
    console.log('updateFromOutside');
    const value = this.value();
    untracked(() => {
      if (value) {
        const [year, month, day] = value.split('-');
        const selectedMonthOption = MONTHS.find((m) => +m.value == +month);
        const selectedMonthValue = selectedMonthOption?.value ?? '';
        this.year.set(year);
        this.day.set(day);
        this.month.set(selectedMonthValue);
      } else {
        this.year.set('');
        this.day.set('');
        this.month.set('');
      }
    });
  }); */

  // form <- control
  protected syncWithOutside = effect(() => {
    const finalDate = this.finalDate();
    untracked(() => {
      this.value.set(finalDate);
    });
  });
}
