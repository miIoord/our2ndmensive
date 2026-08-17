/* ============================================
   sunday & drew — interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- scroll cue ---------- */

  const scrollCue = document.getElementById('scrollCue');
  const photocard = document.getElementById('photocard');

  if (scrollCue && photocard) {
    scrollCue.addEventListener('click', () => {
      photocard.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }


  /* ---------- counting our days ---------- */

  // tanggal awal hubungan
  // format: YYYY-MM-DD
  const START_DATE = new Date('2026-06-18T00:00:00');


  const dayLabelEl = document.getElementById('counterDateLabel');
  const daysEl = document.getElementById('counterDays');
  const sinceEl = document.getElementById('counterSince');


  /* ---------- format tanggal ---------- */

  function formatStartLabel(date) {
    const months = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec'
    ];

    return `${months[date.getMonth()]} ${date.getDate()}`;
  }


  /* ---------- hitung jumlah hari ---------- */

  function daysBetween(start, end) {
    const msPerDay = 1000 * 60 * 60 * 24;

    const startUTC = Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    const endUTC = Date.UTC(
      end.getFullYear(),
      end.getMonth(),
      end.getDate()
    );

    return Math.max(
      0,
      Math.round((endUTC - startUTC) / msPerDay)
    );
  }


  /* ---------- tampilkan tanggal ---------- */

  if (dayLabelEl) {
    dayLabelEl.textContent = formatStartLabel(START_DATE);
  }


  const totalDays = daysBetween(
    START_DATE,
    new Date()
  );


  /* ---------- animasi angka ---------- */

  if (daysEl) {

    let current = 0;

    const duration = 1200;
    const increment = Math.max(
      1,
      Math.ceil(totalDays / 60)
    );

    const stepTime = Math.max(
      12,
      Math.floor(
        duration / Math.max(totalDays, 1)
      )
    );


    const timer = setInterval(() => {

      current += increment;


      if (current >= totalDays) {
        current = totalDays;
        clearInterval(timer);
      }


      daysEl.textContent = current;

    }, stepTime);
  }


  /* ---------- keterangan tanggal ---------- */

  if (sinceEl) {

    const formattedDate =
      START_DATE.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });


    sinceEl.textContent =
      `since the day everything started becoming real — ${formattedDate}`;
  }


  /* ---------- photocard flip ---------- */

  const card =
    document.getElementById('photocard3d');


  if (card) {

    const flipCard = () => {
      card.classList.toggle('is-flipped');
    };


    card.addEventListener(
      'click',
      flipCard
    );


    card.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {

          event.preventDefault();
          flipCard();

        }

      }
    );

  }


  /* ---------- song player ---------- */

  const audio =
    document.getElementById('audio');

  const playBtn =
    document.getElementById('playBtn');

  const iconPlay =
    document.getElementById('iconPlay');

  const iconPause =
    document.getElementById('iconPause');

  const barFill =
    document.getElementById('playerBarFill');


  if (
    audio &&
    playBtn &&
    iconPlay &&
    iconPause &&
    barFill
  ) {

    /* ---------- play / pause ---------- */

    playBtn.addEventListener(
      'click',
      () => {

        if (audio.paused) {

          audio.play().catch(() => {

            console.warn(
              'Taruh file lagu di assets/song.mp3 agar lagu dapat diputar.'
            );

          });

        } else {

          audio.pause();

        }

      }
    );


    /* ---------- ketika lagu dimainkan ---------- */

    audio.addEventListener(
      'play',
      () => {

        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';

      }
    );


    /* ---------- ketika lagu dijeda ---------- */

    audio.addEventListener(
      'pause',
      () => {

        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';

      }
    );


    /* ---------- progress lagu ---------- */

    audio.addEventListener(
      'timeupdate',
      () => {

        if (
          audio.duration &&
          Number.isFinite(audio.duration)
        ) {

          const progress =
            (audio.currentTime / audio.duration) * 100;

          barFill.style.width =
            `${progress}%`;

        }

      }
    );


    /* ---------- lagu selesai ---------- */

    audio.addEventListener(
      'ended',
      () => {

        barFill.style.width = '0%';

      }
    );

  }


  /* ---------- envelope / letter ---------- */

  const envelopeBtn =
    document.getElementById('envelopeBtn');

  const letter =
    document.getElementById('letterText');


  if (
    envelopeBtn &&
    letter
  ) {

    envelopeBtn.addEventListener(
      'click',
      () => {

        const isOpen =
          envelopeBtn.classList.toggle(
            'is-open'
          );


        envelopeBtn.setAttribute(
          'aria-expanded',
          String(isOpen)
        );


        letter.classList.toggle(
          'is-visible',
          isOpen
        );


        /* scroll ke surat setelah envelope terbuka */

        if (isOpen) {

          setTimeout(() => {

            letter.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });

          }, 300);

        }

      }
    );

  }

});
