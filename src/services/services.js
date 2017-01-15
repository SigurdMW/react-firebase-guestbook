import base from '../base';
import { logout, authCheck } from './auth';

export function syncEntities (_this) {
	_this.ref = base.syncState(`entries`, {
      context: _this,
      state: 'entries'
    });
}