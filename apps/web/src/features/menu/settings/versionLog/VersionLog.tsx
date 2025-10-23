import versionLog from "../../../../../../../version-log.json";
import "./versionLog.less";

export default function VersionLog() {
  return (
    <div className="about">
      <section>
        <span>Contact</span>
        <br />
        <p>
          We'll love to hear about you. <br />
          Send us your feedback and tell us about enhancements&nbsp;
          <a href="mailto:apps@rollerderbybordeaux.fr?subject=Pocket-pbt%20feedback%20:">
            by emailing us
          </a>
        </p>
      </section>

      <section>
        <span>Version History</span>
        <br />
        <p>Last update: {__LAST_UPDATE_DATE__}</p>
      </section>

      <section>
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
      </section>
    </div>
  );
}
