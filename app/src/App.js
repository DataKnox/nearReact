import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'

import getConfig from './config'
const { networkId } = getConfig('testnet')

export default function App() {
  const [statetext, setStateText] = React.useState()
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [showNotification, setShowNotification] = React.useState(false)

  React.useEffect(
    () => {
      if (window.walletConnection.isSignedIn()) {
        window.contract.getText()
          .then(greetingFromContract => {
            setStateText(greetingFromContract)
          })
      }
    },
    []
  )

  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>Welcome to NEAR!</h1>
        <p>
          ... cleaning up for Github
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>
          Text: {statetext}
        </h1>
        <p>
          Account ID: {window.accountId}
        </p>
        <form onSubmit={async event => {
          event.preventDefault()
          const { fieldset, greeting } = event.target.elements
          const newText = greeting.value
          fieldset.disabled = true

          try {
            await window.contract.setText({
              text: newText
            },
              "300000000000000",
              "2000000000000000000000000")
          } catch (e) {
            alert(
              'Something went wrong! ' +
              'Maybe you need to sign out and back in? ' +
              'Check your browser console for more info.'
            )
            throw e
          } finally {
            fieldset.disabled = false
          }
          setStateText(newText)
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
          }, 11000)
        }}>
          <fieldset id="fieldset">
            <label
              htmlFor="greeting"
              style={{
                display: 'block',
                color: 'var(--gray)',
                marginBottom: '0.5em'
              }}
            >
              Change Text
            </label>
            <div style={{ display: 'flex' }}>
              <input
                autoComplete="off"
                defaultValue={statetext}
                id="greeting"
                onChange={e => setButtonDisabled(e.target.value === statetext)}
                style={{ flex: 1 }}
              />
              <button
                disabled={buttonDisabled}
                style={{ borderRadius: '0 5px 5px 0' }}
              >
                Save
              </button>
            </div>
          </fieldset>
        </form>
        <p>
          Knox's Near App - hello world
        </p>
      </main>
      {showNotification && <Notification />}
    </>
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'setGreeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
