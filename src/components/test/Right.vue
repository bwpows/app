
<template>
    
    <div class="container">
      <div class="list-item2" v-for="(item,index) in list " data-type="0" :key="index">
          <div class="list-box d-flex align-center" @touchstart.capture="touchStart" @touchend.capture="touchEnd" :data-index="index">
            <p class="title">{{item.title}}</p>
          </div>
          <div class="delete" @click="deleteItem" :data-index="index">删除</div>
      </div>
    </div>
</template>
<script>

export default {

    name: 'TestRight',
    data(){
        return{
            startX: 0,
            endX: 0,
            list:[
                {
                    title:'你好1',
                    tips:'提示1',
                    time:'2020-1-19',
                },
            ]
        }
    },

    methods:{
    // 滑动开始
        touchStart (e) {
            console.log(e);
            // 记录初始位置
            this.startX = e.touches[0].clientX
        },
        // 滑动结束
        touchEnd (e) {
            console.log(e);
            let index = e.currentTarget.dataset.index;
            // 当前滑动的父级元素
            let parentElement = e.currentTarget.parentElement
            // 记录结束位置
            this.endX = e.changedTouches[0].clientX
            // 左滑
            if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
            this.restSlide(index)
            parentElement.dataset.type = 1;
            }
            // 右滑
            if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
            this.restSlide(index);
            parentElement.dataset.type = 0;
            }
            this.startX = 0
            this.endX = 0
        },
        // 判断当前是否有滑块处于滑动状态
        checkSlide () {
            let listItems = document.querySelectorAll('.list-item2')
            for (let i = 0; i < listItems.length; i++) {
                if (listItems[i].dataset.type == 1) {
                    return true
                }
            }
            return false
        },
        // 复位滑动状态
        restSlide (index) {
            let listItems = document.querySelectorAll('.list-item2')
            // 复位
            for (let i = 0; i < listItems.length; i++) {
            if(index == i){
                listItems[i].dataset.type = 1
            }
            else{
                listItems[i].dataset.type = 0;
            }
            }
        },
        // 删除
        deleteItem (e) {
            console.log(e)
            // 当前索引
            let index = e.currentTarget.dataset.index
            // 复位
            this.restSlide()
            // 删除
            this.list.splice(index, 1)
        }
    }

}

</script>
<style scoped>


.container{
    overflow: hidden;
  }
  .list-item2{
    position: relative;
    height: 1.6rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .list-item2[data-type="0"]{
    transform: translate3d(0,0,0);
  }
  .list-item2[data-type="1"]{
    transform: translate3d(-2rem,0,0);
  }
  .list-item2:after{
    content: " ";
    position: absolute;
    left: 0.2rem;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .list-box{
    padding: 0.2rem;
    background: #fff;
    display: flex;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
  }
  .list-item2 .list-img{
    display: block;
    width: 1rem;
    height: 1rem;
  }
  .list-item2 .list-content{
    padding: 0.1rem 0 0.1rem 0.2rem;
    position: relative;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
  }
  .list-item2 .title{
    display: block;
    color: #333;
    overflow: hidden;
    font-size: 15px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list-item2 .tips{
    display: block;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list-item2 .time{
    display: block;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 0.1rem;
    color: #666;
  }
  .list-item2 .delete{
    width: 2rem;
    height: 1.6rem;
    background: #ff4949;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 1.6rem;
    position: absolute;
    top:0;
    right: -2rem;
  }

</style>
