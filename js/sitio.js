/* Pulso Valparaíso — comportamiento del sitio */

/* Menú para celulares: abre y cierra la lista de secciones */
document.querySelectorAll('.boton-menu').forEach(function (boton) {
  var menu = document.getElementById(boton.getAttribute('aria-controls'));
  boton.addEventListener('click', function () {
    var abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      menu.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
    });
  });
});

/* Formularios que aún no están conectados a un servicio que guarde los datos.
   Muestran la confirmación sin enviar nada a ninguna parte. */
document.querySelectorAll('form.formulario-pendiente').forEach(function (formulario) {
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    var idConfirmacion = formulario.getAttribute('data-confirmacion');
    if (idConfirmacion) {
      var confirmacion = document.getElementById(idConfirmacion);
      formulario.hidden = true;
      confirmacion.hidden = false;
      confirmacion.focus();
      confirmacion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      var boton = formulario.querySelector('button[type="submit"]');
      boton.textContent = '¡Gracias!';
      boton.disabled = true;
      var aviso = document.createElement('p');
      aviso.className = 'nota';
      aviso.setAttribute('role', 'status');
      aviso.style.width = '100%';
      aviso.textContent = formulario.getAttribute('data-mensaje') || '¡Gracias!';
      formulario.appendChild(aviso);
    }
  });
});
