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
        return found;
    });
    return q.resolve(result);
}

function findById(params) {
    var result = users.find(function (user) {
        var found = false;
        for (var param in params) {
            if (user[param] && user[param] == params[param]) {
                found = true;
            }
        }
        return found;
    });

    return q.resolve(result);
}

function updateById(userId, user) {
    var index = users.findIndex(function (u) {
        return u.id == userId;
    });
    users[index] = user;
    users[index].id = userId;

    return q.resolve(users[index]);
}

function deleteId(userId) {
    var index = users.findIndex(function (u) {
        return u.id == userId;
    });

    var userCopy = users[index];
    users.splice(index,1);

    return q.resolve(userCopy);
}

module.exports  = {
    create: create,
    find: find,
    findById: findById,
    updateById: updateById,
    deleteId: deleteId
}