import { Elysia, sse } from "elysia";
import { render } from "./render";
import {staticPlugin} from '@elysiajs/static'

const PORT = 3000
const navItems = [
	{ href: "/items", label: "Items", key: "items" },
	{ href: "/categories", label: "Categories", key: "categories" },
	{ href: "/locations", label: "Locations", key: "locations" }
]

new Elysia()
  .use(staticPlugin({
    assets: 'public',
    prefix: '/'
  }))

  .get("/", async () => {
    return new Response(
      await render("home", { title: "Home", current: 'home', navItems }),
      { headers: { "Content-Type": "text/html" } }
    );
  })

  .get("/categories", async () => {
    return new Response(
      await render("categories", { title: "Categories", current: "categories", navItems }),
      { headers: { "Content-Type": "text/html" } }
    );
  })

  .get('/sse', function* () {
    yield sse({
      event: 'datastar-patch-elements',
      data: 'elements <div id="toMerge">WOW! Hello from sse server!</div>'
    })
	})
  
.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});


