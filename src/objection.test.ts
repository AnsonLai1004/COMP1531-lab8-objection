import { getObjections, Objection, ExaminationType } from './objection';

describe('error', () => {
  test.each([
    {
      question: '',
      testimony: 'No you!',
      type: ExaminationType.CROSS,
    },
    {
      question: 'This is direct, yes!',
      testimony: '',
      type: ExaminationType.DIRECT,
    },
  ])('$objections', ({ question, testimony, type }) => {
    expect(() => getObjections(question, testimony, type)).toThrow(Error);
  });
});

describe('argumentative cases', () => {
  test.each([
    {
      question: 'You are totally lying!',
      testimony: 'No you!',
      type: ExaminationType.CROSS,
      objections: new Set([Objection.ARGUMENTATIVE]),
    },
    {
      question: 'This is direct, yes!',
      testimony: 'Yes, so not argumentative!',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
  ])('$objections', ({ question, testimony, type, objections }) => {
    expect(getObjections(question, testimony, type)).toEqual(objections);
  });
});

describe('compound cases', () => {
  test.each([
    {
      question: 'You are totally lying??',
      testimony: 'No you!',
      type: ExaminationType.CROSS,
      objections: new Set([Objection.COMPOUND]),
    },
    {
      question: 'How are you? You are totally lying?',
      testimony: 'Yes! you are',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.COMPOUND]),
    },
    {
      question: 'This is direct, yes!',
      testimony: 'Yes, so not argumentative!',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
  ])('$objections', ({ question, testimony, type, objections }) => {
    expect(getObjections(question, testimony, type)).toEqual(objections);
  });
});

describe('hearsay cases', () => {
  test.each([
    {
      question: 'You are totally lying!',
      testimony: 'heard from someone you.',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.HEARSAY]),
    },
    {
      question: 'This is direct, yes!',
      testimony: 'she told me yes.',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.HEARSAY]),
    },
    {
      question: 'This is direct, yes!',
      testimony: 'Yes!',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
  ])('$objections', ({ question, testimony, type, objections }) => {
    expect(getObjections(question, testimony, type)).toEqual(objections);
  });
});

describe('leading cases', () => {
  test.each([
    {
      question: 'Why did you do that?',
      testimony: 'No you!',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.LEADING]),
    },
    {
      question: 'Do you agree?',
      testimony: 'Yes, so do!',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.LEADING]),
    },
    {
      question: 'This is direct, right?',
      testimony: 'No is!',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.LEADING]),
    },
    {
      question: 'This is direct, correct?',
      testimony: 'No is!',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.LEADING]),
    },
    {
      question: 'This is direct?',
      testimony: 'No is!',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
    {
      question: 'This is direct, correct?',
      testimony: 'No is!',
      type: ExaminationType.CROSS,
      objections: new Set([]),
    },
  ])('$objections', ({ question, testimony, type, objections }) => {
    expect(getObjections(question, testimony, type)).toEqual(objections);
  });
});

describe('NonResponsive cases', () => {
  test.each([
    {
      question: 'This is direct, yes!',
      testimony: 'So not argumentative!',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.NON_RESPONSIVE]),
    },
    {
      question: 'You are totally lying!',
      testimony: 'No you!',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
  ])('$objections', ({ question, testimony, type, objections }) => {
    expect(getObjections(question, testimony, type)).toEqual(objections);
  });
});

describe('Relevance cases', () => {
  test.each([
    {
      question: 'You are totally lying!',
      testimony: 'No you!',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
    {
      question: 'This!',
      testimony: 'Yes, this not argumentative!',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.RELEVANCE]),
    },
  ])('$objections', ({ question, testimony, type, objections }) => {
    expect(getObjections(question, testimony, type)).toEqual(objections);
  });
});

describe('Speculation cases', () => {
  test.each([
    {
      question: 'I think you are totally lying?',
      testimony: 'No you!',
      type: ExaminationType.CROSS,
      objections: new Set([Objection.SPECULATION]),
    },
    {
      question: 'This so?',
      testimony: 'Yes, so think !',
      type: ExaminationType.DIRECT,
      objections: new Set([Objection.SPECULATION]),
    },
    {
      question: 'This so!',
      testimony: 'Yes, so !',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
  ])('$objections', ({ question, testimony, type, objections }) => {
    expect(getObjections(question, testimony, type)).toEqual(objections);
  });
});