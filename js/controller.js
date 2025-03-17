import { WorksModel } from './work/model.js';
import { WorksView } from './work/view.js';

export class WorksController {
  constructor() {
    this.model = new WorksModel();
    this.view = new WorksView();
    this.init();
  }

  async init() {
    const works = await this.model.fetchWorks();
    if (works.length > 0) {
      this.view.displayWorks(this.model.filterWorks('ALL'));
    } else {
      console.error('Нет данных для отображения.');
    }
    this.view.bindCategoryButtons(this.handleCategoryChange.bind(this));
  }

  async handleCategoryChange(category) {
    await this.view.fadeOutContent();
    this.view.clearContent();
    const filteredWorks = this.model.filterWorks(category);
    this.view.displayWorks(filteredWorks);
  }
}

const controller = new WorksController();
