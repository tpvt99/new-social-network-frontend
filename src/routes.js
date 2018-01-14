import LoginPage from './components/loginpage/LoginPage.vue'
import Timeline from './components/timeline/Timeline.vue'
import Profile from './components/profile/Profile.vue'

// Network Page
import Network from './components/network_Page/Network.vue'
import NetworkA from './components/network_Page/NetworkA.vue'
import NetworkB from './components/network_Page/NetworkB.vue'
import NetworkC from './components/network_Page/NetworkC.vue'
import NetworkTarget from './components/network_Page/NetworkTarget.vue'
import NetworkTotal from './components/network_Page/NetworkTotal.vue'
import NetworkProfile from './components/network_Page/NetworkProfile.vue'
import NetworkProfileEdit from './components/network_Page/NetworkProfileEdit.vue'
import NetworkProfileInfo from './components/network_Page/NetworkProfileInfo.vue'
import NetworkChatroomTotal from './components/network_Page/NetworkChatroomTotal.vue'
import NetworkChatroomSearch from './components/network_Page/NetworkChatroomSearch.vue'
import NetworkChatroomTopic from './components/network_Page/NetworkChatroomTopic.vue'
import NetworkChatroom from './components/network_Page/NetworkChatroom.vue'

export const routes = [
  {
    path: '/',
    component: LoginPage,
    name: 'frontpage'
  },
  {
    path: '/timeline/',
    component: Timeline,
    name: 'timeline'
  },
  {
    path: '/profile/:profileUrl',
    component: Profile,
    name: 'profile',
    props: (route) => {
      return {
        uid: route.query.uid,
        profileUrl: route.params.profileUrl
      }
    }
  },
  {
    path: '/network',
    component: Network,
    name: 'network',
    children: [
      {
        path: '',
        components: {
          default: NetworkTotal
        }
      },
      {
        path: 'goal',
        components: {
          default: NetworkTarget
        }
      },
      // this is the main page of chatroom where showing all chat rooms
      {
        path: 'chatroom',
        component: NetworkChatroomTotal
      },
      // this is going to page where many chat rooms appear with each key search
      {
        path: 'chatroom/search',
        component: NetworkChatroomSearch
      },
      // this is going to each topic to find more chat rooms
      {
        path: 'chatroom/topic/:topicname',
        component: NetworkChatroomTopic
      },
      // this is chatroom to chat
      {
        path: 'chatroom/room/:roomId',
        component: NetworkChatroom
      }
    ]
  },
  {
    path: '/network/user/:networkId',
    component: NetworkProfile,
    name: 'networkprofile',
    children: [
      {
        path: '',
        component: NetworkProfileInfo,
        name: 'network-profile-info'
      },
      {
        path: 'edit',
        component: NetworkProfileEdit,
        name: 'network-profile-edit'
      }
    ]
  },
  {
    path: '/network/a',
    component: NetworkA,
    name: 'networka'
  },
  {
    path: '/network/b',
    component: NetworkB,
    name: 'networkb'
  },
  {
    path: '/network/c',
    component: NetworkC,
    name: 'networkc'
  },
  {
    path: '*',
    redirect: {name: 'frontpage'}
  }
]

export default {
  frontpage: {
    path: '',
    component: LoginPage,
    name: 'frontpage'
  },
  timeline: {
    path: '/timeline',
    component: Timeline,
    name: 'timeline'
  },
  network: {
    path: '/network',
    name: 'network'
  },
  networkA: {
    path: '/network/a',
    name: 'networka'
  },
  networkB: {
    path: '/network/b',
    name: 'networkb'
  },
  networkC: {
    path: '/network/c',
    name: 'networkc'
  }
}
