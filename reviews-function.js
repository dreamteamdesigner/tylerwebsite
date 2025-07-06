document.addEventListener('DOMContentLoaded', () => {

  /* ----------  CONFIG  ---------- */
  const STORAGE_KEY   = 'myRecentReviews';
  const MAX_AGE_MS    = 1000 * 60 * 60;          // 1 hour
  const container     = document.querySelector('.contents-rev');
  const form          = document.querySelector('form');
  const sortSelect    = document.getElementById('nnn');

  /* ----------  HELPERS  ---------- */
  const maskEmail = (email) => {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    return user[0] + '*'.repeat(Math.max(user.length - 2, 0)) + user.slice(-1) + '@' + domain;
  };

  const paintStars = (rating) => {
    const full  = '★'.repeat(rating);
    const empty = '★'.repeat(5 - rating).split('')
                   .map(s => `<span style="color:rgba(255,0,0,.324)">${s}</span>`).join('');
    return full + empty;
  };

  const dateIso  = (ts) => new Date(ts).toISOString().slice(0, 10);             // YYYY‑MM‑DD
  const dateNice = (ts) => new Date(ts).toLocaleDateString('en-US',
                       { year:'numeric', month:'long', day:'numeric' });

  /* ----------  DOM ↔ DATA  ---------- */
  function buildReviewHTML({ name, email, rating, text, timestamp }) {
    const div = document.createElement('div');
    div.className = 'review';
    div.dataset.date = dateIso(timestamp);                                       // for sorting
    div.innerHTML = `
      <div class="top-info">
        <div class="lefty">
          <div class="user-dp"><p>${name[0].toUpperCase()}</p></div>
          <div class="user-name">
            <div class="nnh">
              <span>${name}</span>
              <span class="small-email">${maskEmail(email)}</span>
            </div>
            <span aria-label="Rating: ${rating} stars"
                  style="font-size:16px;color:rgb(255,0,0);margin:2px 0">
              ${paintStars(rating)}
            </span>
          </div>
        </div>
        <div class="righty">
          <div class="time-of-review"><p>${dateNice(timestamp)}</p></div>
        </div>
      </div>
      <div class="review-info"><p>${text}</p></div>
    `;
    return div;
  }

  /* ----------  SORTING  ---------- */
//   const getRating = el => +el.querySelector('[aria-label]')
//                             .getAttribute('aria-label')
//                             .match(/(\d+)/)[1];

//   const getDate   = el => new Date(el.dataset.date);

//   function sortReviews(order) {
//     const reviews = [...container.children];
//     reviews.sort((a, b) => {
//       if (order === 'newest')  return getDate(b) - getDate(a);
//       if (order === 'oldest')  return getDate(a) - getDate(b);
//       if (order === 'highest') return getRating(b) - getRating(a);
//       if (order === 'lowest')  return getRating(a) - getRating(b);
//       return 0;
//     });
//     container.replaceChildren(...reviews);
//   }

//   sortSelect.addEventListener('change', () => sortReviews(sortSelect.value));

  /* ----------  PERSISTENCE  ---------- */
  function loadStoredReviews() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    let arr;
    try { arr = JSON.parse(raw); }
    catch { localStorage.removeItem(STORAGE_KEY); return []; }

    const fresh = arr.filter(r => Date.now() - r.timestamp < MAX_AGE_MS);
    if (fresh.length !== arr.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); // prune expired
    }
    return fresh;
  }

  function saveStoredReviews(reviewsArr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewsArr));
  }

  /* ----------  REPLAY  ---------- */
  const stored = loadStoredReviews();
  stored.forEach(obj => container.prepend(buildReviewHTML(obj)));

  /* ----------  FORM SUBMIT  ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name   = document.getElementById('name')?.value.trim();
    const email  = document.getElementById('email')?.value.trim();
    const text   = document.getElementById('textarea')?.value.trim();
    const rating = form.querySelector('input[name="rating"]:checked')?.value;

    if (!name || !email || !text || !rating) {
      alert('Fill every field and choose a star rating.');
      return;
    }

    const data = {
      name,
      email,
      text,
      rating: +rating,
      timestamp: Date.now()
    };

    /* show immediately */
    container.prepend(buildReviewHTML(data));

    /* persist */
    stored.push(data);
    saveStoredReviews(stored);

    form.reset();
    sortReviews(sortSelect.value);
  });

  /* initial sort after replay */
//   sortReviews(sortSelect.value);
});
