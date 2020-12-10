import { v4 as uuid } from 'uuid'
import moment from 'moment';
import validateString from './validation'
import { validatePassword, validateGender, validateBirthday, validateEmail, validatePermission } from './utils'



class User {
    constructor(name, surname, birthday, password, gender, email, accessLevel) {
        validateString(name)
        validateString(surname)
        validateBirthday(birthday)
        validatePassword(password)
        validateGender(gender)
        validateEmail(email)
        validateString(accessLevel)
        validatePermission(accessLevel)

        Object.assign(this, {
            id: uuid(),
            name,
            surname,
            birthday: moment(birthday, "DD/MM/YYYY").format('l'),
            password,
            gender,
            email,
            accessLevel: accessLevel.toUpperCase(),
        })

    }
}

export default User
