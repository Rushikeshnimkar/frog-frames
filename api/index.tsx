import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { pinata } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { neynar } from 'frog/middlewares'
import { supabase } from '../supabase/supabaseClient.js'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  hub: pinata()
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  }),
)

app.frame('/', async (c) => {
  const { status, frameData, verified } = c
  console.log('verified', verified);
  console.log('frameData', frameData);

  const { fid } = frameData || {}
  console.log('fid', fid);

  const { displayName, followerCount } = c.var.interactor || {}
  console.log('displayName', displayName);
  console.log('followerCount', followerCount);

  // Save response to Supabase
  if (status === 'response') {
    const { data, error } = await supabase
      .from('responses')
      .insert([{ fid, displayName, followerCount, frame: '/', status }])

    if (error) console.error('Supabase insert error:', error)
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Welcome!${displayName}`
            : 'Welcome!'}
        </div>
      </div>
    ),
    intents: [
      status === 'response' ? <Button> </Button> : <Button >Start</Button>
    ],
  })
})

app.frame('/interest', async (c) => {
  const { buttonValue, inputText, status, frameData, verified } = c
  const fruit = inputText || buttonValue

  console.log('verified', verified);
  console.log('frameData', frameData);

  const { fid } = frameData || {}
  console.log('fid', fid);

  const { displayName, followerCount } = c.var.interactor || {}
  console.log('displayName', displayName);
  console.log('followerCount', followerCount);

  // Save response to Supabase
  if (status === 'response') {
    const { data, error } = await supabase
      .from('responses')
      .insert([{ fid, displayName, followerCount, frame: '/interest', fruit, status }])

    if (error) console.error('Supabase insert error:', error)
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? 'Next what to do'
            : 'Welcome! to interest page'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter Your Choice" />,
      <Button value="apples">Next</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
