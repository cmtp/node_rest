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

function find(params) {
    if(!params) {
        return q.resolve(users);
    }

    var result = users.filter(function (user) {
        var found = false;
        for( var param in params) {
            if(user[param] && user[param] == params[param]) {
                found = true;
            }
        }
        return found
    });
    return q.resolve(result);
}

module.exports  = {
    create: create,
    find: find
}