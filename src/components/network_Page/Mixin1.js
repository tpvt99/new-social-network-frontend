import country from '../../helpers/country.js'
export const Mixin = {
  computed: {
    // return the profile of user you are visiting his/her page
    profileUser () {
      return this.$store.getters['network/getNetworkProfileVisiting']
    },
    profileImage () {
      return this.profileUser.profile_picture.image_url
    },
    profileUserName () {
      return this.profileUser.fullname
    },
    profileUserNetworkId () {
      return this.profileUser.network_id
    },
    isSameUser () {
      return this.profileUserNetworkId === this.$store.getters['network/getUserAccount'].network_id
    },
    countryCode () {
      return this.profileUser.nationality
    },
    countryInfo () {
      return country.countryCode.filter(e => e.iso2 === this.countryCode)[0]
    },
    birthYear () {
      return this.profileUser.birthYear
    },
    age () {
      return new Date().getFullYear() - this.birthYear
    },
    sex () {
      return this.profileUser.sex
    }
  }
}
