document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('reservation-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    if (validateForm()) {
      const data = {
        nombre:      document.getElementById('nombre').value.trim(),
        contacto:    document.getElementById('contacto-field').value.trim(),
        fecha:       document.getElementById('fecha').value,
        personas:    document.getElementById('personas').value,
        comentarios: document.getElementById('comentarios').value.trim()
      };

      form.classList.add('hidden');
      showConfirmation(data);
    }
  });

  function validateForm() {
    let valid = true;

    const nombre = document.getElementById('nombre').value.trim();
    if (nombre.length < 2) {
      showError('nombre', 'El nombre debe tener al menos 2 caracteres.');
      valid = false;
    }

    const contacto = document.getElementById('contacto-field').value.trim();
    const regTel   = /^\+?506[\s-]?\d{4}[\s-]?\d{4}$/;
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regTel.test(contacto) && !regEmail.test(contacto)) {
      showError('contacto-field', 'Ingrese un teléfono (+506 XXXX-XXXX) o correo válido.');

      valid = false;
    }

    const fecha = document.getElementById('fecha').value;
    if (!fecha) {
      showError('fecha', 'Seleccione una fecha.');
      valid = false;
    } else {
      const hoy       = new Date();
      hoy.setHours(0, 0, 0, 0);
      const seleccion = new Date(fecha + 'T00:00:00');
      if (seleccion < hoy) {
        showError('fecha', 'La fecha no puede ser anterior a hoy.');
        valid = false;
      }
    }

    const personas = parseInt(document.getElementById('personas').value);
    if (isNaN(personas) || personas < 1) {
      showError('personas', 'El número de personas debe ser mayor a cero.');
      valid = false;
    }

    const comentarios = document.getElementById('comentarios').value.trim();
    if (comentarios === '') {
      showError('comentarios', 'Los comentarios no pueden estar vacíos.');
      valid = false;
    }

    return valid;
  }

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const span  = document.getElementById('error-' + fieldId);
    input.classList.add('input-error');
    span.textContent = message;
  }

  function clearErrors() {
    const inputs = form.querySelectorAll('.input-error');
    inputs.forEach(function (el) { el.classList.remove('input-error'); });
    const spans = form.querySelectorAll('.error-msg');
    spans.forEach(function (el) { el.textContent = ''; });
  }

  function showConfirmation(data) {
    const card = document.getElementById('confirmation-card');
    card.innerHTML =
      '<h3>Reservación confirmada</h3>' +
      '<p><strong>Nombre:</strong> '      + data.nombre      + '</p>' +
      '<p><strong>Contacto:</strong> '    + data.contacto    + '</p>' +
      '<p><strong>Fecha:</strong> '       + data.fecha       + '</p>' +
      '<p><strong>Personas:</strong> '    + data.personas    + '</p>' +
      '<p><strong>Comentarios:</strong> ' + data.comentarios + '</p>' +
      '<button id="btn-nueva">Nueva reservación</button>';
    card.classList.remove('hidden');
    document.getElementById('btn-nueva').addEventListener('click', function () {
      card.classList.add('hidden');
      card.innerHTML = '';
      form.reset();
      form.classList.remove('hidden');
    });
  }

});
