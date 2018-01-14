<template>
  <div>
    <div>
      <header-comp></header-comp>
    </div>
    <div class="row">
      <h2></h2>
      <div class="_wf">
        <h3>Các lợi ích khi bạn sử dụng tính năng kết nối bạn bè này</h3>
        <ul>
          <li>Tìm kiếm bạn bè khắp mọi nơi trên thế giới</li>
          <li>Khám phá mọi người theo mục đích và sở thích</li>
          <li>Nhắn tin thời gian thực không giới hạn</li>
        </ul>
      </div>
      <div class="_wg">
        <h3>Trước khi bạn tham gia, hãy đọc kĩ quy định dưới đây. Điều này giúp đảm bảo bạn an toàn khi tham gia</h3>
        <ul>
          <li>Chúng tôi sẽ tạo tài khoản riêng khác với tài khoản mạng xã hội mà khi bạn đăng kí. Tuy nhiên để dùng được tính năng này phải có tài khoản mạng xã hội</li>
          <li>Khi tham gia vào tính năng này, không ai biết được tài khoản mạng xã hội của bạn trừ khi bạn nói cho họ biết</li>
          <li>Bạn phải cung cấp đầy đủ 5 thông tin cơ bản để tham gia bao gồm
            <ul>
              <li>Họ và tên</li>
              <li>Tuổi</li>
              <li>Giới tính</li>
              <li>Quốc tịch</li>
              <li>Ảnh đại diện</li>
            </ul>
          </li>
          <li>Bạn có quyền hiển thị bất kì thông tin nào khi tham gia miễn là người khác có thể tin tưởng bạn để kết nối</li>
          <li>Chúng tôi sẽ không bao giờ đưa thông tin trên cho bên thứ ba cũng như không kiểm tra thông tin so với tài khoản mạng xã hội bạn dùng.</li>
        </ul>
      </div>
      <div class="_wbegin">
        <a href="/network/c/" class="btn" role="button">Tham gia</a>
      </div>
    </div>
  </div>
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
