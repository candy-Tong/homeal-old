const conf = {
  data: {
    hasEmptyGrid: false,
    pre_button_show: false,

    disableList: [13, 14, 15, 16, 17, 18, 19, 20],
    hour: [11, 12, 13, 14],
    index: 1,
    time: ["12:00", "18:00"]
  },
  onLoad(options) {
    let date=options.date
    let time=options.time
    date=JSON.parse(date)
   

    // 初始化日期
    // let date = new Date();
    // const cur_year = date.getFullYear();
    // const cur_month = date.getMonth() + 1;
    // const cur_day = date.getUTCDate()+1;
    const weeks_ch = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.calculateDays(date.year, date.month);
    let this_time=this.data.time
    let meal_time
    if(parseInt(time)<15){
      this_time[0]=time
      meal_time=0
    }else{
      this_time[1] = time
      meal_time = 1
    }

    this.setData({
      date,
      time:this_time,
      meal_time,
      weeks_ch
    });
  },

  // 确定日期 返回
  finish() {
    
    let time = this.data.time[this.data.meal_time]
    // console.log(date)
    let pages=getCurrentPages();
    let prevPage=pages[pages.length-2];
    prevPage.setData({
      "order.date": this.data.date,
      "order.time":time
    })
    wx.navigateBack({
      delta:1
    })
  },

  // 选择时间
  bindTimeChange: function (e) {
    let time = this.data.time
    time[e.currentTarget.id] = e.detail.value
    this.setData({
      time: time
    })
  },

  //勾选时间
  selectChange(e) {
    this.setData({
      meal_time: parseInt(e.currentTarget.id)
    });
  },


  //选择日期
  selectDate(e) {
    // 除去不可选择的
    if (this.data.disableList.indexOf(parseInt(e.currentTarget.id)) == -1) {
      this.setData({
        "date.day": e.currentTarget.id
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
    const cur_year = this.data.date.year;
    const cur_month = this.data.date.month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);

      this.setData({
        "date.year": newYear,
        "date.month": newMonth
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
        "date.year": newYear,
        "date.month": newMonth
      })

      //判断是否显示月份向前按钮
      if ((newMonth !== today.getMonth() + 1 || newYear !== today.getFullYear()) && !this.data.pre_button_show) {
        console.log("显示向前按钮");
        this.setData({
          pre_button_show: true
        });
      }

    }
  }
};

Page(conf);
