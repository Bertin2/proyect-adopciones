const{check, validationResult} = require('express-validator');

const generateAdoptionValidators = () =>[
    check('user_id').notEmpty().isLength({max:50}).withMessage("Invalid user id"),
    check('pet_id').notEmpty().isLength({max:3}).withMessage("Invalid pet id"),
    check('date').notEmpty().withMessage("Invalid date"),
]

const generateIdValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid id")
]
const updateAdoptionValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
    check('user_id').notEmpty().isNumeric().withMessage("Invalid user id"),
    check('pet_id').notEmpty().isNumeric().withMessage("Invalid pet id"),
    check('date').notEmpty().isDate().withMessage("Invalid date")

]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "succes" : false,
            "code" : 404,
            "message" : errors,
            "date" : []
        });
    }
    next();
}

module.exports = {
    add:[
        generateAdoptionValidators(),
        reporter
    ],
    id:[
        generateIdValidators(),
        reporter
    ],
    update:[
        updateAdoptionValidators(),
        reporter
    ]
};