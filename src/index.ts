import { Elysia, sse } from "elysia";
import {staticPlugin} from '@elysiajs/static'


const PORT = 3000
new Elysia()
  .use(staticPlugin({
    assets: 'public',
    prefix: '/'
  }))
  .get("/", () => Bun.file('public/index.html'))
  .get('/sse', function* () {
    yield sse({
      event: 'datastar-patch-elements',
      data: 'elements <div id="toMerge">WOW! Hello from sse server!</div>'
    })
	})
  


.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});


