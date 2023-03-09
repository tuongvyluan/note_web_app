export default {
  httpResponseCode: {
    SUCCESS: 200,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  buttonTypes: {
    ACTION: 'action',
    OUTLINE: 'outline',
    DISABLED: 'disabled',
  },
  inputTypes: {
    TEXT: 'text',
    PASSWORD: 'password',
    DATE: 'date',
  },
  dateTimeFormat: 'MMM D, YY - HH:mm A',
  monthYearFormat: 'MMM YYYY',
  modalSize: {
    XS: 'xs',
    MD: 'md',
    XL: 'xl',
    XL_2: '2xl',
    XL_3: '3xl',
    XL_4: '4xl',
    XL_5: '5xl',
    XL_6: '6xl',
    XL_7: '7xl',
    XL_8: '8xl',
  },
  priorities: [
    { value: 0, name: 'High' },
    { value: 1, name: 'Medium' },
    { value: 2, name: 'Low' },
  ],
  statusList: [
    {
      value: 0,
      name: 'Plan',
    },
    {
      value: 1,
      name: 'Progress',
    },
    {
      value: 2,
      name: 'Review',
    },
    {
      value: 3,
      name: 'Done',
    },
  ],
  default: {
    sortTypeNote: 0, // 0: updatedAt, 1: name
    isAscNote: false,
    sortTypeTask: 0, // 0: priority, 1: progress
    isAscTask: false,
  },
  sortNote: {
    name: 0,
    updatedAt: 1,
  },
}
