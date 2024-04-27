export type SearchPostParams = {
	page?: number;
	pageSize?: number;
	categoryIds?: string[];
	excludeIds?: string[];
	searchQuery?: string;
	sortField?: 'published_at' | 'updated_at' | 'title';
	sortOrder?: 'desc' | 'asc';
};
