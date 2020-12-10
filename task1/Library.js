import { throwErrorIsClassIsNotSameInstance } from './validation'
import { isElementOfClassExistInArray } from './utils'
import User from './User'
import Book from './Book'
import Booking from './Booking'


class Library {
    constructor(name) {
        this.name = name
        this.books = []
        this.rentedBooks = []
        this.activeBookings = []
        this.users = []
    }

    addUserToLibrary(user) {
        throwErrorIsClassIsNotSameInstance(user, User)
        if (isElementOfClassExistInArray(user, this.users)) {
            throw new Error(`${user} is already in library`)
        }
        this.users.push(user);
        return `User was added to list`
    }

    addBookToLibrary(book) {
        throwErrorIsClassIsNotSameInstance(book, Book)
        if (isElementOfClassExistInArray(book, this.books)) {
            throw new Error(`${book} is already in library`)
        }
        this.books.push(book);
        return `Book was added to list`
    }

    deleteBookFromLibrary(book) {
        throwErrorIsClassIsNotSameInstance(book, Book)

        if (isElementOfClassExistInArray(book, this.rentedBooks)) {
            throw new Error(`${book} is rented so you can not delate it`)
        }

        const foundBook = this.books.findIndex(el => el.id === book.id)
        if (foundBook === -1) {
            throw new Error(`${book} does not exist, so you can not delete it`)
        }

        this.books.splice(foundBook, 1)
        return 'Book was removed'
    }

    rentBookForUser(user, book) {
        throwErrorIsClassIsNotSameInstance(user, User)
        throwErrorIsClassIsNotSameInstance(book, Book)

        if (isElementOfClassExistInArray(book, this.rentedBooks)) {
            throw new Error(`HI ${book} is already been rented`)
        }

        const foundBook = this.books.findIndex(el => el.id === book.id)
        if (foundBook === -1) {
            throw new Error(`${book} does not exist, so you can not rent it`)
        }

        this.books.splice(foundBook, 1)

        const booking = new Booking(user)

        booking.addBook(book)

        this.activeBookings.push(booking)
        this.rentedBooks.push(book)
    }

    returnBookForUser(user, book) {
        throwErrorIsClassIsNotSameInstance(book, Book)
        throwErrorIsClassIsNotSameInstance(user, User)

        const foundBookingIndex = this.activeBookings.findIndex(el => el.user === user)

        if (foundBookingIndex === -1) {
            throw new Error("Booking does not exist")
        }

        this.activeBookings[foundBookingIndex].removeBook(book);

        this.activeBookings.splice(foundBookingIndex, 1)

        const foundBook = this.rentedBooks.findIndex(el => el.id === book.id)

        this.rentedBooks.splice(foundBook, 1)

        this.books.push(book)
    }
}

export default Library
