import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { Book } from './book';
import { BookList } from './book-list/book-list';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 1,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner

    it('shouldnt add a book with no title', () => {
    const book: Book = {
      id: 1,
      title: '',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(false);
  });

  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner


    it('shouldnt add a book with negative copie', () => {
    const book: Book = {
      id: 1,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: -1,
    };

    const book2: Book = {
      id: 1,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 0,
    };

    const result = service.addBook(book);
    const result2 = service.addBook(book2);

    expect(result2).toBe(false);
    expect(result).toBe(false);
  });

  // Test : Emprunter un livre doit décrémenter availableCopies

  it('should decrement availableCopies of a book you borrow', () => {

    const result = service.borrowBook(1);

    expect(service.getBookById(1)?.availableCopies).toBe(4);
    expect(result).toBe(true);
  });

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0

  it('shouldnt decrement availableCopies of a book if availableCopies = 0', () => {

    const result = service.borrowBook(3);

    expect(result).toBe(false);
  });

  // Test : Ne pas emprunter un livre qui n'existe pas

  it('shouldnt borrow book if he doesnt exist', () => {

    const result = service.borrowBook(4);

    expect(result).toBe(false);
  });

  // Test : Retourner un livre doit incrémenter availableCopies

   it('should increment availableCopies of a book you return', () => {

    const result = service.returnBook(3);

    expect(service.getBookById(3)?.availableCopies).toBe(1);
    
    expect(result).toBe(true);
  });

  // Test : Ne pas retourner un livre qui n'existe pas

   it('shouldnt return book if he doesnt exist', () => {

    const result = service.returnBook(4);

    expect(result).toBe(false);
  });

  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  
   it('shouldnt return book if he doesnt exist', () => {

    const result = service.returnBook(1);

    expect(result).toBe(false);
  });

  // Ajoute des tests de ton choix pour les autres méthodes

   
   it('should delete book if exist', () => {

    const result = service.deleteBook(1);

    expect(result).toBe(true);
  });

  it('should update book if exist', () => {

    const book: Book = {
    id: 1,
    title: 'Test Book',
    author: 'Author',
    availableCopies: 1,
    totalCopies: 1,
    };

    const result = service.updateBook(book);

    expect(result).toBe(true);
  });

  it('shouldnt update book if dosent exist', () => {

    const book: Book = {
    id: 4,
    title: 'Test Book',
    author: 'Author',
    availableCopies: 1,
    totalCopies: 1,
    };

    const result = service.updateBook(book);

    expect(result).toBe(false);
  });


  it('should return Array of books', () => {

    const result = service.getBooks();

    expect(result).toBeInstanceOf(Array);
  });


});
