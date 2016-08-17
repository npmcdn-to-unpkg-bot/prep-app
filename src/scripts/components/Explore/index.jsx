import React from 'react';
import { Link } from 'react-router';
import MainNav from '../../components/Navigation/MainNav';

import ExploreMap from '../../containers/Explore/ExploreMap';
import ExploreMapSidebar from '../../containers/Explore/ExploreSidebar';

import metadata from 'json!../../metadata.json';
import logoImage from '../../../images/prep-logo.png';

class Explore extends React.Component {

  getChildContext() {
    return {
      location: {
        pathname: this.props.location.pathname,
        query: this.props.location.query,
        params: this.props.params
      }
    };
  }

  componentWillMount() {
    if (!this.props.data.list.length) {
      const { query } = this.props.params;
      if (query && query.activeDatasets) {
        this.props.getDatasets(query.activeDatasets.split(','));
      } else {
        this.props.getDatasets();
      }
    }
  }

  getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (metadata[i][key] === value) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  render() {
    // TODO: improve this
    const pathname = this.props.location.pathname;
    const currentData = this.getData('pathname', 'explore');

    return (
      <div className="l-explore">
        <header className="l-header -expanded">
          <div className={`l-header-nav -short ${currentData.name === 'home' ? '-no-bg' : ''}`}>
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={'/'} className="logo">
                  <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
        </header>

        <ExploreMapSidebar />
        <ExploreMap />

      </div>
    );
  }
}

Explore.childContextTypes = {
  location: React.PropTypes.object
};

Explore.propTypes = {
  getDatasets: React.PropTypes.func.isRequired,
  data: React.PropTypes.any.isRequired,
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired
};

export default Explore;
