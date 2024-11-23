'use client'

import { useForm, ValidationError } from '@formspree/react'
import styles from './styles.module.scss'

const FeedBackForm = () => {
  const [state, handleSubmit] = useForm('maygvrkn')

  return (
    <div className={styles.feedback}>
      {state.succeeded && (
        <p className={styles.thankYou}>Thank You!</p>
      )}
      {!state.succeeded && (
        <>
          <p>
            Have feedback or a suggestion? Send me a
            message!
          </p>
          <form onSubmit={handleSubmit}>
            <input
              name="subject"
              placeholder="Subject"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <textarea
              name="message"
              placeholder="Message"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default FeedBackForm
