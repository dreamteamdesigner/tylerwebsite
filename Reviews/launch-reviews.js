const reviewsContainer = document.querySelector(".reviews-grid");

const paintStars = (rating) => {
  const full = "★".repeat(rating);
  const empty = "★"
    .repeat(5 - rating)
    .split("")
    .map((s) => `<span style="color:#ff000053">${s}</span>`)
    .join("");

  return full + empty;
};

fetch("/Reviews/reviews.json")
  .then((response) => response.json())
  .then((reviews) => {
    // Sort newest to oldest
    reviews.sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });

    reviews.forEach((review) => {
      const formattedDate = new Date(review.Date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const maskedEmail = maskEmail(review.Email);

      const reviewCard = document.createElement("div");
      reviewCard.classList.add("review");

      reviewCard.innerHTML = `
      <div class="top-info">
          <div class="lefty">
              <div class="user-dp">
                  <p>${review.Name[0].toUpperCase()}</p>
              </div>

              <div class="user-name">
                  <div class="nnh">
                      <span>${review.Name}</span>
                      <span class="small-email">${maskedEmail}</span>
                  </div>

                  <span aria-label="Rating: 2 stars" style="font-size: 16px; color: rgb(255, 0, 0); margin: 2px 0px;">
                      ${paintStars(review.Rating)}
                  </span>
              </div>
          </div>
          <div class="righty">
              <div class="time-of-review">
                  <p>${formattedDate}</p>
              </div>
          </div>
        </div>

        ${
          review.Message
            ? `<div class="review-info">
          <p>${review.Message}</p>
        </div>`
            : ""
        }
        
        ${
          review.Reply
            ? `<div class="review reply">
                  <div class="top-info">
                      <div class="lefty">
                          <div class="user-dp">
                              <p>A</p>
                          </div>
                          <div class="user-name">
                              <div class="nnh">
                                  <span>Admin</span>
                                  <span class="small-email">Replied ${review.Name}</span>
                              </div>
                          </div>
                      </div>
                      <div class="righty">
                          <div class="time-of-review">
                          </div>
                      </div>
                  </div>
                  <div class="review-info">
                    <p>${review.Reply}</p>
                  </div>
              </div>`
            : ""
        }
        

      `;

      reviewsContainer.appendChild(reviewCard);
    });
  })
  .catch((error) => {
    console.error("Failed to load reviews:", error);
  });

function maskEmail(email) {
  if (!email) return "";

  const [username, domain] = email.split("@");

  return `${username.slice(0, 1)}******${username.slice(-1)}@${domain}`;
}
