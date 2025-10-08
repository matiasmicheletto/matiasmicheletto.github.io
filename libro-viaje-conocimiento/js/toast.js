(function(){
  const container = document.getElementById('toast-container');

  /**
   * showToast(message, type, timeout)
   * - message: string
   * - type: 'success' | 'error' (defaults to 'success')
   * - timeout: ms (defaults to 3000). If 0 or negative it stays until user closes.
   */
  function showToast(message, type = 'success', timeout = 3000) {
    if (!message) return;
    const t = document.createElement('div');
    t.className = 'toast ' + (type === 'error' ? 'error' : 'success');

    const msg = document.createElement('div');
    msg.className = 'msg';
    msg.textContent = message;

    const btn = document.createElement('button');
    btn.className = 'close';
    btn.setAttribute('aria-label','Close toast');
    btn.innerHTML = '✕';

    t.appendChild(msg);
    t.appendChild(btn);
    container.prepend(t); // newest on top

    // show animation (allow next frame)
    requestAnimationFrame(() => t.classList.add('show'));

    // removal helper
    let removed = false;
    function removeToast() {
      if (removed) return;
      removed = true;
      t.classList.remove('show');
      t.classList.add('hide');
      // wait transition then remove
      t.addEventListener('transitionend', () => t.remove(), { once: true });
    }

    btn.addEventListener('click', removeToast);
    t.addEventListener('click', (e) => {
      // click on body of toast also closes it (except clicks on close handled above)
      if (e.target === t) removeToast();
    });

    // auto timeout
    if (typeof timeout === 'number' && timeout > 0) {
      setTimeout(removeToast, timeout);
    }

    return {
      element: t,
      dismiss: removeToast
    };
  }

  // expose globally
  window.showToast = showToast;
})();