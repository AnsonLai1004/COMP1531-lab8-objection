export enum Objection {
  /**
  * By default, enum are integers 0, 1, 2, ...
  * However, we can also give them string values
  */
  ARGUMENTATIVE = 'argumentative',
  COMPOUND = 'compound',
  HEARSAY = 'hearsay',
  LEADING = 'leading',
  NON_RESPONSIVE = 'non-responsive',
  RELEVANCE = 'relevance',
  SPECULATION = 'speculation',
}

export enum ExaminationType {
  /**
    * It is also possible to specify a "start" number.
    *
    * Below would assign CROSS = 1, DIRECT = 2, the next
    * would be 3, etc.
    */
  CROSS = 1,
  DIRECT,
}

// Helper function - feel free to remove / modify.
function isArgumentative(question: string) {
  return !question.endsWith('?');
}

function isCompound(question: string) {
  let pos = question.indexOf('?');
  if (pos === -1) {
    return false;
  }
  let str = question.substring(0, pos) + question.substring(pos+1, question.length);
  console.log(str)
  if (str.indexOf("?") === -1) {
    return false;
  } else {
    return true;
  }
}

function isHearsay(testimony: string) {
  if (testimony.includes('heard from') || testimony.includes('told me')) {
    return true;
  }
  return false;
}

function isLeading(question: string) {
  if (question.startsWith('why did you') || question.startsWith('do you agree') ||
    question.endsWith('right?') || question.endsWith('correct?')) {
      return true;
  } 
  return false;
}

function isNonResponsive(testimony: string, question: string) {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  const q_result = question.replace(regex, '');
  const t_result = testimony.replace(regex, '');
  let q_arr = q_result.split(" ");
  for (const word of q_arr) {
    if (testimony.includes(word)) {
      return false;
    }
  }
  return true;
}

function isRelevance(testimony: string, question: string) {
  let t_length = testimony.length;
  let q_length = question.length;
  if (t_length >= 2 * q_length) {
    return true;
  }
  return false;
}

function isSpeculation(type: ExaminationType, testimony: string, question: string) {
  if (type === ExaminationType.DIRECT) {
    return testimony.includes('think');
  } else {
    return question.includes('think');
  }
}
/**
 * Feel free to modify the function below as you see fit,
 * so long as you satisfy the specification.
 */
export function getObjections(
  question: string,
  testimony: string,
  type: ExaminationType
): Set<Objection> {
  // TODO: error handling
  if (question === '' || testimony === '') {
    throw new Error(' ');
  }
  // Convert given question and testimony to lowercase
  question = question.toLowerCase();
  testimony = testimony.toLowerCase();

  const objections = new Set<Objection>();

  if (type === ExaminationType.CROSS) {
    if (isArgumentative(question)) {
      objections.add(Objection.ARGUMENTATIVE);
    }
    // TODO
  } else {
    // Type is ExaminationType.DIRECT
    if (isLeading(question)) {
      objections.add(Objection.LEADING);
    }
    // TODO
  }

  // TODO
  if (isCompound(question)) {
    objections.add(Objection.COMPOUND);
  }
  if (isHearsay(testimony)) {
    objections.add(Objection.HEARSAY);
  }
  if (isNonResponsive(testimony, question)) {
    objections.add(Objection.NON_RESPONSIVE);
  }
  if (isRelevance(testimony, question)) {
    objections.add(Objection.RELEVANCE);
  }
  if (isSpeculation(type, testimony, question)) {
    objections.add(Objection.SPECULATION);
  }
  return objections;
}


//getObjections('', 'No you!', ExaminationType.DIRECT);