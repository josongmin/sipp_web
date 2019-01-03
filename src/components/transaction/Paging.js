import React from 'react';

export default (props) => {
  const { pageInfo, onChangePage, getPrefix, numberSizeStyle } = props
  let prevButton, nextButton;
  let pageIndexes;

  if (pageInfo) {
    const { prevPage, nextPage } = pageInfo
    prevButton = (<li className={'paginate_button page-item previous'} style={{ color: prevPage ? null : '#ddd' }} onClick={ (prevPage && onChangePage) ? onChangePage.bind(null, prevPage) : null } ><a aria-controls="basic-datatable" className="page-link"><i className="mdi mdi-chevron-left" /></a></li>)
    nextButton = (<li className={'paginate_button page-item next'} style={{ color: nextPage ? null : '#ddd' }} onClick={ (nextPage && onChangePage) ? onChangePage.bind(null, nextPage) : null } ><a aria-controls="basic-datatable" className="page-link"><i className="mdi mdi-chevron-right" /></a></li>)

    if (pageInfo.pages) {
      pageIndexes = pageInfo.pages.map(index => {
        if (pageInfo.page === index) {
          return (<li key={index} className='paginate_button page-item active'><a style={numberSizeStyle} className="page-link">{getPrefix ? getPrefix(index) : index}</a></li>)
        } else {
          return (<li key={index}  className='paginate_button page-item'><a style={numberSizeStyle} className="page-link" onClick={ onChangePage? onChangePage.bind(null, index) : null }>{getPrefix ? getPrefix(index) : index}</a></li>)
        }
      })
    }
  }

  return (
    <ul className="pagination pagination-rounded">
      {prevButton}
      {pageIndexes}
      {nextButton}
    </ul>
  )
}
