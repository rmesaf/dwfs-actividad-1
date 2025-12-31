function getRandomNumber (max, min) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function findIsbnByType (item, type) {
    const isbn = item?.industryIdentifiers?.find(industryId => industryId.type  === type);
    return isbn?.identifier ?? '';
}

function normalizeGoogleBooksData(item) {
    const book = item?.volumeInfo ?? {};
    const isbn10 = findIsbnByType(book, 'ISBN_10');
    const isbn13 = findIsbnByType(book, 'ISBN_13');
    return {
        authors: book.authors ?? [],
        categories: book.categories ?? [],
        currency: item?.saleInfo?.listPrice?.currencyCode,
        description: book.description ?? '',
        identification: item.id,
        id: isbn10 || isbn13 || item?.id,
        isbn10,
        isbn13,
        pageCount: book.pageCount ?? 0,
        price: item?.saleInfo?.listPrice?.amount ?? getRandomNumber(100000, 1000),
        printType: book.printType ?? '',
        publishedDate: book.publishedDate ?? '',
        publisher: book.publisher ?? '',
        thumbnail: book.imageLinks?.thumbnail || '',
        title: book.title,
        isFavorite: Boolean(getRandomNumber(1, 0)),
        ratings: getRandomNumber(5, 0),
        order:0
    };
};

async function fetchGoogleBooksData({ query = '', page = 0, pageSize = 20 }) {
    const params = new URLSearchParams({
        q: query, // Búsqueda por título "intitle:harry"
        startIndex: page,
        maxResults: pageSize,
    });

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params.toString()}`);
    const data = await response.json();
    return {
        items: (data.items || []).map(normalizeGoogleBooksData),
        totalItems: data.totalItems,
    };
};

export default fetchGoogleBooksData;

