// Packages
import useSWR from "swr";

// App
import fetchBooksCatalogueData from "features/catalog/api/booksCatalogue.api.js";

export function useCatalog(config = {}, swrOptions = {}) {
    const { title, description, categories, authors, priceRange, ratingRange, page = 0, pageSize } = config;

    const { data, error, isLoading } = useSWR(
        ['catalog', "booksCatalogue", { title, description, categories, authors, priceRange, ratingRange, page, pageSize }],
        ([, , args]) => fetchBooksCatalogueData({ ...args }),
        {
            revalidateOnFocus: false,
            revalidateIfStale: true,
            revalidateOnReconnect: false,
            ...swrOptions,
        }
    );

    return {
        data: data ?? {},
        isLoading,
        error,
    };
}
