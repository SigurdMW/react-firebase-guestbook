import base from '../base';

export function syncEntities (_this) {
	_this.ref = base.syncState(`entries`, {
      context: _this,
      state: 'entries'
    });
}

export function logout () {
	base.unauth();
}