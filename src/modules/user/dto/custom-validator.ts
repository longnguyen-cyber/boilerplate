import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Age', async: false })
export class Age implements ValidatorConstraintInterface {
  validate(value: any) {
    return value >= 18;
  }

  defaultMessage() {
    return 'Age must be greater than or equal to 18';
  }
}
