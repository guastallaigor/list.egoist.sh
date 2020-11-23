const openNewUrl = (siteUrl) => {
  window.open(siteUrl)
}
const BtnOpenInAnilist = ({ siteUrl }) => (
  <>
    <button
      title="Open on Anilist"
      onClick={(e) => {
        e.preventDefault()
        openNewUrl(siteUrl)
      }}
      className="media-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        width="15"
        height="15"
        className="external-link-icon"
      >
        <path
          fill="currentColor"
          d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
        />{' '}
        <polygon
          fill="currentColor"
          points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
        />
      </svg>
    </button>
    <style jsx>{`
      .media-button {
        background: transparent;
        border: 0;
        color: var(--link);
        height: 100%;
      }
      .media-button:hover {
        opacity: 0.75;
      }
    `}</style>
  </>
)

export default BtnOpenInAnilist
