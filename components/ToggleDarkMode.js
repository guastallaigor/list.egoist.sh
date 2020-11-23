import { useDarkMode } from 'next-dark-mode'

const ToggleDarkMode = () => {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode()

  const toggleMode = () => {
    if (darkModeActive) {
      switchToLightMode()
      return
    }

    switchToDarkMode()
  }

  return (
    <div className="toggle-dark-mode">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sun"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      <div className={`is-toggle ${darkModeActive ? 'dark' : ''}`}>
        <input type="checkbox" name="checkbox" aria-label="Toggle Button" />
        <span
          className={`${darkModeActive ? 'checked' : ''}`}
          onClick={toggleMode}
        >
          <div></div>
        </span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="moon"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
      <style jsx>{`
        .toggle-dark-mode {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
        }
        .sun {
          margin-right: 5px;
          color: var(--nav-link);
        }
        .moon {
          margin-left: 5px;
          color: var(--nav-link);
        }
        .is-toggle {
          display: inline-flex;
          position: relative;
          vertical-align: middle;
          white-space: nowrap;
          padding: 3px 0;
        }
        .is-toggle input[type='checkbox'] {
          display: none;
          cursor: default;
        }
        .is-toggle span {
          cursor: pointer;
          display: inline-block;
          width: 28px;
          height: 14px;
          position: relative;
          transition-duration: 0.2s;
          transition-property: background, border;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          border-radius: 14px;
          transition-delay: 0.12s;
        }
        .is-toggle span div {
          cursor: pointer;
          display: block;
          width: 12px;
          height: 12px;
          position: absolute;
          transition-duration: 0.28s;
          transition-property: left;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          border-radius: 50%;
          transform: translate(0, -50%);
          border-width: 1px;
          border-style: solid;
          border-color: transparent;
          border-image: initial;
          top: 50%;
        }
        .is-toggle span:not(.checked) {
          background: #ccc;
          border-width: 1px;
          border-style: solid;
          border-color: #ccc;
          border-image: initial;
        }
        .is-toggle span:not(.checked) div {
          box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0,
            rgba(0, 0, 0, 0.1) 0 1px 3px 0;
          left: 0;
          background: #fafafa;
        }
        .is-toggle span.checked {
          background: var(--link);
          border-width: 1px;
          border-style: solid;
          border-color: var(--link);
          border-image: initial;
        }
        .is-toggle span.checked div {
          left: calc(14px);
          background: #fff;
        }
        .is-toggle.disabled span,
        .is-toggle.disabled input,
        .is-toggle.disabled div {
          cursor: not-allowed;
        }
        .is-toggle.dark span div {
          box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0,
            rgba(0, 0, 0, 0.1) 0 1px 3px 0;
          left: calc(14px);
          background: #000;
        }
        .is-toggle.dark span:not(.checked) {
          background: #666;
          border-width: 1px;
          border-style: solid;
          border-color: #666;
          border-image: initial;
        }
        .is-toggle.dark span:not(.checked) div {
          left: 0;
          background: #000;
        }
      `}</style>
    </div>
  )
}

export default ToggleDarkMode
