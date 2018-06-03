//pages/index/poetry_library/poetry_library.js
Page({
  data: {
    list: [
      { alphabet: 'Top', datas: ['暗香'] },
      { alphabet: 'a', datas: ['暗香'] },
      { alphabet: 'b', datas: ['卜算子', '八六子', '八声甘州', '拜星月慢', '宝鼎现'] },
      { alphabet: 'c', datas: ['长相思', '春风袅娜', '钗头凤', '长亭怨慢', '翠楼吟'] },
      { alphabet: 'd', datas: ['点绛唇', '调笑令', '蝶恋花', '东风第一枝', '洞仙歌', '多丽', '夺锦标', '淡黄柳', '渡江云', '定西番', '定风波'] },
      { alphabet: 'e', datas: [] },
      { alphabet: 'f', datas: ['凤凰台上忆吹箫', '粉蝶儿', '法曲献仙音', '蕃女怨'] },
      { alphabet: 'g', datas: ['感皇恩', '更漏子', '桂枝香', '过秦楼', '归自谣'] },
      { alphabet: 'h', datas: ['河传', '河满子', '贺圣朝', '贺新郎', '画堂春', '换巢鸾凤', '喝火令', '汉宫春', '黄莺儿', '河渎神', '荷叶杯'] },
      { alphabet: 'j', datas: ['江南春', '解佩令', '解语花', '锦缠道', '荆州亭', '酒泉子', '江城子（单、可双）', '金人捧露盘', '锦堂春慢', '剑器近', '绛都春'] },
      { alphabet: 'k', datas: [] },
      { alphabet: 'l', datas: ['浪淘沙慢曲', '离亭燕', '临江仙', '柳梢青(', '六州歌头', '兰陵王', '六丑'] },
      { alphabet: 'm', datas: ['满庭芳', '摸鱼儿', '陌上花', '蓦山溪', '木兰花', '眉妩（妩）又名"百宜娇"', '木兰花慢'] },
      { alphabet: 'n', datas: ['南浦', '南乡子', '念奴娇（变格）', '念奴娇（定格）', '霓裳'] },
      { alphabet: 'p', datas: ['破阵子'] },
      { alphabet: 'q', datas: ['千秋岁', '沁园春', '清', '青玉案', '鹊桥仙', '齐天乐', '曲玉管', '戚氏'] },
      { alphabet: 'r', datas: ['如梦令', '阮郎归', '瑞鹤仙（格二）', '绕佛阁'] },
      { alphabet: 's', datas: ['声声慢', '十六字令', '疏影', '双双燕', '水调歌头', '水龙吟', '苏幕遮', '诉衷情', '琐窗寒', '三字令', '少年游', '寿楼春', '霜天晓角', '伤春怨', '石州慢', '哨徧', '上行杯'] },
      { alphabet: 't', datas: ['摊破浣溪沙', '桃源忆故人', '天仙子', '太常引', '唐多令', '天香'] },
      { alphabet: 'w', datas: ['误佳期', '浣溪沙', '巫山一段云', '望江东', '望远行'] },
      { alphabet: 'x', datas: ['惜分飞', '喜迁莺', '相见欢', '潇湘神', '潇湘夜雨', '小重山', '行香子', '雪梅香', '惜红衣', '西河', '西吴曲'] },
      { alphabet: 'y', datas: ['瑶台聚八仙', '谒金门', '一斛珠', '一翦梅', '忆江南', '忆秦娥（有', '忆王孙', '永遇乐', '渔歌子', '渔家傲', '虞美人', '雨淋铃', '雨霖铃', '玉漏迟', '御街行', '玉蝴蝶', '扬州慢', '忆旧游', '夜飞鹊', '忆少年', '夜游宫', '燕山亭（宴山亭）', '宴清都', '夜半乐', '莺啼序', '忆馀杭'] },
      { alphabet: 'z', datas: ['鹧鸪天', '昼夜乐', '烛影摇红（格二）', '祝英台近', '醉花阴', '醉太', '朝', '醉花间', '醉蓬莱', '醉翁操', '最高楼',] },
    ],
    alpha: '',
    windowHeight: ''
  },
  onLoad(options) {
    try {
      var res = wx.getSystemInfoSync()
      this.pixelRatio = res.pixelRatio;
      // this.apHeight = 32 / this.pixelRatio;
      // this.offsetTop = 160 / this.pixelRatio;
      this.apHeight = 16;
      this.offsetTop = 80;
      this.setData({ windowHeight: res.windowHeight + 'px' })
    } catch (e) {

    }
  },
  handlerAlphaTap(e) {
    let { ap } = e.target.dataset;
    this.setData({ alpha: ap });
  },
  handlerMove(e) {
    let { list } = this.data;
    let moveY = e.touches[0].clientY;
    let rY = moveY - this.offsetTop;
    if (rY >= 0) {
      let index = Math.ceil((rY - this.apHeight) / this.apHeight);
      if (0 <= index < list.length) {
        let nonwAp = list[index];
        nonwAp && this.setData({ alpha: nonwAp.alphabet });
      }
    }
  },
  next: function (e) {
    var keyword = e.currentTarget.dataset.keyword;
    console.log(keyword)
    wx.navigateTo({
      url: 'write/write?keyword=' + keyword,
    })
  }  
})