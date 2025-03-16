document.addEventListener('DOMContentLoaded', function () {
   const categoriesButtons = document.querySelectorAll('.categories__button');
   const workListLeft = document.querySelector('.work__list--left');
   const workListRight = document.querySelector('.work__list--right');
 
   // Функция для загрузки данных из JSON
   async function fetchWorks() {
     try {
       const response = await fetch('./js/works.json'); // Убедитесь, что путь правильный
       if (!response.ok) {
         throw new Error(`Ошибка загрузки JSON: ${response.status} ${response.statusText}`);
       }
 
       const contentType = response.headers.get('content-type');
       if (!contentType || !contentType.includes('application/json')) {
         throw new Error('Ответ сервера не является JSON');
       }
 
       const data = await response.json();
       return data.works; // Возвращаем массив работ
     } catch (error) {
       console.error('Ошибка при загрузке данных:', error);
       return []; // Возвращаем пустой массив в случае ошибки
     }
   }
 
   // Функция для отображения работ с анимацией
   async function displayWorksWithAnimation(works, category = 'ALL') {
     // Добавляем анимацию исчезновения для текущего контента
     const currentItems = [...workListLeft.children, ...workListRight.children];
     currentItems.forEach(item => {
       item.classList.add('fade-out');
     });
 
     // Ждём завершения анимации исчезновения
     await new Promise(resolve => setTimeout(resolve, 500));
 
     // Очищаем контент после анимации
     workListLeft.innerHTML = '';
     workListRight.innerHTML = '';
 
     // Фильтруем работы
     let filteredWorks = [];
     if (category === 'ALL') {
       const categories = ['Photography', 'Web Design', 'Branding', 'Illustration'];
       filteredWorks = categories.map(cat => {
         return works.find(work => work.category.toUpperCase() === cat.toUpperCase());
       }).filter(Boolean);
     } else {
       filteredWorks = works
         .filter(work => work.category.toUpperCase() === category.toUpperCase())
         .slice(0, 4);
     }
 
     // Отображаем отфильтрованные работы с анимацией появления
     filteredWorks.forEach((work, index) => {
       const workItem = document.createElement('li');
       workItem.className = 'work__item fade-in'; // Добавляем класс для анимации
 
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
 
       // Добавляем класс work-card__title--right для заголовков в правой колонке
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
 
       // Распределяем работы между левой и правой колонками
       if (index % 2 === 0) {
         workListLeft.appendChild(workItem);
       } else {
         workListRight.appendChild(workItem);
       }
     });
   }
 
   // Обработчик событий для кнопок категорий
   categoriesButtons.forEach(button => {
     button.addEventListener('click', async () => {
       // Убираем активный класс у всех кнопок
       categoriesButtons.forEach(btn => btn.classList.remove('active'));
       // Добавляем активный класс к текущей кнопке
       button.classList.add('active');
 
       // Загружаем работы и отображаем их по выбранной категории с анимацией
       const works = await fetchWorks();
       await displayWorksWithAnimation(works, button.textContent);
     });
   });
 
   // Инициализация страницы: загружаем и отображаем все работы с анимацией
   fetchWorks().then(works => {
     if (works.length > 0) {
       displayWorksWithAnimation(works); // Отображаем все работы при загрузке страницы
     } else {
       console.error('Нет данных для отображения.');
     }
   });
 });