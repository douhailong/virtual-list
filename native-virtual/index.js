class VirtualList {
  constructor(containerEle, listEle, dataSource, itemHeight = 64) {
    this.containerEle = containerEle;
    this.listEle = listEle;
    this.renderData = [];
    this.state = {
      dataSource: dataSource,
      containerHeight: 0,
      itemHeight: itemHeight,
      max: 0
    };
    this.startIndex = 0;
    this.endIndex = 0;
    this.listStyle = {};
  }

  init() {
    this.containerHeight = this.containerEle.scrollHeight;
    this.state.max =
      Math.ceil(this.containerHeight / this.state.itemHeight) + 1;

    this.render();
    this.addEvent();
  }

  addEvent() {
    this.containerEle.addEventListener('scroll', () => {
      const currentIndex = Math.floor(
        this.containerEle.scrollTop / this.state.itemHeight
      );

      if (this.startIndex !== currentIndex) {
        this.startIndex = currentIndex;
        this.render();
      }
    });
  }

  getEndIndex() {
    const result = this.startIndex + this.state.max;
    this.endIndex = this.state.dataSource[result]
      ? result
      : this.dataSource.length;
  }

  getRenderData() {
    this.renderData = this.state.dataSource.slice(
      this.startIndex,
      this.endIndex
    );
  }

  getListStyle() {
    const { dataSource, itemHeight } = this.state;
    this.listStyle = {
      height: dataSource.length * itemHeight + 'px',
      transform: `translate3d(0, ${this.startIndex * itemHeight}px, 0)`
    };
  }

  render() {
    this.getEndIndex();
    this.getRenderData();
    this.getListStyle();

    const children = this.renderData
      .map(
        (data) =>
          `<div class="virtual-item">${data.name + '----' + data.index}</div>`
      )
      .join('');

    this.listEle.innerHTML = children;
    this.listEle.style.transform = this.listStyle.transform;
    this.listEle.style.height = this.listStyle.height;
  }
}

function getDataSource(nums) {
  const result = [];

  for (let i = 0; i < nums; i++) {
    result.push({ name: Math.random().toString(32).slice(2), index: i });
  }

  return result;
}

const listHandler = new VirtualList(
  document.querySelector('.container'),
  document.querySelector('.virtual-container'),
  getDataSource(1000)
);

listHandler.init();
