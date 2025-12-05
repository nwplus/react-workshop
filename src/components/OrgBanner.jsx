import React from "react";

function OrgBanner() {
  const formUrl =
    "https://docs.google.com/forms/d/your-google-form-id-here/viewform";

  return (
    <div className="org-banner">
      <div className="org-banner-text">
        <span className="org-banner-label">Are you a community organization?</span>
        <span className="org-banner-body">
          Food banks, shelters, mutual aid groups, student clubs&mdash;get listed
          on NeighborGood so local donors can actually find you.
        </span>
      </div>
      <a
        href={formUrl}
        target="_blank"
        rel="noreferrer"
        className="org-banner-button"
      >
        Register your org now
      </a>
    </div>
  );
}

export default OrgBanner;
