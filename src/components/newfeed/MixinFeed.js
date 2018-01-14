import { STATUS_COMMENT, STATUS_VOTE, STATUS_FETCH_COMMENT, PLUSTAG_VOTE, PLUSTAG_DELETE } from '../../api/api.js'
import querystring from 'query-string'

export const feedMixin = {
  data () {
    return {
      comment: {
        text: '',
        feed_pk: ''
      },
      isComment: false,
      showComments: false,
      keyMap: {13: false, 17: false}
    }
  },
  props: {
    stat: {
      type: Object
    }
  },
  filters: {
    plustag (value) {
      var newvalue = ''
      newvalue = value.replace('<', '&lt;')
      newvalue = newvalue.replace('>', '&gt;')
      newvalue = newvalue.replace('\'', '&#39;')
      newvalue = newvalue.replace('"', '&quote;')
      newvalue = newvalue.replace('&', '&amp;')
      return newvalue
    },
    splitplus (value) {
      return value.replace('+', '')
    }
  },
  methods: {
    setLocaleTime (dateObj) {
      dateObj.setHours(dateObj.getHours() + new Date().getTimezoneOffset() / 60 * (-1))
    },
    dateDiff (date1, date2) {
      var diff = Math.abs(Date.parse(date1) - Date.parse(date2))
      return isNaN(diff) ? NaN : {
        s: Math.floor(diff / 1000 % 60),
        m: Math.floor(diff / 60000 % 60),
        h: Math.floor(diff / 3600000 % 24),
        d: Math.floor(diff / 86400000),
        y: Math.floor(diff / (86400000 * 365))
      }
    },
    commentPlustag (value) {
      return this.plustag(value)
    },
    replacer (match) {
      var m = '<span color="red">' + match + '</span>'
      return m
    },
    plustag (value) {
      var newvalue = ''
      var re = /^\+[a-zA-Z_\u0080-\u00ff\u0102-\u01b0\u1ea0-\u1ef9]+| \+[a-zA-Z_\u0080-\u00ff\u0102-\u01b0\u1ea0-\u1ef9]+/g
      for (var x = 0; x < value.length; x++) {
        var e = value.charAt(x)
        if (e === '<') newvalue += '&lt;'
        else if (e === '>') newvalue += '&gt;'
        else if (e === '\'') newvalue += '&#39;'
        else if (e === '"') newvalue += '&quot'
        else if (e === '&') newvalue += '&amp;'
        else newvalue += e
      }
      var newValue = newvalue.replace(re, '<span style="color:#f22613">$&</span>')
      return newValue
    },
    commentSubmit (e) {
      e.preventDefault()
      var that = this
      if (this.comment.text === '') {
      } else {
        this.$http({
          method: 'POST',
          url: STATUS_COMMENT,
          data: querystring.stringify(this.comment),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          xsrfCookieName: 'csrftoken',
          xsrfHeaderName: 'X-CSRFToken',
          withCredentials: true
        }).then(function (response) {
          if (response.data.status_type === 'ok') {
            that.comment.text = ''
            var payload = {
              comments: response.data.comments,
              plustags: response.data.plustags,
              feedPk: that.comment.feed_pk
            }
            that.$store.commit('newfeed/prependComment', payload)
            that.$store.commit('newfeed/plustagComment', payload)
          }
        })
      }
    },
    commentNewLine (e) {
      if (e.keyCode === 13) {
        e.preventDefault()
      } else if (e.keyCode in this.keyMap) {
        this.keyMap[e.keyCode] = true
        if (this.keyMap[13] && this.keyMap[17]) {
          this.comment.text += '\n'
        }
      }
    },
    commentTime (t) {
      var client = new Date(t)
      this.setLocaleTime(client)
      var now = new Date()
      this.setLocaleTime(now)
      var diffTime = this.dateDiff(now, client)
      if (diffTime.y > 1) {
        return diffTime.y + 'y'
      } else if (diffTime.d > 1) {
        return diffTime.d + 'd'
      } else if (diffTime.h > 1) {
        return diffTime.h + 'h'
      } else if (diffTime.m > 1) {
        return diffTime.m + 'p'
      } else {
        return 'Vừa xong'
      }
    },
    reactVote (e) {
      var that = this
      this.$http({
        method: 'POST',
        baseURL: STATUS_VOTE,
        data: querystring.stringify({
          'reaction': e.reactionId,
          'type': e.reactionType
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        withCredentials: true
      }).then(function (response) {
        if (response.data.status_type === 'ok') {
          var payload = {
            statusId: e.statusId,
            reactionType: e.reactionType,
            data: response.data
          }
          that.$store.commit('newfeed/adjustUserVote', payload)
        }
      })
    },
    fetchComment () {
      var that = this
      this.$http({
        method: 'GET',
        baseURL: STATUS_FETCH_COMMENT,
        params: {
          feedPk: this.feed_pk,
          totalFetch: 10,
          currentIndex: this.comments.length
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.data.status_type === 'ok') {
          var payload = {
            comments: response.data.comments,
            feedPk: that.comment.feed_pk
          }
          that.$store.commit('newfeed/appendComment', payload)
        }
      })
    },
    textKeyup (e) {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollHeight + 'px'
    },
    plustagVote (obj) {
      var that = this
      this.$http({
        method: 'POST',
        baseURL: PLUSTAG_VOTE,
        data: querystring.stringify({'plustagPk': obj.id}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        withCredentials: true
      }).then(function (response) {
        if (response.data.status_code === 'ok') {
          var payload = {
            'feedPk': that.feed_pk,
            'plustagPk': obj.id,
            'payload': response.data.data
          }
          that.$store.commit('newfeed/adjustPlustagUserVote', payload)
        }
      })
    },
    plusmoreShow () {
      this.$refs.dropdownMenu.style.display = 'block'
    },
    plusmoreHide () {
      this.$refs.dropdownMenu.style.display = 'none'
    },
    deletePlustag (obj) {
      var that = this
      this.$http({
        method: 'POST',
        baseURL: PLUSTAG_DELETE,
        data: querystring.stringify({'plustagPk': obj.id}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        withCredentials: true
      }).then(function (response) {
        if (response.data.status_code === 'ok') {
          var payload = {
            'feedPk': that.feed_pk,
            'plustagPk': obj.id
          }
          that.$store.commit('newfeed/plustagDelete', payload)
        }
      })
    },
    checkPlustagVote (plustag) {
      if (this.isAnonymous) return false
      else {
        let userId = this.$store.getters['user/getId']
        if (userId === plustag.user_send_plus.id) {
          return true
        } else {
          for (let user of plustag.uservotes) {
            if (user.user_vote.id === userId) {
              return true
            }
          }
        }
        return false
      }
    },
    checkReactionVote (reaction) {
      if (this.isAnonymous) return false
      else {
        let userId = this.$store.getters['user/getId']
        for (let user of reaction.userVotes) {
          if (user.user.id === userId) {
            return true
          }
        }
        return false
      }
    }
  },
  computed: {
    tabName () {
      return this.$route.query.tab
    },
    feedType () {
      return this.stat.type
    },
    // this is computed property to show some customized sale text to user. If tabName !== 'sale' && feedType === 'sale' then it is true
    showSale () {
      return this.tabName !== 'sale' && this.feedType === 'sale'
    },
    name () {
      return this.stat.user.fullname
    },
    profileimage () {
      return this.stat.user.profileimage !== '' ? this.stat.user.profileimage : '/static/image/user.jpeg'
    },
    userProfileUrl () {
      return this.stat.user.profileUrl
    },
    text () {
      return this.stat.post.text
    },
    saleItem () {
      return this.stat.post.saleItem
    },
    image () {
      if (this.stat.post.has_link_image === false) {
        return this.stat.post.old_image
      }
    },
    images () {
      if (this.stat.post.has_link_image === true) {
        return this.stat.post.images
      } else return []
    },
    feed_pk () {
      this.comment.feed_pk = this.stat.id
      return this.stat.id
    },
    comments () {
      return this.stat.comments
    },
    totalComments () {
      return this.stat.totalComments
    },
    votes () {
      return this.stat.votes
    },
    been_vote () {
      if (this.stat.userVote) {
        return this.stat.userVote.been_vote
      } else return false
    },
    isAnonymous () {
      return this.$store.getters['user/isAnonymous']
    },
    isSameUser () {
      if (!this.isAnonymous && this.stat.user.id === this.$store.getters['user/getId']) return true
      else return false
    },
    friendtags () {
      console.log(this.stat.post.friends)
      return this.stat.post.friends !== undefined ? this.stat.post.friends : []
    },
    firstFriend () { // used to show the 1st person when redering multiples friends
      return this.stat.post.friends[0]
    },
    plusTags () {
      this.$store.commit('newfeed/sortPlusTags', {feedPk: this.stat.id})
      return this.stat.plustags
    },
    plusTagsMostVote () {
      return this.stat.plustags.slice(0, 2)
    },
    reactions () {
      return this.stat.reactions
    },
    firstReaction () {
      return this.stat.reactions[0]
    },
    totalVotes () {
      var total = this.plusTags.reduce(function (acc, obj) {
        return acc + parseInt(obj.votes)
      }, 0)
      total = this.reactions.reduce(function (acc, obj) {
        return acc + parseInt(obj.votes)
      }, total)
      return total
    },
    defaultCustomReaction () {
      return this.stat.df_r && this.stat.ct_r
    },
    defaultReaction () {
      return this.stat.df_r
    },
    customReaction () {
      return this.stat.ct_r
    },
    time (t) {
      var client = new Date(this.stat.time)
      this.setLocaleTime(client)
      var now = new Date()
      this.setLocaleTime(now)
      var diffTime = this.dateDiff(now, client)
      if (diffTime.y > 1) {
        return diffTime.y + 'y'
      } else if (diffTime.d > 1) {
        return diffTime.d + 'd'
      } else if (diffTime.h > 1) {
        return diffTime.h + 'h'
      } else if (diffTime.m > 1) {
        return diffTime.m + 'p'
      } else {
        return 'Vừa xong'
      }
    }
  }
}
