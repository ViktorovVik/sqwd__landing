export class WorksModel {
  constructor() {
    this.works = [];
  }

  async fetchWorks() {
    try {
      const response = await fetch('./js/works.json');
      if (!response.ok) {
        throw new Error(`Ошибка загрузки JSON: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Ответ сервера не является JSON');
      }

      const data = await response.json();
      this.works = data.works;
      return this.works;
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      return [];
    }
  }

  filterWorks(category) {
    if (category === 'ALL') {
      const categories = ['Photography', 'Web Design', 'Branding', 'Illustration'];
      return categories.map(cat => {
        return this.works.find(work => work.category.toUpperCase() === cat.toUpperCase());
      }).filter(Boolean);
    } else {
      return this.works
        .filter(work => work.category.toUpperCase() === category.toUpperCase())
        .slice(0, 4);
    }
  }
}