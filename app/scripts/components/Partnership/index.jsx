import React from 'react';
import { Link } from 'react-router';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';
import PartnershipSlider from '../Slider/PartnershipSlider';

class Partnership extends React.Component {

  render() {
    return (
      <div className="c-partnership">
        <div className="sliced"></div>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <p>The Partnership for Resilience and Preparedness (PREP) is a public-private
                collaboration to empower a data-driven approach to building climate resilience. PREP
                aims to help planners, investors, and resource managers more easily incorporate
                climate risks into their decisions by enhancing access to relevant data and
                facilitating collective learning through insights on climate change. PREP does this
                through:
              </p>

              <h3>Engagement</h3>

              <p>We promote collaboration among data and information producers and users.</p>
              <Link to="/about/engagement">Go to engagement</Link>

              <h3>Data</h3>
              <p>We seek to reduce the barriers to accessing, contributing, and using data for
                climate resilience.</p>
              <Link to="/about/data">Go to data</Link>

              <h3>Platforms</h3>
              <p>We develop platforms to enhance access to and usability of climate-relevant
                data and information.</p>
              <Link to="/about/platforms">Go to platforms</Link>

              <p>PREP includes representatives from several U.S. government agencies with vast data
                holdings, leading technology companies, and civil society organizations, and is a
                Data Collaborative of the Global Partnership for Sustainable Development Data. We
                welcome other entities committed to our mission to <a href="#join">join the
                  partnership</a>.</p>
            </div>
          </div>
          <aside className="row">
            <div className="column small-12 medium-4">
              <div className="c-card -border -border-neutral">
                <h3>The Need</h3>
                <p>Demand for climate information is on the rise, but data are often hard to
                  find.</p>
                <a href="#need">Know more</a>
              </div>
            </div>
            <div className="column small-12 medium-4">
              <div className="c-card -border -border-neutral">
                <h3>The Role</h3>
                <p>We work through three channels, engagement, data, and platforms.</p>
                <a href="#role">Know more</a>
              </div>
            </div>
            <div className="column small-12 medium-4">
              <div className="c-card -border -border-neutral">
                <h3>Join</h3>
                <p>We welcome other entities committed to our mission to join the partnership.</p>
                <a href="#join">Know more</a>
              </div>
            </div>
          </aside>
        </article>

        <Article>
          <h2>The need for useable climate-risk data</h2>
          <p>With climate change already upon us, a growing number of communities, companies, and
            civil society organizations are looking to assess climate vulnerability and develop
            resilience plans. Demand for climate risk information is on the rise, but efforts to
            turn data into actionable plans are constrained by two challenges:</p>
          <ul>
            <li>
              <h4>Robust, actionable data is limited</h4>
              <p>Despite extensive data collection and analysis by government and research
                institutions, the information needs of resource managers and decision makers are not
                being met.</p>
            </li>
            <li>
              <h4>Even when data and information exist, they are difficult to find, access, and
                use
              </h4>
              <p>Much of the climate-relevant data are difficult to access and use because they sit
                in incompatible formats in silos of a multitude of government, university, and other
                data servers.
              </p>
            </li>
          </ul>
          <p>Overcoming these challenges requires collaboration among producers and users of
            information, standards to enhance accessibility and interoperability of data and
            information products, and platforms that enhance data accessibility. PREP aims to meet
            this need.</p>
        </Article>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>The role of PREP partners</h2>
              <p>PREP is built on a global network of collaborators from the public sector, private
                sector and civil society. Each partner participates in at least one PREP
                workgroup.
              </p>

            </div>
          </div>

          <PartnershipSlider />

        </article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default Partnership;
