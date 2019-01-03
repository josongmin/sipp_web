export function getPageInfo(totalCount, page, size, countPagePerPageGroup = 5) {
  const maxPage = Math.ceil(totalCount / size) || 1;
  const startPage = (Math.ceil(page / countPagePerPageGroup) - 1) * countPagePerPageGroup + 1;
  const endPage = startPage + countPagePerPageGroup - 1 < maxPage ? startPage + countPagePerPageGroup - 1 : maxPage;
  const prevPage = startPage !== 1 ? startPage - 1 : null;
  const nextPage = endPage < maxPage ? endPage + 1 : null;
  const pages = totalCount ? Array.from(new Array(endPage - startPage + 1), (_, i) => startPage + i) : [];

  return { page, pages, maxPage, prevPage, nextPage, size };
}
