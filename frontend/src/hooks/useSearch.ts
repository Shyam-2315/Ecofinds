import { useState, useMemo } from 'react';
import { ProductCard } from '@/types';

interface UseSearchProps {
  products: ProductCard[];
}

interface SearchFilters {
  query: string;
  category: string;
  sortBy: string;
  priceRange: [number, number];
  condition: string[];
}

export const useSearch = ({ products }: UseSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    sortBy: 'newest',
    priceRange: [0, 1000],
    condition: []
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Text search
    if (filters.query.trim()) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === filters.category
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Condition filter
    if (filters.condition.length > 0) {
      filtered = filtered.filter(product =>
        filters.condition.includes(product.condition.toLowerCase().replace(' ', '-'))
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    return filtered;
  }, [products, filters]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      sortBy: 'newest',
      priceRange: [0, 1000],
      condition: []
    });
  };

  return {
    filters,
    filteredProducts,
    updateFilter,
    clearFilters,
    resultCount: filteredProducts.length
  };
};
