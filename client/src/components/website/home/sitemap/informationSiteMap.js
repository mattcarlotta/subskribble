import React from 'react';
import { Link } from 'react-router';

import NewsletterForm from '../../../../containers/forms/website/newsletterForm';

const InformationSiteMap = () => {
  return (
    <div className="sitemap-bg">
      <div className="sitemap-container">
        <div className="sitemap-width-4">
          <div className="sitemap-block">
            <h2 className="title">Join our newsletter</h2>
            <p className="subtitle">Updates, upcoming themes, and great deals!</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="sitemap-width-4">
          <div className="sitemap-block">
            <h2 className="title">Contact Us</h2>
            <p className="subtitle">Still have questions?</p>
            <p>Phone: 1-844-428-3827</p>
            <p>Email: info@rocketbiller.com</p>
          </div>
        </div>
        <div className="sitemap-width-4">
          <div className="sitemap-block">
            <div className="sitemap-gantry-50">
              <h2 className="title">Info</h2>
              <p>
                <Link to="/blog">Blog</Link>
              </p>
              <p>
                <Link to="/privacy">Privacy Policy</Link>
              </p>
              <p>
                <Link to="/termsofservice">Terms of Service</Link>
              </p>
            </div>
            <div className="sitemap-gantry-50">
              <h2 className="title">Support</h2>
              <p>
                <Link to="/docs/api">API Docs</Link>
              </p>
              <p>
                <Link to="/contact">Contact</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationSiteMap;
