const{check, validationResult} = require('express-validator');

const generatePetValidators = () =>[
    check('alias').notEmpty().isLength({max:50}).withMessage("Invalid alias"),
    check('type').notEmpty().isLength({max:3}).withMessage("Invalid type"),
    check('color').notEmpty().isLength({max:10}).withMessage("Invalid color"),
    check('notes').notEmpty().isLength({max:150}).withMessage("Invalid notes"),
]

const generateIdValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid id")
]
const updatePetValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
    check('alias').notEmpty().isLength({max:50}).withMessage("Invalid alias"),
    check('type').notEmpty().isLength({max:3}).withMessage("Invalid type"),
    check('color').notEmpty().isLength({max:10}).withMessage("Invalid color"),
    check('notes').notEmpty().isLength({max:150}).withMessage("Invalid notes"),
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
        generatePetValidators(),
        reporter
    ],
    id:[
        generateIdValidators(),
        reporter
    ],
    update:[
        updatePetValidators(),
        reporter
    ]
};