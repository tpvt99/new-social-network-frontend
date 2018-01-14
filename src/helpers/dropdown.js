export default {
  closeOtherDropdowns () {
    document.querySelectorAll('.dropdown-menu').forEach((e) => {
      e.style.display = 'none'
    })
  }
}
