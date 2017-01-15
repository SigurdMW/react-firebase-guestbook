import base from '../base';

export function setLoginDataToLS(uid, user){
	localStorage.setItem("uid", uid);
	localStorage.setItem("user", JSON.stringify(user));
}

export function removeLoginDataFromLS(){
	localStorage.removeItem("uid");
	localStorage.removeItem("user");
}

export function logout (_this, router) {
	base.unauth();
	removeLoginDataFromLS();
	router.props.router.replace('/login');
}

export function authCheck(nextState, replace) {
	const uid = localStorage.getItem("uid");
	
	if(!uid){
		replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
	}
}