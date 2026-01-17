import request from '/@/utils/request';
import {Session} from '/@/utils/storage';
import other from '/@/utils/other';

/**
 * https://www.ietf.org/rfc/rfc6749.txt
 * OAuth 协议 4.3.1 要求格式为 form 而不是 JSON 注意！
 */
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded';

/**
 * 登录
 * @param data
 */
export const login = (data: any) => {
    const basicAuth = 'Basic ' + window.btoa(import.meta.env.VITE_OAUTH2_PASSWORD_CLIENT);
    Session.set('basicAuth', basicAuth);
    let encPassword = data.password;
    // 密码加密
    if (import.meta.env.VITE_PWD_ENC_KEY) {
        encPassword = other.encryption(data.password, import.meta.env.VITE_PWD_ENC_KEY);
    }
    return request({
        url: '/auth/oauth2/token',
        method: 'post',
        data: { ...data, password: encPassword },
        headers: {
            skipToken: true,
            Authorization: basicAuth,
            'Content-Type': FORM_CONTENT_TYPE,
            skipTenant: true,
        },
    });
};

export const loginByMobile = (data: any) => {
    const grant_type = 'mobile';
    const scope = 'server';
    const basicAuth = 'Basic ' + window.btoa(import.meta.env.VITE_OAUTH2_MOBILE_CLIENT);
    Session.set('basicAuth', basicAuth);

    return request({
        url: '/auth/oauth2/token',
        headers: {
            skipToken: true,
            Authorization: basicAuth,
            'Content-Type': FORM_CONTENT_TYPE,
            skipTenant: true,
        },
        method: 'post',
        data: { ...data, grant_type, scope },
    });
};

export const loginBySocial = (state: string, code: string) => {
    const grant_type = 'mobile';
    const scope = 'server';
    const basicAuth = 'Basic ' + window.btoa(import.meta.env.VITE_OAUTH2_SOCIAL_CLIENT);
    Session.set('basicAuth', basicAuth);

    return request({
        url: '/auth/oauth2/token',
        headers: {
            skipToken: true,
            Authorization: basicAuth,
            'Content-Type': FORM_CONTENT_TYPE,
        },
        method: 'post',
        data: { mobile: state + '@' + code, code: code, grant_type, scope }
    })
};

export const loginByEmail = (data: any) => {
    const grant_type = 'email';
    const scope = 'server';
    const basicAuth = 'Basic ' + window.btoa(import.meta.env.VITE_OAUTH2_MOBILE_CLIENT);
    Session.set('basicAuth', basicAuth);

    return request({
        url: '/auth/oauth2/token',
        headers: {
            skipToken: true,
            Authorization: basicAuth,
            'Content-Type': FORM_CONTENT_TYPE,
            skipTenant: true,
        },
        method: 'post',
        data: { ...data, grant_type, scope, },
    });
};

//发送手机验证码
export const sendMobileCode = (mobile: any) => {
    return request({
        url: '/admin/login/' + mobile,
        method: 'get',
        headers: {
            skipToken: true,
        },
    });
};

//发送邮件验证码
export const sendEmailCode = (email: any) => {
    return request({
        url: '/admin/login/emailCode/' + email,
        method: 'get',
        headers: {
            skipToken: true,
        },
    });
};

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request({
        url: '/admin/user/info',
        method: 'get',
    });
};

/**
 * 退出
 */
export const logout = () => {
    return request({
        url: '/auth/token/logout',
        method: 'delete',
    });
};
