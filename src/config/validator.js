const { check } = require('express-validator');

/**
 * 
 * @param routeName - the Route Name to Validate
 */

module.exports = (routeName) => {
    switch (routeName) {
        case 'signUp':
            return [
                check('email').not().isEmpty().withMessage('The Email is Required'),
                check('email').isEmail().withMessage('Insert a Valid Email'),
                check('password').not().isEmpty().withMessage('Please Write a Password'),
                check('password').isLength({ min: 4 }).withMessage('Password Must be at least 4 characters long')
            ]
        case 'signIn':
            return [
                check('email').not().isEmpty().withMessage('The Email is Required'),
                check('email').isEmail().withMessage('Insert a Valid Email'),
                check('password').not().isEmpty().withMessage('Please. Write a Password'),
                check('password').isLength({ min: 4 }).withMessage('Invalid Password')
            ]
        case 'createProduct':
            return [
                check('name').not().isEmpty().withMessage("Product's name is required"),
                check('price').not().isEmpty().withMessage("Product's Price is required"),
                check('price').isFloat().withMessage('The price must be a Number'),
                check('description').not().isEmpty().withMessage("Products' Description is required")
            ]
    }
}