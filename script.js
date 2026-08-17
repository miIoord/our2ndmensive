/* ============================================
   sunday & drew — interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- scroll cue ---------- */
  const scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      document.getElementById('photocard').closest('section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- days we've been dating ---------- */
  // EDIT INI: ganti dengan tanggal jadian kalian (format: 'YYYY-MM-DD')
  const START_DATE = new Date('2026-06-18T00:00:00');

  const dayLabelEl  = document.getElementById('counterDateLabel');
  const daysEl      = document.getElementById('counterDays');
  const sinceEl     = document.getElementById('counterSince');

  function formatStartLabel(date){
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  function daysBetween(a, b){
    const msPerDay = 1000 * 60 * 60 * 24;
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.max(0, Math.round((utcB - utcA) / msPerDay));
  }

  if (dayLabelEl) dayLabelEl.textContent = formatStartLabel(START_DATE);

  const totalDays = daysBetween(START_DATE, new Date());

  if (daysEl) {
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(12, Math.floor(duration / Math.max(totalDays, 1)));
    const timer = setInterval(() => {
      current += Math.max(1, Math.ceil(totalDays / 60));
      if (current >= totalDays) {
        current = totalDays;
        clearInterval(timer);
      }
      daysEl.textContent = current;
    }, stepTime);
  }

  if (sinceEl) {
    sinceEl.textContent = `since our first day together — ${START_DATE.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  }

  /* ---------- photocard flip ---------- */
  const card = document.getElementById('photocard3d');
  if (card) {
    const flip = () => card.classList.toggle('is-flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  }

  /* ---------- song player ---------- */
  const audio      = document.getElementById('audio');
  const playBtn     = document.getElementById('playBtn');
  const iconPlay    = document.getElementById('iconPlay');
  const iconPause   = document.getElementById('iconPause');
  const barFill     = document.getElementById('playerBarFill');

  if (audio && playBtn) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // file lagu belum ditambahkan di assets/song.mp3
          console.warn('Taruh file lagu kalian di assets/song.mp3 supaya bisa diputar.');
        });
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play', () => {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    });
    audio.addEventListener('pause', () => {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    });
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        barFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      }
    });
    audio.addEventListener('ended', () => {
      barFill.style.width = '0%';
    });
  }

  /* ---------- envelope / letter reveal ---------- */
  const envelopeBtn = document.getElementById('envelopeBtn');
  const letter      = document.getElementById('letterText');

  if (envelopeBtn && letter) {
    envelopeBtn.addEventListener('click', () => {
      const isOpen = envelopeBtn.classList.toggle('is-open');
      envelopeBtn.setAttribute('aria-expanded', String(isOpen));
      letter.classList.toggle('is-visible', isOpen);
      if (isOpen) {
        setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }
    });
  }

});
