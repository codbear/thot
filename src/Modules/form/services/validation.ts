type Validator = {
  (value: string|number): string|undefined;
};

const REGEX = {
  EMAIL: /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
};

const validateField = (
  validationArray: Validator[],
) => (value: string|number): string|undefined => {
  let error;

  if (!validationArray) {
    return error;
  }

  validationArray.some((validator) => {
    error = validator(value);
    return !!error;
  });

  return error;
};

const isRequired: Validator = (value) => {
  if (!value) {
    return 'Ce champ est obligatoire.';
  }
  return undefined;
};

const isEmail: Validator = (value) => {
  const isValidEmail = REGEX.EMAIL.test(value as string);

  if (!isValidEmail) {
    return 'Veuillez entrer une adresse email valide.';
  }

  return undefined;
};

export { validateField, isEmail, isRequired };
export type { Validator };
