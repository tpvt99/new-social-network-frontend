export const Mixin = {
  filters: {
    languageFilter (e) {
      if (e === 'sport') {
        return 'Thể thao'
      } else if (e === 'language') {
        return 'Ngoại ngữ'
      } else if (e === 'swim') {
        return 'Bơi lội'
      } else if (e === 'football') {
        return 'Bóng đá'
      } else if (e === 'basketball') {
        return 'Bóng rổ'
      } else if (e === 'surfing') {
        return 'Lướt sóng'
      } else if (e === 'badminton') {
        return 'Cầu lông'
      } else if (e === 'volleyball') {
        return 'Bóng chuyền'
      } else if (e === 'skateboarding') {
        return 'Trượt ván'
      } else if (e === 'archery') {
        return 'Bắng cung'
      } else if (e === 'en') {
        return 'Tiếng Anh'
      } else if (e === 'zh') {
        return 'Tiếng Trung'
      } else if (e === 'hi') {
        return 'Tiếng Hindu'
      } else if (e === 'es') {
        return 'Tiếng Tây Ban Nha'
      } else if (e === 'ar') {
        return 'Tiếng Arab'
      } else if (e === 'ko') {
        return 'Tiếng Hàn'
      } else if (e === 'ja') {
        return 'Tiếng Nhật'
      } else if (e === 'de') {
        return 'Tiếng Đức'
      } else {
        return e
      }
    }
  }
}
