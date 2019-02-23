import { Component, OnInit, forwardRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from './ValueAccessorBase';
import { Logger } from 'app/core/services/logger/logger.service';
import { FieldOption } from 'app/shared/models/field-option';
import { FilterField } from 'app/shared/models/filter-field';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterFieldComponent),
  multi: true
};

@Component({
  selector: 'zep-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class FilterFieldComponent extends ValueAccessorBase<Array<FieldOption>> implements OnInit, OnChanges {

  constructor(private logger: Logger) {
    super();
  }

  @Input() filterField: FilterField;

  @Output() selectedOptionsChange = new EventEmitter();

  selectedOptions = [];
  availableOptions = [];
  inputSearchString = '';
  showOptions = false;
  showSelectAll = true;
  showDeselectAll = false;

  ngOnInit() {
    this.selectedOptions = [];
    this.selectedOptionsChange.emit(this.selectedOptions);
    this.availableOptions = this.filterField.fieldOptions.map(x => Object.assign({}, x));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logger.debug(changes);
  }

  addSelectedComponentToSelectedOptions(component: FieldOption) {
    this.selectedOptions.push(component);

    // Reassigning with new reference(inorder for ngOnChanges to detect change)
    const newSelectedOptions = [];
    this.selectedOptions.forEach((selectedOption) => {
      newSelectedOptions.push(selectedOption);
    });
    this.selectedOptions = newSelectedOptions;

    this.selectedOptionsChange.emit(this.selectedOptions);
    this.removeAllSelectedComponentsFromAvailableOptions();
    this.updateOptions();
  }

  removeSelectedComponentFromSelectedOptions(component: FieldOption) {
    for (let i = 0; i < this.selectedOptions.length; i++) {
      if (this.selectedOptions[i].option_id === component.option_id) {
        this.logger.debug('index to remove: ' + i);
        this.selectedOptions.splice(i, 1);

        // Reassigning with new reference(inorder for ngOnChanges to detect change)
        const newSelectedOptions = [];
        this.selectedOptions.forEach((selectedOption) => {
          newSelectedOptions.push(selectedOption);
        });
        this.selectedOptions = newSelectedOptions;

        this.selectedOptionsChange.emit(this.selectedOptions);
        break;
      }
    }
    this.logger.debug('available after removing particular component: ');
    this.logger.debug(this.availableOptions);
    this.availableOptions = this.filterField.fieldOptions.map(x => Object.assign({}, x));

    this.removeAllSelectedComponentsFromAvailableOptions();
    this.logger.debug('in input : ' + this.inputSearchString);
    this.updateSearchString(this.inputSearchString);
    this.updateOptions();
  }

  updateOptions() {
    this.logger.debug('update');
    this.value = this.selectedOptions;
    if (this.selectedOptions.length > 0) {
      this.showDeselectAll = true;
    } else {
      this.showDeselectAll = false;
    }
    if (this.availableOptions.length > 0) {
      this.showSelectAll = true;
    } else {
      this.showSelectAll = false;
    }
  }

  removeAllSelectedComponentsFromAvailableOptions() {
    let indicesToRemove = Array<number>();
    for (let i = 0; i < this.availableOptions.length; i++) {
      for (let j = 0; j < this.selectedOptions.length; j++) {
        if (this.availableOptions[i].option_id === this.selectedOptions[j].option_id) {
          indicesToRemove.push(i);
          this.logger.debug('index added to indicesToRemove: ' + i +
                      ' id : ' + this.availableOptions[i].option_id +
                      ' text : ' + this.availableOptions[i].option_text);
        }
      }
    }
    this.logger.debug('to remove before sort: ');
    this.logger.debug(indicesToRemove);
    indicesToRemove = indicesToRemove.sort(function (a, b) { return b - a; });
    this.logger.debug('to remove after sort: ');
    this.logger.debug(indicesToRemove);

    this.logger.debug('length : ' + indicesToRemove.length);

    for (let i = 0; i < indicesToRemove.length; i++) {
      this.availableOptions.splice(indicesToRemove[i], 1);
      this.logger.debug('counter : ' + i + ' index to remove : ' + indicesToRemove[i]);
      this.logger.debug('available : ');
      this.logger.debug(this.availableOptions);
    }

  }

  updateSearchString(inputString: string) {
    const input: string = inputString.toLowerCase();
    this.logger.debug('updateSearchString: ' + input);
    this.availableOptions.length = 0;
    this.filterField.fieldOptions.forEach(x => {
      if (x.option_text.toLowerCase().includes(input)) {
        this.logger.debug('matched and push in available: ' + x.option_text);
        this.availableOptions.push(x);
      }
    });
    this.logger.debug('final available from update fn length : ' + this.availableOptions.length);
    this.logger.debug(this.availableOptions);
    this.removeAllSelectedComponentsFromAvailableOptions();
  }

  selectAll() {
    this.selectedOptions = this.filterField.fieldOptions.map(x => Object.assign({}, x));
    this.selectedOptionsChange.emit(this.selectedOptions);
    this.availableOptions.length = 0;
    this.updateOptions();
  }

  deselectAll() {
    this.availableOptions = this.filterField.fieldOptions.map(x => Object.assign({}, x));
    this.selectedOptions = [];
    this.selectedOptionsChange.emit(this.selectedOptions);
    this.updateOptions();
  }
}
