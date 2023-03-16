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
    arrayFt:[0.91,11.1,1.27,1.43,1.57,1.71,1.8,1.89,1.96,2.04,2.09,2.14,2.18,2.22
    ],
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
    res_text1:'请输入工程中合理的数据，\n注意单位转换;\n（ps：个人玩具项目，画饼不断，也许有bug，计算结果仅供参考(￣▽￣)"）',
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
    var ft = this.data.arrayFt[this.data.index];
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
    var ρmin = 0.45*ft/fy*h/h0;
    if(ρmin>0.002){
      ρmin = ρmin;
    }else{
      ρmin = 0.002;
    }
    var ρ = As/(b*h0);

    var text1 = "（1）几何信息：\n h0=h-as="+h+"-"+as+"="+(h-as)+"(mm)";
    var text2 = "（2）参数：\n αs = M/(α1*fc*b*h0*h0),\n 其中，混凝土级别为"+this.data.array1[this.data.index]+"时，α1="+α1+",fc="+fc+",\n 故αs="+M+"*1000000/"+"("+α1+"*"+fc+"*"+b+"*"+h0+"*"+h0+")="+αs+"; \n ξ=1-√(1-2αs)="+ξ+";";
    var text3 = "（3）验算：\n ξb=β1/(1+(fy/(Es*εcu))),\n而混凝土级别为"+this.data.array1[this.data.index]+"时，β1="+β1+",εcu="+εcu+";\n受拉纵筋级别为"+this.data.array2[this.data.index2]+"时，fy="+fy+",Es="+Es+";\n 故，ξb="+ξb+";";
    if(ξb<ξ){
      text3+="\n由于ξ="+ξ+",超过ξb，故超筋，不合要求。"
    }else{
      if(ρmin>ρ){
      text3+="\n由于ξ="+ξ+",不超过ξb，故合乎要求。\n由于ρ="+ρ+",ρmin="+ρmin+",ρ<ρmin,不合要求"
      }else{
        text3+="\n由于ξ="+ξ+",不超过ξb，故合乎要求。\n由于ρ="+ρ+",ρmin="+ρmin+",ρ=>ρmin,合乎要求;\n"+"故，ys=0.5*(1+√(1-2as))="+ys+";\n As=M/(fy*ys*h0)="+As+"(mm2);\n"
      }
    }
    var text4 = "（4）最后：如果上述数据出现有异常，请先检查是否完整正确输入数据。如果无法解决，也可反馈，可能是程序有bug也不奇怪，至于什么时候修，这个就得继续画饼了ヽ(゜▽゜　)－C<(/;◇;)/~"
    this.setData({
      res_text1:text1,
      res_text2:text2,
      res_text3:text3,
      res_text4:text4
    })
  },

  delect:function(e){
    this.setData({
      b: null,
      h:null,
      as:null,
      M:null,
      res_text1:'请输入工程中合理的数据，\n注意单位转换;\n（ps：个人玩具项目，画饼不断，也许有bug，计算结果仅供参考(￣▽￣)"）',
      res_text2:'',
      res_text3:'',
      res_text4:''
    })
  }
})