<template>
  <div class="m_feed_div">
    <div>
      <div class="m_header">
        <div class="m_feed_user" :class="colorType">
          <div>
            <div class="m_name">
              <a :href="'/profile/' + userProfileUrl" style="color:inherit">{{name}}</a>
            </div>
            <div class="m_feed_ge _lm">
              <template v-if="minimizedFeedType === 'post'">
                <p>đã đăng bài viết</p>
              </template>
              <template v-else-if="minimizedFeedType === 'sale'">
                <p>đã đăng bài mua bán hàng</p>
              </template>
              <template v-else-if="minimizedFeedType === 'post-friend'">
                <p>
                  <span>đã gắn thẻ</span>
                  <template v-if="friendtags.length == 1">
                    <template v-for="friend in friendtags">
                      <a href="#" @click.prevent=""><span class="_lm m_fr_link">{{ friend.fullname }}</span></a>
                    </template>
                  </template>
                  <template v-else-if="friendtags.length > 1">
                    <a href="#" @click.prevent=""><span class="m_fr_link _lm">{{ friendtags.length }} người khác</span></a>
                  </template>
                </p>
              </template>
              <template v-else-if="minimizedFeedType === 'post-friend-image'">
                <p>
                  <template v-if="images.length > 1">
                    <span>đã thêm {{ images.length }} ảnh mới</span>
                  </template>
                  <template v-if="friendtags.length >= 1">
                    <span>cùng với</span>
                    <template v-if="friendtags.length == 1">
                      <template v-for="friend in friendtags">
                        <a href="#" @click.prevent=""><span class="_lm m_fr_link">{{ friend.fullname }}</span></a>
                      </template>
                    </template>
                    <template v-else-if="friendtags.length > 1">
                      <a href="#" @click.prevent=""><span class="m_fr_link _lm">{{ friendtags.length }} người khác</span></a>
                    </template>
                  </template>
                </p>
              </template>
              <template v-else-if="minimizedFeedType === 'post-image'">
                <template v-if="images.length === 1">
                  <p>đã đăng bài viết</p>
                </template>
                <template v-else-if="images.length > 1">
                  <p>đã thêm {{ images.length }} ảnh mới</p>
                </template>
              </template>
            </div>
          </div>
        </div>
        <div class="m_feed_time">
          {{ time }}
        </div>
      </div>
      <div class="m_feed_main">
        <div>
          <div class="m_f_text _ptext"> 
            <p>{{ text }}</p>
          </div>
          <template v-if="image">
            <div class="m_f_image">
              <img :src="image">
            </div>
          </template>
          <div class="m_f_image" v-if="images">
            <template v-for="image in images">
              <img :src="image.image_url">
            </template>
          </div>
        </div>
      </div>
      <template v-if="totalVotes >0">
        <template v-if="isSameUser">
          <div class="m_feed-vote-statics">
            <template v-if="defaultReaction">
              <template v-if="firstReaction.votes > 0">
                <div class="_like_icon">
                  <i class="fa fa-heart"></i>
                </div>
              </template>
              <template v-if="plusTags.length >0">
                <div class="_plus_icon">
                  <i>&#43;</i>
                </div>
              </template>
              <div class="_v_in">{{ totalVotes }}</div>
            </template>
            <template v-else>
              <div class="_plus_icon">
                <i>&#43;</i>
              </div>
              <div class="_v_in">{{ totalVotes }}</div>
            </template>
          </div>
        </template>
      </template>
      <div class="m_feed_vote">
        <div class="m_f_react">
          <template v-if="defaultReaction">
            <template v-for="react in reactions">
              <div class="bt-like" @click="reactVote(react)" :class="{btliked_b: checkReactionVote(react)}" :data-reaction="react.reactionId" :data-reaction-type="react.reactionType">
                  <i class="fa fa-heart-o"></i>
                  <span class="_lm">Thích</span>
              </div>
            </template>
          </template>
          <template v-else>
            <template v-for="react in reactions">
              <div class="bt-like" @click="reactVote(react)" :class="{btliked_b: checkReactionVote(react)}":data-reaction="react.reactionId" :data-reaction-type="react.reactionType">
                  <i>+</i>
                  <span class="_lm">{{ react.reactionName }}</span>
              </div>
            </template>
          </template>
        </div>
        <div class="m_f_comment">
          <div class="bt-like" title="Bình luận" @click="isComment = !isComment">
            <span class="fa fa-commenting-o"></span>
            <span class="_lm">Bình luận</span>
          </div>
        </div>
        <template v-for="(plustag, index) in plusTagsMostVote">
          <div class="m_f_plus">
            <div class="m_f_item" :class="{_pl_b_v: checkPlustagVote(plustag)}">
              <div @click.prevent="plustagVote(plustag)" :title="plustag.plustag_name"  style="color:inherit;cursor:pointer;">
                <div class="m_plus_name _elip_text">
                  <i>+</i>
                  <span>{{ plustag.plustag_name | splitplus }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div style="width:20px;" v-if="plusTags.length > 2">
          <div class="dropdown" @mouseenter="plusmoreShow" @mouseleave="plusmoreHide">
            <span class="_plus_more" style="cursor:pointer;">...</span>
            <div class="dropdown-menu" ref="dropdownMenu">
              <template v-for="plustag in plusTags">
                <div style="display:flex;justify-content:space-between;">
                  <a href="#" @click.prevent.stop="plustagVote(plustag)" :title="plustag.plustag_name">
                    <div class="plus_name _elip_text">
                      <span class="_rm">{{ plustag.votes }}</span>
                      <span>{{ plustag.plustag_name | splitplus }}</span>
                    </div>
                  </a>
                  <template v-if="isSameUser">
                    <a href="#" @click.prevent.stop="deletePlustag(plustag)" title="Loại bỏ plustag này" style="color:#666;font-weight:600;">&#10799;</a>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="feed-comments m_feed">
        <transition-group name="_list_co" tag="div">
          <div v-for="comment in minimizedComments" class="_fco_child" :key="comment">
            <div class="u-img">
              <template v-if="comment.user.profileimage !== ''">
                <img :src="comment.user.profileimage">
              </template>
              <template v-else>
                <img src="/static/image/user.jpeg">
              </template>
            </div>
            <div class="u-text">
              <span style="color:#3a539b;font-weight:600;" class="_rm">{{ comment.user.fullname }}</span>
              <span class="_ptext" v-html="commentPlustag(comment.comment)"></span>
            </div>
            <div class="u-time">
              <span>{{ commentTime(comment.time) }}</span>
            </div>
          </div>
        </transition-group>
      </div>
      <transition name="slide">
        <div class="feed-comment-post" v-if="isComment" style="padding-top:20px;">
          <img :src="profileimage">
          <textarea type="text" class="_fc_post" rows="1" placeholder="Bình luận của bạn..." v-model.trim="comment.text" @keydown.enter="commentSubmitMinimized" :data-x="feed_pk" @keyup="textKeyup" style="overflow-y:hidden"></textarea>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import querystring from 'query-string'
import { STATUS_COMMENT } from '../../api/api.js'
import { feedMixin } from './MixinFeed.js'
export default {
  data () {
    return {
      minimizedComments: []
    }
  },
  mixins: [feedMixin],
  computed: {
    minimizedFeedType () {
      if (this.stat.type === 'post') {
        if (this.friendtags && this.friendtags.length >= 1) {
          if (this.images && this.images.length > 1) {
            return 'post-friend-image'
          } else {
            return 'post-friend'
          }
        } else if (this.images && this.images.length >= 1) {
          return 'post-image'
        } else {
          return 'post'
        }
      } else if (this.stat.type === 'sale') {
        return 'sale'
      }
    },
    colorType () {
      var m = this.minimizedFeedType
      if (m === 'post') {
        return 'm_feed_grey'
      } else if (m === 'post-friend') {
        return 'm_feed_blue'
      } else if (m === 'post-friend-image') {
        return 'm_feed_green'
      } else if (m === 'post-image') {
        return 'm_feed_red'
      } else if (m === 'sale') {
        return 'm_feed_yellow'
      }
    }
  },
  methods: {
    commentSubmitMinimized (e) {
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
            response.data.comments.forEach(function (c) {
              that.minimizedComments.splice(0, 0, c)
            })
            that.$store.commit('newfeed/plustagComment', payload)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/newfeed/minimized_feed.scss';
</style>
