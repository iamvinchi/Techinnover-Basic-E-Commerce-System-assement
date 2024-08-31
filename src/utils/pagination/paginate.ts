export function paginate(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const realLimit = Math.min(limit, 50);
    return { offset, realLimit };
  }