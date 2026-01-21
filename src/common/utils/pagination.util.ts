export function calculatePagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = limit;

    return { skip, take };
}

export function getPaginationMeta(total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
}
