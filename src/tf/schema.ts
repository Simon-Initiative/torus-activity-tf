import {
  ActivityModelSchema,
  Part,
  Transformation,
  makeResponse
} from 'oli-torus-sdk';

export interface ExampleSchema extends ActivityModelSchema {
  stem: string;
  authoring: {
    version: 1;
    parts: Part[];
    transformations: Transformation[];
    previewText: string;
  };
}

export function makeResponses(correctAnswer: string) {
  const other = correctAnswer === 'true' ? 'false' : 'true';
  return [
    makeResponse(`input like {${correctAnswer}}`, 1, 'Correct'), 
    makeResponse(`input like {${other}}`, 0, 'Incorrect')
  ];
}

export function createDefault() : ExampleSchema {
  return {
    stem: '',
    authoring: {
      version: 1,
      parts: [
        {
          id: '1',
          responses: makeResponses('true'),
          hints: [],
          scoringStrategy: 'average'
        } as unknown as Part
      ],
      transformations: [],
      previewText: ''
    }
  }
}