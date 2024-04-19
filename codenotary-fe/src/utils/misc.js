function isEmptyField(v) {
  return typeof v === 'undefined' || v === null || v === ''
}

function ibanValidator(val) {
  return (
    isEmptyField(val) ||
    val.match(
      /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/,
    ) ||
    'Invalid IBAN number, ex. NL91INGB5055036109'
  )
}

export { isEmptyField, ibanValidator }
