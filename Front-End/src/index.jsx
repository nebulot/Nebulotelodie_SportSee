import React from "react"
import { createRoot } from "react-dom/client"

import Router from "./Router"
import { Provider } from "./context"

import "./styles/Index.scss"

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<Provider>
			<Router />
		</Provider>
	</React.StrictMode>
)