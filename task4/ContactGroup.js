import { v4 as uuid } from 'uuid'
import { validateString, validateClass } from './validation'
import { isElementExistInArray, removeFromArray } from './utils'
import Contact from './Contact'


class ContactGroup {
    constructor(groupName) {
        validateString(groupName)
        this.id = uuid()
        this.groupName = groupName
        this.contacts = []
    }


    addContact(contact) {
        validateClass(contact, Contact)
        if (isElementExistInArray(contact, this.contacts)) {
            throw new Error('Contact exist so you can not add it')
        }
        this.contacts.push(contact)
        return "contact added"
    }

    removeContact(contact) {
        validateClass(contact, Contact)
        if (!isElementExistInArray(contact, this.contacts)) {
            throw new Error('Contact does not exist, so you can not delete it')
        }

        removeFromArray(this.contacts, contact)
        return 'contact was removed'
    }

    updateGroupName(name) {
        validateString(name);
        this.groupName = name;
    }

    contains(phrase) {
        validateString(phrase)
        const foundPhrasesArray = this.contacts.filter(contact => contact.contains(phrase))
        return foundPhrasesArray.length > 0
    }
}

export default ContactGroup