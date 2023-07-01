async function getDashboardData(url = '/data.json') {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}



class DashboardItem {

  static PERIODS = {
    daily: 'day',
    weekly: 'week',
    monthly: 'month',
  }

  constructor(data, container = '.dashboards__items', view = 'weekly') {
    this.data = data;
    this.container = document.querySelector(container);
    this.view = view;
    this.createMarkup();
  }

  createMarkup() {
    const { title, timeframes } = this.data;
    const id = title.toLowerCase().replace(/ /g, '-');
    const { current, previous } = timeframes[this.view.toLowerCase()];
    this.container.insertAdjacentHTML('beforeend', `
        <div class="dashboard__item dashboard__item--${id}">
        <arcticle class="tracking-card">
          <header class="treacking-card__header">
            <h4 class="tracking-card__title">${title}</h4>
          </header>
          <div class="tracking-card__body">
            <div class="tracking-card__time">
              ${current}hrs
            </div>
            <div class="tracking-card__prev-period">
              Last ${DashboardItem.PERIODS[this.view]} - ${previous}hrs
            </div>
          </div>
        </arcticle>
      </div>
        `)
    this.time = this.container.querySelector(`.dashboard__item--${id} .tracking-card__time`);
    this.prev = this.container.querySelector(`.dashboard__item--${id} .tracking-card__prev-period`);
  }

  changeView(view) {
    this.view = view.toLowerCase();
    const { current, previous } = this.data.timeframes[this.view.toLowerCase()];
    this.time.innerText = `${current}hrc`;
    this.prev.innerText = `Last ${DashboardItem.PERIODS[this.view]} - ${previous}hrs`;
  }

}



document.addEventListener('DOMContentLoaded', () => {
  getDashboardData('https://635d74d2ea764497f0dd237e.mockapi.io/orders')
    .then(data => {
      // console.log(data);
      const activities = data.map(activitiy => new DashboardItem(activitiy, '.dashboards__items', 'monthly'));
      const selectors = document.querySelectorAll('.view-selector__item');
      console.log(activities);
      selectors.forEach(selector => {
        selector.addEventListener('click', function () {
          selectors.forEach(sel => sel.classList.remove('view-selector__item--active'));
          selector.classList.add('view-selector__item--active');
          const curentView = selector.innerText.trim().toLowerCase();
          activities.forEach(activity => activity.changeView(curentView));
        });
      });
    });

  // const colors = document.querySelectorAll('.colors tr');
  // let objColors = {};
  // let namePalitra = "Зелёные тона:"
  // colors.forEach(e => {
  //     if (e.children.length == 3) {
  //         const nameColor = e.children[0].innerText;
  //         objColors[namePalitra][nameColor] = [e.children[1].innerText, e.children[2].innerText]
  //     }
  //     else {
  //         namePalitra = e.children[0].innerText;
  //         objColors[namePalitra] = {};
  //     }
  // })
  // console.log(objColors)
  // console.log(JSON.stringify(objColors))
  getDashboardData('https://635d74d2ea764497f0dd237e.mockapi.io/favorites')
    .then(data => {
      console.log(data)
    })
});










