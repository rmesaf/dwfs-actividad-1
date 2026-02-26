export const enabledAggregations = [
    'agg_term_category',
    'agg_term_author',
    'agg_range_price',
    'agg_range_rating',
]

export const getAggregationName = (agg) => {
    const aggregationName = {
        'agg_term_category': 'categories',
        'agg_term_author': 'authors',
        'agg_range_price': 'priceRange',
        'agg_range_rating': 'ratingRange',
    }

    return aggregationName[agg];
}

export const getAggregationLabel = (agg) => {
    const agregationLabel = {
        'agg_term_category': 'Categorías',
        'agg_term_author': 'Autores',
        'agg_range_price': 'Precios',
        'agg_range_rating': 'Rating',
    }

    return agregationLabel[agg];
}

export const getAggregationType = (agg) => {
    const aggregationType = {
        'agg_term_category': 'multi-select',
        'agg_term_author': 'multi-select',
        'agg_range_price': 'multi-select',
        'agg_range_rating': 'multi-select',
    }

    return aggregationType[agg];
}

export const normalizeAggregations = (aggregations) => {
    const keys = Object.keys(aggregations);
    return keys.filter(key => enabledAggregations.includes(key)).map(key => ({
        label: getAggregationLabel(key),
        name: getAggregationName(key),
        type: getAggregationType(key),
        options: aggregations[key]?.map(item => ({
            key: item.key,
            count: item.count,
        })),
    }));
}   