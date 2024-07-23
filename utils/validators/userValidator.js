const { check} = require("express-validator")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
exports.createUserValidator = [
    check("password")
        .notEmpty()
        .withMessage("Password required")
        .isLength({ min: 6 }),
    check("phone")
        .notEmpty()
        .withMessage("phone required")
        .isMobilePhone(["ar-EG"])
        .withMessage("Invalid phone number only accepted Egy  Phone numbers"),
    validatorMiddleware,
]

exports.getUserValidator = [check("id").isMongoId().withMessage("Invalid user id format"), validatorMiddleware]

exports.updateUserValidator = [
    check("id").isMongoId().withMessage("Invalid teacher  id format"),
    check("phone")
       .optional()
        .withMessage("phone required")
        .isMobilePhone(["ar-EG"])
        .withMessage("Invalid phone number only accepted Egy phone numbers"),

    validatorMiddleware,
]



exports.deleteUserValidator = [check("id").isMongoId().withMessage("Invalid user id format"), validatorMiddleware]


exports.signupValidator = [
  check("password")
        .notEmpty()
        .withMessage("Password required")
        .isLength({ min: 6 }),
    check("phone")
        .notEmpty()
        .withMessage("phone required")
        .isMobilePhone(["ar-EG"])
        .withMessage("Invalid phone number only accepted Egy  Phone numbers"),
    validatorMiddleware,
];

exports.loginValidator = [
  check('phone')
    .notEmpty()
    .withMessage('phone required')
    .isEmail()
    .withMessage('Invalid phone address'),

  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  validatorMiddleware,
];
