import { Manifest, registerCreationFunc, AuthoringElement, AuthoringElementProps } from 'oli-torus-sdk';
import { ExampleSchema, createDefault, makeResponses } from './schema';
import { guid } from '../common/guid';
import { debounce } from '../common/debounce';
import { createHandler } from '../common/dom';

export { ExampleDelivery } from './delivery';

const manifest : Manifest = require('../../manifest.json');

function createFn(content) {
  return Promise.resolve(createDefault());
}
registerCreationFunc(manifest, createFn);


function adjustCorrectAnswer(model: ExampleSchema, correctAnswer: string) {
  const copy = Object.assign({}, model);
  copy.authoring.parts[0].responses = makeResponses(correctAnswer);
  return copy;
}

function adjustStem(model: ExampleSchema, stem: string) {
  const copy = Object.assign({}, model);
  copy.stem = stem;
  return copy;
}

export class ExampleAuthoring extends AuthoringElement<ExampleSchema> {

  uniqueId: string;
  rendered: boolean;

  constructor() {
    super();

    this.uniqueId = guid();
    this.rendered = false;
  }

  migrateModelVersion(model: any): ExampleSchema {
    return model;
  }

  render(mountPoint: HTMLDivElement, props: AuthoringElementProps<ExampleSchema>) {

    const id = this.uniqueId;

    if (!this.rendered) {

      mountPoint.innerHTML = `
        <form>
          <div class="form-group">
            <label>Question stem</label>
            <input id="${id + '_input'}" type="type" class="form-control" value="${props.model.stem}"/>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="${id}" id="${id + '_true'}" 
              value="true" ${props.model.authoring.parts[0].responses[0].score === 1 ? 'checked' : ''}/>
            <label class="form-check-label">True</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="${id}" id="${id + '_false'}" 
              value="false" ${props.model.authoring.parts[0].responses[0].score === 0 ? 'checked' : ''}/>
            <label class="form-check-label">False</label>
          </div>
        </form>
      `;

      createHandler(id + '_true', 'click', 
        () => props.onEdit(adjustCorrectAnswer(props.model, 'true')));
      createHandler(id + '_false', 'click', 
        () => props.onEdit(adjustCorrectAnswer(props.model, 'false')));
      createHandler(id + '_input', 'keypress', 
        debounce(
          () => {
            const value = (document.getElementById(id + '_input') as HTMLInputElement).value;
            console.log('the stem:');
            console.log(value);
            props.onEdit(adjustStem(props.model, value));
          }, 
        300));
    }
    this.rendered = true;

  }
}



window.customElements.define(manifest.authoring.element, ExampleAuthoring);
