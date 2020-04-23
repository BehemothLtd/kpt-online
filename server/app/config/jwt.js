const expressJwt = require('express-jwt');


module.exports = jwt;

function jwt() {
    const secret = "SECRET";
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/api/users',
            '/api/users/auth'
        ]
    });
}

async function isRevoked(req, payload, done) {
    // const user = await userService.getById(payload.sub);

    // // revoke token if user no longer exists
    // if (!user) {
    //     return done(null, true);
    // }

    done();
};