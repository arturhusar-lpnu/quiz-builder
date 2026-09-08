import { Type } from 'class-transformer';
import {
  AddBooleanQuestionDto,
  AddCheckboxQuestionDto,
  AddInputQuestionDto,
  type AddQuestionDto,
} from './add-question.dto';

export class AddQuestionBody {
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: AddBooleanQuestionDto, name: 'boolean' },
        { value: AddInputQuestionDto, name: 'input' },
        { value: AddCheckboxQuestionDto, name: 'checkbox' },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  data: AddQuestionDto;
}
