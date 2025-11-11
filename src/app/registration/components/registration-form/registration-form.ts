import { Component, signal } from '@angular/core';
import { RegisterFormData } from '../../models/registration';
import { List } from '../../../shared/components/list/list';
import {
  disabled,
  Field,
  form,
  minLength,
  required,
  ValidationError,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';

const getInitialValue = (): RegisterFormData => {
  return {
    username: '',
    birthDate: '2022-09-02',
  };
};

@Component({
  selector: 'app-registration-form',
  imports: [List, Field, JsonPipe, DatePicker],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
})
export class RegistrationForm {
  private formModel = signal<RegisterFormData>(getInitialValue());
  
  protected form = form(this.formModel, (p) => {
    required(p.username, { message: 'Username required' });
    minLength(p.username, 4, { message: 'Must be 4 characters at least' });
    // disabled(p.birthDate)
    // required(p.birthDate, { message: 'The birth date is required' });
  });

  protected getErrors(errors: ValidationError[]) {
    return errors.map((error) => error.message) as string[];
  }

  protected onSubmit(event: Event) {
    event.preventDefault();
  }
}
