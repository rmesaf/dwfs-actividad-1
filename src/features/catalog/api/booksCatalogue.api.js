function normalizeBooksCatalogueData(book) {
    return {
        authors: book.authors?.map(author => author.name) ?? [],
        categories: book.categories?.map(category => category.description) ?? [],
        description: book.description ?? '',
        identification: book.id,
        id: book.id, // o isbnCode si lo prefieres para la key
        isbn: book.isbnCode,
        price: book.price ?? 0,
        publishedDate: book.publishDate ?? '',
        thumbnail: book.coverImg || '',
        title: book.title,
        isFavorite: false, // La API no devuelve este dato asumo
        ratings: book.rating ?? 0,
        order: 0,
        stock: book.stock ?? 0,
        visible: book.visible ?? true
    };
};

async function fetchBooksCatalogueData({ title = '', description = '', authorValues = '', price = '', page = 0, pageSize = 20 }) {
    // Definimos los parámetros, omitiendo los que estén vacíos
    const params = new URLSearchParams();

    // El api espera la pagina usando índice 0 para la primera página
    params.append('page', page);
    params.append('size', pageSize);

    if (title) {
        params.append('title', title);
    }

    if (description) params.append('description', description);
    if (authorValues) params.append('authorValues', authorValues);
    if (price) params.append('price', price);

    // const response = await fetch(`https://dwfs-actividad2-gateway-production.up.railway.app/ms-books-catalogue/books?${params.toString()}`);
    const response = await fetch(`http://localhost:8762/ms-books-catalogue/books?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Error al obtener los libros del catálogo');
    }

    const data = await response.json();

    return {
        items: (data.books || []).map(normalizeBooksCatalogueData),
        totalItems: data.books?.length || 0,
        aggregations: data.aggs || {}
    };
};

export default fetchBooksCatalogueData;
