var gid = null

$(document).on("pageInit", function (e, pageId, $page) {
    //分类
    if (pageId == "sort") {
        $('#sort .sort-l').click(function (e) {
            var tar = e.target
            $(tar).addClass('active').siblings().removeClass(
                'active')
            $('#sort .sort-r>div').hide();
            $($(tar).attr('data-tar')).show()
        })
    }
    //主页面
    if (pageId == "main") {
        // 轮播
        var mySwiper1 = new Swiper('#swiper1', {
            pagination: '.swiper-pagination',
            autoplay: 3000,
            paginationClickable: true
        })
        var mySwiper2 = new Swiper('#swiper2', {
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 30,
            freeMode: true
        })
    }
    //订单
    if (pageId == 'order') {
        //checkbox事件
        var $tab1 = $('#tab1'),
            tx = 0;
        ty = 0
        $('.checkbox').click(function () {
            $(this).toggleClass('checked')
        })
        $('.all-check .checkbox').click(function () {
            $('.per-order .checkbox').attr('class',
                $(this).attr('class'))
            calcTotal()
        })
        $('.per-order .checkbox').click(function () {
            if ($('.per-order .checkbox.checked').length ==
                $(this).parents('ul').find(
                    '.per-order').length) {
                $('.all-check .checkbox').addClass(
                    'checked')
            } else {
                $('.all-check .checkbox').removeClass(
                    'checked')
            }
            calcTotal()
        })

        //删除订单触摸事件
        $tab1.find('.per-order-r').on('touchstart', function (e) {
            tx = e.touches[0].pageX
            ty = e.touches[0].pageY
        })
        $tab1.find('.per-order-r').on('touchend', function (e) {
            var ex = e.changedTouches[0].pageX,
                ey = e.changedTouches[0].pageY,
                $dele = $(this).parent().siblings('.dele')
            if (tx - ex > 50) {
                $dele.css('display', 'flex').animate({
                    width: '44px'
                }, 100)
            } else {
                $dele.animate({
                    width: 0
                }, 100).hide(100)
            }
        })
        // $tab1.find('.per-order-r').on('touchmove',function (e) {
        //     var mx=e.touches[0].pageX,my=e.touches[0].pageY,$dele=$(this).parent().siblings('.dele')
        //     console.log('tx-mx '+(tx-mx))
        //     if(tx-mx>50){
        //         $dele.css('display','flex').animate({width:'44px'},40)}
        //     else{
        //         $dele.animate({width:0},40).css('display','none')
        //     }
        // })

        // 删除功能
        $tab1.find('.dele').click(function () {
            $.toast("订单删除中", 20000);
        })

    }
    //积分须知
    if (pageId == 'know') {
        $('#know .card-header').click(function () {
            $(this).next().toggle(350).parent().siblings(
                '.card').find('.card-content').slideUp()
        })
    }
    //商品详情
    if (pageId == 'info') {

    }
    //发布商品
    if (pageId == 'seller') {


        
        //电话验证
        $('#seller').find('input[type="tel"]').blur(function () {
            !/^1[3|4|5|8|7][0-9]\d{4,8}$/.test($(this).val()) && $.toast('手机号格式不正确', 2000, 'toast-8')
        })
         $('#imgListPost').click(function (e) {
             var tar = e.target
             if (tar.nodeName == 'SPAN') {
                 $(tar.parentNode).remove()
             }
         })

    }
    //修改商品
    if (pageId == 'modify') {



        $('#imgListModify').click(function (e) {
            var tar=e.target
            if (tar.nodeName == 'SPAN') {
                $(tar.parentNode).remove()
            }
        })

    }
});

//计算总积分
function calcTotal() {
    var total = 0
    $('.per-order .checkbox.checked').siblings().find('.per-fen').each(function (i, v) {
        var n = $(this).next().find('i').html() - 0;
        total += ($(v).html() - 0) * n
    })
    $('.order-total').html(total)
}

$(function () {

    $.init();

    //详情
    $('a[data-gid]').click(function () {
        gid = $(this).attr('data-gid');
    })

    // 兑换
    $('#goods').find('.buy').click(function (event) {
        event.stopPropagation()
        event.preventDefault()
        if (!$(this).hasClass('added')) {
            $.toast('已加入我的订单', 2000, 'toast-added')
            // $(this).addClass('added').html('已兑换')
        }
    })
})

function postGoods() {
    $('#seller').find('input').each(function (i, v) {
        if (!v.value) {
            switch (i) {
                case 0:
                    $.toast("请填入您的姓名", 2000, 'toast-7');
                    break;
                case 1:
                    $.toast("请填入联系方式", 2000, 'toast-7');
                    break;
                case 2:
                    $.toast("请填入商品名称", 2000, 'toast-7');
                    break;
                case 3:
                    $.toast("请填入兑换积分", 2000, 'toast-7');
                    break;
                case 4:
                    $.toast("请上传商品图片", 2000, 'toast-7');
                    break;
                default:
                    $.toast("请上传商品图片", 2000, 'toast-7')
                    break;
            }
            return false;
        }
    })
}

function loadImg(that) {
     if (typeof FileReader === 'undefined') {
        $.toast('您的手机不支持上传图片', 2000,'toast-11');
         return 
     }
    var inp = $(that).next('input')[0]
        inp.click()
        inp.onchange=function() {
            var imgFile = inp.files
            if (imgFile.length == 0) return
            if (imgFile.length > 9){
                $.toast('最多上传9张图片')
            }
            $(imgFile).each(function (i, v) {
                if (!/\/(?:jpeg|png|gif)/i.test(v.type)) return;
                var reader = new FileReader()
                reader.readAsDataURL(v);
                reader.onload = function () { 
                    var url = this.result
                    $(that).prev('ul').append("<li style='background-image:url("+url+")'><span>&times;</span></li>")
                 }
            })
        }
}
