export class WorksView {
  constructor() {
    this.categoriesButtons = document.querySelectorAll('.categories__button');
    this.workListLeft = document.querySelector('.work__list--left');
    this.workListRight = document.querySelector('.work__list--right');
  }

  clearContent() {
    this.workListLeft.innerHTML = '';
    this.workListRight.innerHTML = '';
  }

  displayWorks(works) {
    works.forEach((work, index) => {
      const workItem = document.createElement('li');
      workItem.className = 'work__item fade-in';

      const workCard = document.createElement('article');
      workCard.className = 'work-card work__article';

      const workCardTop = document.createElement('div');
      workCardTop.className = 'work-card__top';

      const img = document.createElement('img');
      img.src = work.image;
      img.alt = work.title;
      img.className = 'work-card__img';
      img.width = 455;
      img.height = 444;

      const title = document.createElement('h3');
      title.className = 'work-card__title h3';
      title.innerHTML = work.title.replace('\n', '<br>');

      if (index % 2 !== 0) {
        title.classList.add('work-card__title--right');
      }

      workCardTop.appendChild(img);
      workCardTop.appendChild(title);

      const workCardText = document.createElement('div');
      workCardText.className = 'work-card__text work-card__text--left';

      const categoryTitle = document.createElement('h4');
      categoryTitle.className = 'h4 h4--second-family';
      categoryTitle.textContent = work.category;

      const desc = document.createElement('p');
      desc.className = 'work-card__desc';
      desc.textContent = work.description;

      const link = document.createElement('a');
      link.href = '#!';
      link.className = 'work-card__link';
      link.textContent = 'READ MORE';

      workCardText.appendChild(categoryTitle);
      workCardText.appendChild(desc);
      workCardText.appendChild(link);

      workCard.appendChild(workCardTop);
      workCard.appendChild(workCardText);

      workItem.appendChild(workCard);

      if (index % 2 === 0) {
        this.workListLeft.appendChild(workItem);
      } else {
        this.workListRight.appendChild(workItem);
      }
    });
  }

  async fadeOutContent() {
    const currentItems = [...this.workListLeft.children, ...this.workListRight.children];
    currentItems.forEach(item => {
      item.classList.add('fade-out');
    });

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  bindCategoryButtons(handler) {
    this.categoriesButtons.forEach(button => {
      button.addEventListener('click', async () => {
        this.categoriesButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        await handler(button.textContent);
      });
    });
  }
}