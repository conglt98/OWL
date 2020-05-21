import React from 'react';
import { CURRENT } from './renderAuthorize'; // eslint-disable-next-line import/no-cycle

import PromiseRender from './PromiseRender';

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { Judgment of authority | Permission judgment } authority
 * @param { Your authority | Your permission description } currentAuthority
 * @param { Passed components | Passing components } target
 * @param { Failed components | no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // Retirement authority, return target;
  if (!authority) {
    return target;
  } 

  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }

    return Exception;
  } // string 处理

  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }

    return Exception;
  } // Promise 处理

  if (authority instanceof Promise) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  } // Function 处理

  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority); // 函数执行后返回值是 Promise

      if (bool instanceof Promise) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />;
      }

      if (bool) {
        return target;
      }

      return Exception;
    } catch (error) {
      throw error;
    }
  }

  throw new Error('unsupported parameters');
};

export { checkPermissions };

function check(authority, target, Exception) {
  return checkPermissions(authority, CURRENT, target, Exception);
}

export default check;
