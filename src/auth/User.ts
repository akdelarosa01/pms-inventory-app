import UserInterface from '../interfaces/UserInterface';

class User {

    id:number = 0;
    firstname: string = "";
    username: string = "";
    loggedIn: boolean = false;

    constructor() {
        this.init()
    }

    init() {
        this.id = Number(localStorage.getItem('userID'))!;
        this.firstname = localStorage.getItem('userFirstName')!;
        this.username = localStorage.getItem('userFirstName')!;
        this.loggedIn = Boolean(localStorage.getItem('userLoggedIn'));
    }

    /**
     *
     * @param data object
     * @param data.name string
     * @param data.email string
     * @param callback function
     */
    authenticated(data: UserInterface, callback: any) {
        localStorage.setItem('userID', String(data.id));
        localStorage.setItem('userFirstName', data.firstname);
        localStorage.setItem('userUserName', data.username);
        localStorage.setItem('userLoggedIn', "true");

        this.init()

        callback()
    }

    /**
     *
     * @return {boolean}
     */
    isLoggedIn() {
        return Boolean(this.loggedIn) === true
    }

    Logout() {
        localStorage.clear();
        this.init();
        location.href = "/login";
    }
}

export default new User()