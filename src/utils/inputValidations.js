export const name_validation = {
  name: 'name',
  label: 'name',
  type: 'text',
  multiType : false,
  id: 'name',
  placeholder: 'write your name ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const desc_validation = {
  name: 'description',
  label: 'description',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}

export const password_validation = {
  name: 'password',
  label: 'password',
  type: 'password',
  multiType : true,
  id: 'password',
  placeholder: 'type password ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
  },
}

export const num_validation = {
  name: 'num',
  label: 'number',
  type: 'number',
  multiType : false,
  id: 'num',
  placeholder: 'write a random number',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
}

export const email_validation = {
  name: 'email',
  label: 'email address',
  type: 'email',
  multiType : false,
  id: 'email',
  placeholder: 'write a random email address',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Invalid',
    },
  },
}


export const birthdate_validation = {
  name: 'birthdate',
  label: 'birth date',
  type: 'date',
  multiType : false,
  id: 'birthdate',
  placeholder: 'write your birth date',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
      /^(0?[1-9]|1[0-9]|2[0-9]|3[01]) (0?[1-9]|1[012]) \d{2}$/,
      message: 'Date is not valid',
    },
  },
}
