// @ts-nocheck
import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import { getUserInfo, login, loginByEmail, loginByMobile, logout } from '/@/api/admin/login';

export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
			sex: '',
			user: {},
			username:''
		},
	}),

	actions: {
		/**
		 * 登录方法
		 * @function login
		 * @async
		 * @param {Object} data - 登录数据
		 * @returns {Promise<Object>}
		 */
		async login(data: any) {
			data.grant_type = 'password';
			data.scope = 'server';

			return new Promise((resolve, reject) => {
				login(data)
					.then((res) => {
						// 存储token 信息
						Session.set('token', res.access_token);
						Session.set('refresh_token', res.refresh_token);
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		/**
		 * 手机登录方法
		 * @function loginByMobile
		 * @async
		 * @param {Object} data - 登录数据
		 * @returns {Promise<Object>}
		 */
		async loginByMobile(data) {
			return new Promise((resolve, reject) => {
				loginByMobile(data)
					.then((res) => {
						// 存储token 信息
						Session.set('token', res.access_token);
						Session.set('refresh_token', res.refresh_token);
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		//邮箱登入
		async loginByEmail(data) {
			return new Promise((resolve, reject) => {
				loginByEmail(data)
					.then((res) => {
						// 存储token 信息
						Session.set('token', res.access_token);
						Session.set('refresh_token', res.refresh_token);
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		/**
		 * 获取用户信息方法
		 * @function setUserInfos
		 * @async
		 */
		async setUserInfos() {
			await getUserInfo().then((res) => {
				const userInfo: any = {
					user: res.data.sysUser,
					username: res.data.sysUser.username,
					time: new Date().getTime(),
					roles: res.data.roles,
					authBtnList: res.data.permissions,
				};
				this.userInfos = userInfo;
			});
		},
		//退出登入
		async logout() {
			await logout();
			this.userInfos={};
			Session.clear();
		},
	},
	persist: {
		enabled: true, // 开启数据缓存
		strategies: [
			{
				// @ts-ignore
				key: `${__NEXT_NAME__}:userInfo`,
				storage: sessionStorage, // 默认是sessionStorage
			},
		],
	},
});
