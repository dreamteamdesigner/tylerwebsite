async function getTestimonials() {
  const { data, error } = await db.rpc("get_site_testimonials", {
    site_key_input: SITE_KEY,
  });

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  console.log("Testimonials:", data);

  const container = document.querySelector(".new-reviews");

  if (!container) {
    console.error(".new-reviews container not found.");
    return;
  }

  const sortedTestimonials = [...data].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  container.innerHTML = sortedTestimonials
    .map((item) => {
      const rating = Number(item.rating);

      const reply = item.reply
        ? `
            <div class="review reply">
                <div class="top-info">
                    <div class="lefty">
                        <div class="user-dp">
                            <p>A</p>
                        </div>

                        <div class="user-name">
                            <div class="nnh">
                                <span>Admin</span>
                                <span class="small-email">Replied ${item.name}</span>
                            </div>
                        </div>
                    </div>

                    <div class="righty">
                        <div class="time-of-review">
                        </div>
                    </div>
                </div>

                <div class="review-info">
                    <p>${item.reply}</p>
                </div>
            </div>
        `
        : "";

      const message = item.message
        ? `<div class="review-info">
            <p>${item.message}</p>
          </div>`
        : "";

      const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const maskEmail = (email) => {
        if (!email || !email.includes("@")) {
          return email;
        }

        const [username, domain] = email.split("@");

        if (username.length === 1) {
          return `${username}******@${domain}`;
        }

        const firstCharacter = username[0];
        const lastCharacter = username[username.length - 1];

        return `${firstCharacter}******${lastCharacter}@${domain}`;
      };

      const maskedEmail = maskEmail(item.email);

      const stars = Array.from({ length: 5 }, (_, index) => {
        const filled = index < rating;

        return `
          <span class="${filled ? "filled-star" : "empty-star"}">★</span>
        `;
      }).join("");

      return `
        <div class="review">

          <div class="top-info">

            <div class="lefty">

              <div class="user-dp">
                <p>${item.name.charAt(0).toUpperCase()}</p>
              </div>

              <div class="user-name">

                <div class="nnh">
                  <span>${item.name}</span>
                  <span class="small-email">${maskedEmail}</span>
                </div>

                <span
                  class="rating-stars"
                  aria-label="Rating: ${rating} stars"
                >
                  ${stars}
                </span>

              </div>

            </div>

            <div class="righty">

              <div class="time-of-review">
                <p>${formattedDate}</p>
              </div>

            </div>

          </div>

          ${message}
          

          ${reply}

        </div>
      `;
    })
    .join("");
}

getTestimonials();
