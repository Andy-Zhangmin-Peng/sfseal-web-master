import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, flatMap, first } from 'rxjs/operators';

export const duplicateValueValidator = (callBackFunc: any, existedValue?: string) => (control: AbstractControl) => {
  if (control.value && control.value !== existedValue) {
    return control.valueChanges
      .pipe(debounceTime(100))
      .pipe(distinctUntilChanged())
      .pipe(() =>
        Observable.create(subject => {
          callBackFunc(control.value).subscribe((res: boolean) => {
            console.log(res);
            const error = res ? new Object({ duplicated: true }) : null;
            subject.next(error);
            subject.complete();
          });
        }),
      )
      .pipe(first());
  }

  return of(Observable ? null : Observable);
};
