export default (formId) => {
  const form = document.getElementById(formId);
  if (form.elements.namedItem('city').value) {
    return form.elements.namedItem('city').value;
  }
  return null;
};