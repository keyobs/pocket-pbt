import versionLog from "../../../../version-log.json";
import "./versionLog.less";

export default function VersionLog() {
  return (
    <div className="about">
      <div className="section-title">
        <span>Contact</span>
        <br />
        <span>
          We'll love to hear about you. <br />
          Send us suggestions to hey@pocket-pbt.org
        </span>
      </div>

      <div className="section-title">
        <span>Version History</span>
        <br />
        <span>Last update: {__LAST_UPDATE_DATE__}</span>
      </div>

      <div className="entries">
        {versionLog.map((entry) => (
          <div key={entry.version} className="entry">
            <h3>
              v{entry.version} <span>({entry.date})</span>
            </h3>

            <ul>
              {entry.changes.map((c, index) => (
                <li key={index}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
