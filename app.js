const dialog = document.querySelector('#lightbox');
let lastPhoto;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    lastPhoto = button;
    const target = dialog.querySelector('img');
    target.src = button.dataset.image;
    target.alt = button.querySelector('img').alt;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  lastPhoto?.focus({preventScroll:true});
});
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
  });
});
document.querySelectorAll('.play').forEach(button => {
  const video = button.closest('figure').querySelector('video');
  button.addEventListener('click', async () => {
    if (!video.paused) { video.pause(); return; }
    try { await video.play(); }
    catch { button.textContent = '▶ Повторить'; }
  });
  video.addEventListener('play', () => { button.textContent = 'Ⅱ Пауза'; });
  video.addEventListener('pause', () => { button.textContent = '▶ Смотреть'; });
  video.addEventListener('ended', () => { button.textContent = '▶ Ещё раз'; });
});
document.querySelectorAll('.collapse').forEach(button => {
  button.addEventListener('click', () => {
    const group = button.closest('details');
    const summary = group.querySelector('summary');
    group.open = false;
    summary.scrollIntoView({block:'center'});
    summary.focus({preventScroll:true});
  });
});
document.querySelectorAll('details').forEach(group => {
  group.addEventListener('toggle', () => {
    if (!group.open) group.querySelectorAll('video').forEach(video => video.pause());
  });
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    let parent = target.parentElement;
    while (parent) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; }
  });
});
