module.exports = class UserDTO {
    id;
    login;
    isActivated;

    constructor(model) {
        this.login = model.login;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}