import React from 'react';

class Search extends React.Component {

  componentDidMount() {
    this.addLibrary();
  }

  addLibrary() {
    const gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src =  `${document.location.protocol}//www.google.com/cse/cse.js?cx=${config.searchEngineID}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

  render() {
    return (
      <div className="c-search">
        <div className="gcse-searchbox-only"></div>
      </div>
    );
  }

}

export default Search;
