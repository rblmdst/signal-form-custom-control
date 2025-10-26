import { Component, computed, effect, input, InputSignal, model, ModelSignal, OutputRef, signal, untracked } from '@angular/core';
import { MONTHS } from './const';
import { FormsModule } from '@angular/forms';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

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

  protected day = signal('');
  protected month = signal('');
  protected year = signal('');

  // YYYY-MM-DD
  protected finalDate = computed(() => {
    const day = +this.day();
    const day2Digit = day < 10 ? `0${day}` : day;
    const month = this.month();
    const year = this.year();
    if (day && month && year) {
      return `${year}-${month}-${day2Digit}`;
    }
    return '';
  });

  // form -> control
  updateFromOutside = effect(()=> {
    console.log('updateFromOutside')
    const value = this.value()
    untracked(()=> {
      if(value) {
        const [year, month, day] = value.split("-")
        const selectedMonthOption = MONTHS.find(m => +m.value == +month )
        const selectedMonthValue = selectedMonthOption?.value ?? ""
        this.year.set(year)
        this.day.set(day)
        this.month.set(selectedMonthValue)
      } else {
        this.year.set("")
        this.day.set("")
        this.month.set("")
      }
    })
  })

  // form <- control
  syncWithOutside = effect(()=> {
    const finalDate = this.finalDate()
    console.log('syncWithOutside')

    untracked(()=> {
      this.value.set(finalDate)
    })
  })
}
