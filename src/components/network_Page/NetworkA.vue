<template>
  <section style="font-family:'Open Sans', sans-serif;">
    <div>
      <header-comp></header-comp>
    </div>
    <div>
      <div>
        <div class="_wb row">
          <!-- All images here are on google -->
          <div class="_wbtext">
            <h2>Kết nối với bạn bè năm châu</h2>
          </div>
          <div class="b1 _fl1 clearfix">
            <article class="col span-1-of-5">
              <div class="_wb1a _wb1">
              </div>
              <div class="_wb1_t">
                <p>Châu Á</p>
              </div>
            </article>
            <article class="col span-1-of-5">
              <div class="_wb2a _wb1">
              </div>
              <div class="_wb1_t">
                <p>Châu Úc</p>
              </div>
            </article>
            <article class="col span-1-of-5">
              <div class="_wb3a _wb1">
              </div>
              <div class="_wb1_t">
                <p>Châu Phi</p>
              </div>
            </article>
            <article class="col span-1-of-5">
              <div class="_wb4a _wb1">
              </div>
              <div class="_wb1_t">
                <p>Châu Mỹ</p>
              </div>
            </article>
            <article class="col span-1-of-5">
              <div class="_wb5a _wb1">
              </div>
              <div class="_wb1_t">
                <p>Châu Âu</p>
              </div>
            </article>
          </div>
        </div>
        <div class="_wa row">
          <div class="_wbtext _wbtext_red">
            <h2>Tìm hiểu con người và đất nước bạn</h2>
          </div>
          <div class="_fl1 a1">
            <article class="col span-1-of-3">
              <div class="_wa1a _wa1 _fl5a">
                <div class="_wa1_t">
                  Khám phá nền văn hóa đa dạng
                </div>
              </div>
              <div class="_wa1_t _wa1_tt">
                Lễ hội Carnaval - Brazil
              </div>
            </article>
            <article class="col span-1-of-3">
              <div class="_wa2a _wa1 _fl5a">
                <div class="_wa1_t">
                  Tìm hiểu phong tục tập quán và bản sắc dân tộc
                </div>
              </div>
              <div class="_wa1_t _wa1_tt">
                Geisha - Nhật Bản
              </div>
            </article>
            <article class="col span-1-of-3">
              <div class="_wa3a _wa1 _fl5a">
                <div class="_wa1_t">
                  Học hỏi lối sống đẹp, nhân văn và giàu giá trị
                </div>
              </div>
              <div class="_wa1_t _wa1_tt">
                Nữ thần Kumari - Nepal
              </div>
            </article>
          </div>
        </div>
        <div class="_wd">
          <div class="_wbtext _wbtext_green">
            <h2>Kết bạn theo sở thích và tính cách</h2>
          </div>
          <div class="_wd2">
            <ul class="clearfix wd2_ul">
              <li class="wd2_li">
                <figure class="wd2_photo">
                  <img src="/static/image/world/sport.jpg">
                </figure>
              </li>
              <li class="wd2_li">
                <figure class="wd2_photo">
                  <img src="/static/image/world/cooking.jpg">
                </figure>
              </li>
              <li class="wd2_li">
                <figure class="wd2_photo">
                  <img src="/static/image/world/camping.jpg">
                </figure>
              </li>
              <li class="wd2_li">
                <figure class="wd2_photo">
                  <img src="/static/image/world/art.jpg">
                </figure>
              </li>
            </ul>
          </div>
        </div>
        <div class="_wbegin">
          <a href="/network/b/" class="btn" role="button">Bắt đầu</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Header from './Header.vue'
export default {
  components: {
    headerComp: Header
  },
  mounted () {
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.dropdown-menu').forEach(function (e) {
        e.style.display = 'none'
      })
    })
  }
}
</script>
