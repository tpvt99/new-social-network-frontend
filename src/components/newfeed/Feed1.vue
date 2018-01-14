<template>
  <div class="feed-div">
    <div class="feed-user">
      <div class="feed-u-img">
        <img :src="profileimage">
      </div>
      <div class="feed-u-info">
        <div class="feed-u-name">
          <p>
            <span class="_a">
              <a :href="'/profile/' + userProfileUrl" style="color:inherit">{{name}}</a>
            </span>
            <template v-if="friendtags.length > 0">
              <span class="_lm">gắn thẻ</span>
              <template v-if="friendtags.length == 1">
                <template v-for="friend in friendtags">
                  <a href="#" @click.prevent=""><span class="_lm _fr_link">{{friend.fullname}}</span></a>
                </template>
              </template>
              <template v-if="friendtags.length == 2">
                <template v-for="(friend, index) in friendtags">
                  <template v-if="index == 0">
                    <a href="#" @click.prevent=""><span class="_lm _fr_link">{{friend.fullname}}</span></a>
                  </template>
                  <template v-if="index == 1">
                    <span class="_lm">và</span>
                    <a href="#" @click.prevent=""><span class="_lm _fr_link">{{friend.fullname}}</span></a>
                  </template>
                </template>
              </template>
              <template v-if="friendtags.length > 2">
                <a href="#" @click.prevent=""><span class="_lm _fr_link">{{firstFriend.fullname}}</span></a>
                <span class="_lm">và</span>
                <div class="tooltip _fr_tooltip">
                  <a href="#" class="_lm" @click.prevent="">
                    <span>{{ friendtags.length -1}}</span><span class="_lm">người khác</span>
                  </a>
                  <span class="tooltiptext tooltip-top">
                    <template v-for="(fr, index) in friendtags">
                      <p v-if="index !== 0">
                        {{ fr.fullname }}
                      </p>
                    </template>
                  </span>
                </div>
              </template>
            </template>
          </p>
        </div>
        <div class="feed-u-time">
          <p>{{ time }}</p>
        </div>
      </div>
    </div>
    <div class="feed-main">
      <div class="feed-m-text _ptext">
        <p>{{ text }}</p>
      </div>
      <div class="feed-m-img">
        <img :src="image" v-if="image">
        <div v-if="images !== undefined">
          <div v-for="image in images">
            <img :src="image.image_url">
          </div>
        </div>
      </div>
    </div>
    <template v-if="totalVotes >0">
      <div class="feed-vote-statics">
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
    <div class="feed-vote">
      <div class="_f_react">
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
      <template v-for="(plustag, index) in plusTagsMostVote">
        <div class="_f_plus">
          <div class="_f_item" :class="{_pl_b_v: checkPlustagVote(plustag)}">
            <a href="#" @click.prevent="plustagVote(plustag)" :title="plustag.plustag_name"  style="color:inherit">
              <div class="plus_name _elip_text">
                <span>{{ plustag.plustag_name | splitplus }}</span>
              </div>
              <div>
                <span class="_lm">{{ plustag.votes }}</span><i>+</i>
              </div>
            </a>
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
    <div class="feed-comments">
      <transition-group name="_list_co" tag="div">
        <div v-for="comment in comments" class="_fco_child" :key="comment">
          <div class="u-img">
            <template v-if="comment.user.profileimage !== ''">
              <img :src="comment.user.profileimage">
            </template>
            <template v-else>
              <img src="/static/image/user.jpeg">
            </template>
          </div>
          <div class="u-text">
            <span style="color:#3a599b;font-weight:600;margin-right:5px;">{{ comment.user.fullname }}</span>
            <span class="_ptext" v-html="commentPlustag(comment.comment)"></span>
          </div>
          <div class="u-time">
            <span>{{ commentTime(comment.time) }}</span>
          </div>
        </div>
      </transition-group>
      <div v-if="comments.length < totalComments" class="_fco_more">
        <p>
          <a href="#" @click.prevent="fetchComment">
            <span>Hiển thị thêm các bình luận</span>
            <span class="_lm">{{ comments.length }}</span>
            <span>&#8725;</span>
            <span>{{ totalComments }}</span>
          </a>
        </p>
      </div>
    </div>
    <transition name="slide">
      <div class="feed-comment-post" v-if="isComment">
        <img :src="profileimage">
        <textarea type="text" class="_fc_post" rows="1" placeholder="Bình luận của bạn..." v-model.trim="comment.text" @keydown.enter="commentSubmit" :data-x="feed_pk" @keyup="textKeyup" style="overflow-y:hidden"></textarea>
      </div>
    </transition>
    <div class="feed-options">
      <template v-if="defaultReaction">
        <div title="Thích" @click="reactVote(react)">
          <div class="_fo_com":class="{btliked : been_vote}">
            <i class="fa fa-heart-o"></i>
          </div>
        </div>
      </template>
      <template v-else>
        <div title="" @click="reactVote(react)">
          <div class="_fo_com":class="{btliked : been_vote}">
            <i>+</i>
          </div>
        </div>
      </template>
      <div title="Bình luận" @click="isComment = !isComment">
        <div class="_fo_com" >
          <i class="fa fa-comment-o"></i>
        </div>
      </div>
      <!--
      <div title="Chia sẻ" v-if="!isSameUser">
        <div class="_fo_share">
          <i class="fa fa-share-square-o"></i>
        </div>
      </div>
      -->
    </div>
  </div>
</template>
<script>
import { feedMixin } from './MixinFeed.js'
export default {
  mixins: [feedMixin],
  computed: {
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/newfeed/newfeed.scss';
</style>
