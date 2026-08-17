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
