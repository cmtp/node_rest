var q = require('q');
var id = 1;
var users = [];
/**
 * USER
 * name: string,
 * email:string,
 * birthDate: string
 */

function create(user) {
    user.id = id;
    users.push(user);
    id++;
    return q.resolve(user);
}

module.exports  = {
    create: create
}