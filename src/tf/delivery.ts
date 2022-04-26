import { Manifest, DeliveryElementProps, DeliveryElement, EvaluationResponse, feedbackToString } from 'oli-torus-sdk';
import { ExampleSchema } from './schema';
import { createHandler, get } from '../common/dom';

function createSubmissionHandler(props: DeliveryElementProps<ExampleSchema>, input: string) {

  createHandler(props.state.attemptGuid + input, 'click', () => {

    const { attemptGuid } = props.state;
    const partAttemptSubmission = {
      attemptGuid: props.state.parts[0].attemptGuid, 
      response: { input }
    };
    
    props.onSubmitActivity(attemptGuid, [partAttemptSubmission])
    .then((value: EvaluationResponse) => {
      if (value.type === 'success' && value.actions[0].type === 'FeedbackAction') {

        // Display the feedback
        document.getElementById(props.state.attemptGuid + 'feedback').innerHTML 
          = feedbackToString(value.actions[0].feedback);

        // Disable the buttons
        (get(props.state.attemptGuid + 'true') as HTMLButtonElement).disabled = true;
        (get(props.state.attemptGuid + 'false') as HTMLButtonElement).disabled = true;
      }
    })
  });
}

export class ExampleDelivery extends DeliveryElement<ExampleSchema> {

  rendered: boolean;

  constructor() {
    super();

    this.rendered = false;
  }

  render(mountPoint: HTMLDivElement, props: DeliveryElementProps<ExampleSchema>) {
    
    if (!this.rendered) {

      const isEvaluated = props.state.dateEvaluated !== null;
      const feedback = isEvaluated ? props.state.parts[0].feedback : '';
      const disabled = isEvaluated ? 'disabled' : '';

      mountPoint.innerHTML = `
        <div>
          <h3>True or False</h3>
          <p>${props.model.stem}</p>
          <button id="${props.state.attemptGuid + 'true'}" class="btn btn-primary" ${disabled}>True</button>
          <button id="${props.state.attemptGuid + 'false'}" class="btn btn-primary" ${disabled}>False</button>
          <div id="${props.state.attemptGuid + 'feedback'}">
        </div>
      `;

      createSubmissionHandler(props, 'true');
      createSubmissionHandler(props, 'false');

    }

    this.rendered = true;
  }
}

const manifest : Manifest = require('../../manifest.json');
window.customElements.define(manifest.delivery.element, ExampleDelivery);