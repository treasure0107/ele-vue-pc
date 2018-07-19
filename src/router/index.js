import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/Index';
import login from '@/views/Login/Login';
import register from '@/views/Login/Register';
import TelFind from '@/views/Login/TelFind';
import EmailFind from '@/views/Login/EmailFind';
import Account from '@/views/UserCenter/Index';
import AccountList from '@/views/UserCenter/AccountSet/AccountList';
import CollectSet from '@/views/UserCenter/CollectSet/CollectSet';
import OrderList from '@/views/UserCenter/Order/OrderList';
import OrderDetails from '@/views/UserCenter/Order/OrderDetails';
import AppeaLine from '@/views/UserCenter/AppeaLine/AppeaLine';
import RecordList from '@/views/UserCenter/Record/RecordList';
import RecordDetial from '@/views/UserCenter/Record/RecordDetial';
import InviteFriends from '@/views/UserCenter/InviteFriends/InviteFriends';
import InviteList from '@/views/UserCenter/InviteFriends/InviteList';
import AccountSet from '@/views/UserCenter/AccountSet/AccountSet';
import BankSet from '@/views/UserCenter/CollectSet/BankSet';
import UsdtSet from '@/views/UserCenter/CollectSet/UsdtSet';
import AlipaySet from '@/views/UserCenter/CollectSet/AlipaySet';
import WeixinSet from '@/views/UserCenter/CollectSet/WeixinSet';
import TicketRecord from '@/views/UserCenter/TurnTicket/TicketRecord';//交易记录>>>转票记录列表
import TurnTicket from '@/views/UserCenter/TurnTicket/TurnTicket';// 在线转票
import C2C from '@/views/C2C/Index';// c2c
import lineUp from '@/views/C2C/lineUp';// c2c 参与
import HelpIndex from '@/views/Help/Index';
import HelpList from '@/views/Help/HelpList';
import NewsList from '@/views/InfoShow/NewsList';//新闻列表
import AboutUs from '@/views/InfoShow/AboutUs';//新闻列表
import NewsDetails from '@/views/InfoShow/NewsDetails';//新闻详情
import NoticeList from '@/views/InfoShow/NoticeList';//公告
import NoticeDetails from '@/views/InfoShow/NoticeDetails';//公告详情
import ContactUs from '@/views/InfoShow/ContactUs';//联系我们

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/NewsList',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/TelFind',
      name: 'TelFind',
      component: TelFind
    },
    {
      path: '/EmailFind',
      name: 'EmailFind',
      component: EmailFind
    },
    {
      path: '/Account',
      component: Account,
      children: [
        {
          path: "/",
          name: "AccountList",
          component: AccountList,
        },
        {
          path: '/CollectSet',
          name: 'CollectSet',
          component: CollectSet
        },
        {
          path: '/OrderList',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: '/AppeaLine',
          name: 'AppeaLine',
          component: AppeaLine
        },
        {
          path: '/RecordList',
          name: 'RecordList',
          component: RecordList,
        },
        {
          path: '/RecordDetial',
          name: 'RecordDetial',
          component: RecordDetial
        },
        {
          path: '/RecordDetial/:id/:type',
          name: 'RecordDetialIdType',
          component: RecordDetial
        },
        {
          path: '/InviteFriends',
          name: 'InviteFriends',
          component: InviteFriends
        },
        {
          path: '/InviteList',
          name: 'InviteList',
          component: InviteList
        },
        {
          path: '/AccountSet',
          name: 'AccountSet',
          component: AccountSet
        },
        {
          path: '/AccountSet/:type',
          name: 'AccountSetType',
          component: AccountSet
        },
        {
          path: '/TicketRecord',
          name: 'TicketRecord',
          component: TicketRecord
        }, {
          path: '/TurnTicket',
          name: 'TurnTicket',
          component: TurnTicket
        },
        {
          path: '/BankSet',
          name: 'BankSet',
          component: BankSet
        },
        {
          path: '/UsdtSet',
          name: 'UsdtSet',
          component: UsdtSet
        },
        {
          path: '/WeixinSet',
          name: 'WeixinSet',
          component: WeixinSet
        },
        {
          path: '/AlipaySet',
          name: 'AlipaySet',
          component: AlipaySet
        }
      ]
    },
    {
      path: '/OrderDetails',
      name: 'OrderDetails',
      component: OrderDetails
    },
    {
      path: '/C2C',
      name: 'C2C',
      component: C2C
    },
    {
      path: '/lineUp',
      name: 'lineUp',
      component: lineUp
    },
    {
      path: '/HelpIndex',
      name: 'HelpIndex',
      component: HelpIndex
    },
    {
      path: '/HelpList',
      name: 'HelpList',
      component: HelpList
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/NewsDetails',
      name: 'NewsDetails',
      component: NewsDetails
    },
    {
      path: '/NoticeList',
      name: 'NoticeList',
      component: NoticeList
    },
    {
      path: '/NoticeDetails',
      name: 'NoticeDetails',
      component: NoticeDetails
    },
    {
      path: '/ContactUs',
      name: 'ContactUs',
      component: ContactUs
    },
		{
			path: '*',
			name: '404',
			component: index
		}
  ],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})
