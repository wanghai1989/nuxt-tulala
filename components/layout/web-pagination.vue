<template>
     <ul class="mo-paging" v-if="pages>1">
         <li
        :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]"
        @click="first">首页</li>

        <li
        :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]"
        @click="prev">上一页</li>
        
        <li
        :class="['paging-item', 'paging-item--more']"
        v-if="showPrevMore">...</li>

        <li
        :class="['paging-item', {'paging-item--current' : index === pager}]"
        v-for="(pager,i) in pagers" :key="i"
        @click="go(pager)">{{ pager }}</li>

        <li
        :class="['paging-item', 'paging-item--more']"
        v-if="showNextMore">...</li>
        
        <!-- next -->
        <li
        :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]"
        @click="next">下一页</li>

        <!-- last -->
        <li
        :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]"
        @click="last">末页</li>
    </ul>
</template>
<script>
export default {
    name : 'MoPaging',
    //通过props来接受从父组件传递过来的值
    props : {
        //页面中的可见页码，其他的以...替代, 必须是奇数
        perPages : { 
            type : Number,
            default : 5 
        },

        //当前页码
        pageIndex : {
            type : Number,
            default : 1
        },

        //每页显示条数
        pageSize : {
            type : Number,
            default : 2
        },

        //总记录数
        total : {
            type : Number,
            default : 1
        },

    },
    methods : {
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next(){
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first(){
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        go (page) {
            if (this.index !== page) {
                this.index = page
                //父组件通过change方法来接受当前的页码
                this.$emit('change', this.index)
            }
        }
    },
    computed : {

        //计算总页码
        pages(){
            return Math.ceil(this.size / this.limit)
        },

        //计算页码，当count等变化时自动计算
        pagers () {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.index
            const _offset = (perPages - 1) / 2

            
            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }

            return array
        }
    },
    data () {
        return {
            index : this.pageIndex, //当前页码
            limit : this.pageSize, //每页显示条数
            size : this.total || 1, //总记录数
            showPrevMore : false,
            showNextMore : false
        }
    },
    watch : {
        pageIndex(val) {
            this.index = val || 1
        },
        pageSize(val) {
            this.limit = val || 10
        },
        total(val) {
            this.size = val || 1
        }
    }
}
</script>

<style lang="less" scoped>
.mo-paging {
    display: block;
    text-align: center;
    padding: 0;
        margin: 30px 0 10px;
    font-size: 0;
    list-style: none;
    user-select: none;
    > .paging-item {
        font-size: 14px;
            border: solid 1px #eee;
    border-radius: 2px;
    color: #333;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    padding: 8px 17px;
    background: #fff;
        margin: 0 2px;
        &:first-child {
            margin-left: 0;
        }
        &:hover {
                color: #fff;
    background-color: #34bc76;
    border: solid 1px #34bc76;
        }
        &.paging-item--disabled,
        &.paging-item--more{
            background-color: #fff;
            color: #505050;
        }
        //禁用
        &.paging-item--disabled {
            cursor: not-allowed;
            opacity: .75;
                border: solid 1px #eee;
        }
        &.paging-item--more,
        &.paging-item--current {
            cursor: default;
        }
        //选中
        &.paging-item--current {
                color: #fff;
    background-color: #34bc76;
    border: solid 1px #34bc76;
            color:#fff;
            position: relative;
            z-index: 1;
            // border-color: #0275d8;
        }
    }
}

</style>