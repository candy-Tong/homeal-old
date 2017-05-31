const conf = {
  data: {
    hasEmptyGrid: false,
    pre_button_show: false,
    selected: 2,
    disableList: [13, 14, 15, 16, 17, 18, 19, 20]
  },
  onLoad(options) {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
  },

  //选择日期
  selectDate(e) {
    //出去不可选择的
    if (this.data.disableList.indexOf(parseInt(e.currentTarget.id)) == -1) {
      this.setData({
        selected: e.currentTarget.id
      });
    }

  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  //得到日期数组
  calculateDays(year, month) {
    let days = [];
    let week = [];
    let count = 0;
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        week.push(0);
        count++;
      }
    }

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      week.push(i);
      count++;
      if (count % 7 === 0) {
        days.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      let length = week.length;
      for (let i = 0; i < 7 - length; i++) {
        week.push(0);
      }
      days.push(week);
    }
    console.log(days);
    this.setData({
      days
    });
  },

  // 切换控制年月
  handleCalendar(e) {
    const today = new Date();
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });

      //判断是否隐藏月份向前按钮
      if (newMonth === today.getMonth() + 1 && newYear === today.getFullYear()) {
        console.log("隐藏向前按钮");
        this.setData({
          pre_button_show: false
        });
      }


    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

      //判断是否显示月份向前按钮
      if ((newMonth !== today.getMonth() + 1 || newYear !== today.getFullYear()) && !this.data.pre_button_show) {
        console.log("显示向前按钮");
        this.setData({
          pre_button_show: true
        });
      }

    }
  },
  onShareAppMessage() {
    return {
      title: '小程序日历',
      desc: '还是新鲜的日历哟',
      path: 'pages/index/index'
    }
  }
};

Page(conf);
