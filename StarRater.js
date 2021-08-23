class StartRater extends HTMLElement {
  constructor() {
    super();
    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styles());

    const rater = this.createRater();
    /* this.stars é para compartilhar stars globalmente na class */
    this.stars = this.createStars();

    this.stars.forEach((star) => {
      rater.appendChild(star);
    });

    this.resetRating();

    shadow.appendChild(rater);
  }

  /* Cria uma div com a class star-rater */
  createRater() {
    const rater = document.createElement("div");
    rater.classList.add("star-rater");
    rater.addEventListener('mouseout', this.resetRating.bind(this));
    return rater;
  }

  /* Cria um array de estrelas */
  createStars() {
    const createStar = (_, id) => {
      const star = document.createElement("span");
      star.classList.add("star");
      star.setAttribute("data-value", Number(id) + 1);
      star.innerHTML = "&#9733;";
      star.addEventListener("click", this.setRating.bind(this));
      star.addEventListener("mouseover", this.ratingHover.bind(this));
      return star;
    };

    return Array.from({ length: 5 }, createStar);
  }

  /* Evento de passar o mouse em cima da estrela */
  ratingHover(event) {
    this.currentRatingValue = event.currentTarget.getAttribute("data-value");
    this.hightLightRating();
  }

  /* Set class para colorir a estrela */
  hightLightRating() {
    this.stars.forEach((star) => {
      if (star.getAttribute("data-value") <= this.currentRatingValue)
        star.classList.add("active");
      else star.classList.remove("active");
    });
  }

  resetRating(){
      this.currentRatingValue = this.getAttribute('data-rating') || 0;
      this.hightLightRating();
  }


  /* Evento de click do mouse na estrela */
  setRating(event) {
    this.setAttribute(
      "data-rating",
      event.currentTarget.getAttribute("data-value")
    );
  }

  styles() {
    const style = document.createElement("style");

    style.textContent = `
            .star-rater {
                background-color: #fff;
                width: fit-content;
            }
        
            .star{
                font-size: 5rem;
                color: gray;
                cursor: pointer;
            }
            .star.active{
                color: yellow;
            }`;

    return style;
  }
}

customElements.define("star-rater", StartRater);
