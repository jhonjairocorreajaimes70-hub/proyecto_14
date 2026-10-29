
const { DateTime } = luxon;
flatpickr("#birthdate", {
  dateFormat: "d/m/Y",
  maxDate: "today",
  disableMobile: true
});
const form = document.getElementById("age-form");
const birthdateInput = document.getElementById("birthdate");
const resultDiv = document.getElementById("result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateString = birthdateInput.value.trim();
  if (!dateString) {
    showError("Por favor, selecciona una fecha de nacimiento.");
    return;
  }
  const birthDate = DateTime.fromFormat(dateString, "dd/MM/yyyy");
  if (!birthDate.isValid) {
    showError("La fecha ingresada no es válida.");
    return;
  }
  const now = DateTime.now();
  if (birthDate > now) {
    showError("La fecha de nacimiento no puede ser futura.");
    return;
  }
  const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();
  const years = Math.floor(diff.years || 0);
  const months = Math.floor(diff.months || 0);
  const days = Math.floor(diff.days || 0);
  renderResult(years, months, days);
});
function renderResult(years, months, days) {
  resultDiv.classList.remove("hidden", "error");
  resultDiv.innerHTML = `You are <strong>${years} years ${months} months</strong> (and ${days} days) old`;
}
function showError(message) {
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("error");
  resultDiv.textContent = message;
}