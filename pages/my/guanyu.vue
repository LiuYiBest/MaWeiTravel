<template>
    <view class="page">
        <imgsBanner :imgList='imgList' :currentImg='currentImg'></imgsBanner>
    </view>
	
</template>

<script>
    import imgsBanner from '../../common/imgsBanner-tag.vue'
    export default {
        components:{imgsBanner},
        data() {
            return {
                imgList:[
					'https://7869-xindemo-9gms6e168e9f811e-1304822355.tcb.qcloud.la/shop/%E9%BE%99%E9%A1%BB%E7%A4%BC%E7%9B%92.png?sign=e19bd81959b99e8365d7e86b12a16add&t=1616951690',
					'https://7869-xindemo-9gms6e168e9f811e-1304822355.tcb.qcloud.la/shop/%E6%A9%84%E6%A6%84.png?sign=3e2b8c087a001798e79fdd56aaceaf04&t=1616951941',
					'https://7869-xindemo-9gms6e168e9f811e-1304822355.tcb.qcloud.la/shop/%E7%A6%8F%E5%B7%9E%E8%8C%89%E8%8E%89%E8%8A%B1%E8%8C%B6.png?sign=070fa915581f24e31f21ce8fdac074f8&t=1616951480',
					'https://7869-xindemo-9gms6e168e9f811e-1304822355.tcb.qcloud.la/shop/%E7%A6%8F%E5%B7%9E%E5%A4%A7%E9%B1%BC%E4%B8%B8.png?sign=93d3e9d71371bd0e4885caee0095183e&t=1616951522', 
					'https://7869-xindemo-9gms6e168e9f811e-1304822355.tcb.qcloud.la/shop/%E7%A6%8F%E5%B7%9E%E7%87%95%E6%89%81%E8%82%89.png?sign=8b2678727e1bacac8a5e2cc05227bf2a&t=1616951572'
                ],
                currentImg:0,  //当前默认选中
            };
        }
    }
</script>
<style  lang="scss">
</style>