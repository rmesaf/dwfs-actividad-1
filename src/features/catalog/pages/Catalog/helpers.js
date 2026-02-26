export const formatQueryParams = (filters) => {
    const params = new URLSearchParams();
    params.append('page', filters.page);
    params.append('pageSize', filters.pageSize);
    if (filters.title) params.append('title', filters.title);
    if (filters.description) params.append('description', filters.description);
    if (filters.authors) params.append('authorValues', filters.authors.join(','));
    if (filters.priceRange) params.append('priceRange', filters.priceRange.join(','));
    if (filters.categories) params.append('categoryValues', filters.categories.join(','));
    if (filters.ratingRange) params.append('ratingRange', filters.ratingRange.join(','));
    return params.toString();
}