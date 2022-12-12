// pages/calculate/cla.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array1: ['c15', 'c20', 'c25', 'c30','c35','c40','c45','c50','c55','c60','c65','c70','c75','c80'],
    array2:['HPB300','HRB335','HRB400,HRBF400,RRB400','HRB500,HRBF500'],
    arrayA1:[1,1,1,1,1,1,1,1,0.99,0.98,0.97,0.96,0.95,0.94],
    arrayFc:[7.2,9.6,11.9,14.3,16.7,19.1,21.1,23.1,25.3,27.5,29.7,31.8,33.8,35.3],
    arrayFy:[270,300,360,435],
    arrayB1:[0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.79,0.78,0.77,0.76,0.75,0.74
    ],
    arrayEs:[210000,200000,200000,200000],
    arrayEcu:[0.0033,0.0033,0.0033,0.0033,0.0033,0.0033,0.0033,0.0033,0.0032,0.0032,0.0031,0.0031,0.003,0.003],
    index: 0,
    index2:0,
    b: null,
    h: null,
    as: null,
    M: null,
    res_text1:'none',
    res_text2:'',
    res_text3:'',
    res_text4:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },


  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  bInput:function(e){
    this.setData({
      b:e.detail.value
    }
    )
  },
  hInput:function(e){
    this.setData({
      h:e.detail.value
    }
    )
  } ,
   asInput:function(e){
    this.setData({
      as:e.detail.value
    }
    )
  },
  MInput:function(e){
    this.setData({
      M:e.detail.value
    }
    )
  },



  start:function(e){
    var b = this.data.b;
    var h = this.data.h;
    var as = this.data.as;
    var M = this.data.M;
    var α1 = this.data.arrayA1[this.data.index];
    var fc = this.data.arrayFc[this.data.index];
    var fy = this.data.arrayFy[this.data.index2];
    var β1 = this.data.arrayB1[this.data.index];
    var Es = this.data.arrayEs[this.data.index2];
    var εcu = this.data.arrayEcu[this.data.index];

    var h0 = h-as;
    var αs = M*1000000/(α1*fc*b*h0*h0);
    var ξ = 1-(Math.sqrt((1-2*αs)));
    var ξb = β1/(1+(fy/(Es*εcu)));
    var ys = 0.5*(1+(Math.sqrt((1-2*αs))));
    var As = M*1000000/(fy*ys*h0);

    var text1 = "（1）几何信息：\n h0=h-as="+h+"-"+as+"="+(h-as)+"(mm)";
    var text2 = "（2）参数：\n αs = M/(α1*fc*b*h0*h0),\n 其中，混凝土级别为"+this.data.array1[this.data.index]+"时，α1="+α1+",fc="+fc+",\n 故αs="+M+"*1000000/"+"("+α1+"*"+fc+"*"+b+"*"+h0+"*"+h0+")="+αs+"; \n ξ=1-√(1-2αs)="+ξ+";";
    var text3 = "（3）验算：\n ξb=β1/(1+(fy/(Es*εcu))),\n而混凝土级别为"+this.data.array1[this.data.index]+"时，β1="+β1+",εcu="+εcu+";\n受拉纵筋级别为"+this.data.array2[this.data.index2]+"时，fy="+fy+",Es="+Es+";\n 故，ξb="+ξb+";";
    if(ξb<ξ){
      text3+="\n由于ξ="+ξ+",超过ξb，故超筋，不合要求。"
    }else{
      text3+="\n由于ξ="+ξ+",不超过ξb，故合乎要求。\n ys=0.5*(1+√(1-2as))="+ys+";\n As=M/(fy*ys*h0)="+As+"(mm2);\n"
    }
    this.setData({
      res_text1:text1,
      res_text2:text2,
      res_text3:text3
    })
  },

  delect:function(e){
    this.setData({
      b: null,
      h:null,
      as:null,
      M:null,
      res_text1:'none',
      res_text2:'',
      res_text3:'',
      res_text4:''
    })
  }
})