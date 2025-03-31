import { useState, useEffect } from 'react'

/**
 * This function will fetch data from an API, if the API fails, it fetches data from mocked data.
 * Also return a boolean indicating whether the data is loading, and two booleans indicating whether there was errors on the API and mocked data.
 *
 * @category Custom Hooks
 * @param {string} urlAPI - The url of the API.
 * @param {string} userID - The userID for the mocked data.
 * @param {string} urlMockedData - The url of the mocked data.
 * @returns An object with the following properties: isLoading, apiData, mockedData, errorAPI, errorMocked.
 */
export function UserDataFetch(urlAPI, userID, urlMockedData) {
	const [apiData, setApiData] = useState(null)
	const [mockedData, setMockedData] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [errorAPI, setErrorAPI] = useState(false)
	const [errorMocked, setErrorMocked] = useState(false)
	useEffect(() => {
		setLoading(true)
		async function fetchData(fetchURL, isDataMocked, errorSetState) {
			try {
				const response = await fetch(fetchURL)
				const data = await response.json()
				if (isDataMocked === false) {
					setApiData(data.data)
				} else if (isDataMocked === true) {
					if (userID) {
						setMockedData(
							data.find(
								(item) =>
									item.id === parseInt(userID) ||
									item.userId === parseInt(userID)
							)
						)
					}
				}
			} catch (err) {
				console.log(err)
				if (urlMockedData) {
					fetchData(urlMockedData, true, setErrorMocked)
				}
				errorSetState(true)
			} finally {
				setLoading(false)
			}
		}
		fetchData(urlAPI, false, setErrorAPI)
	}, [urlAPI, userID, urlMockedData])
	return { isLoading, apiData, mockedData, errorAPI, errorMocked }
}