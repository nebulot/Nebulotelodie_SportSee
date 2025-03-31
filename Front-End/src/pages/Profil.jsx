import { useParams } from 'react-router-dom'
import { UserDataFetch } from '../utils/UserData'

import Card from '../../components/Card'
import ChartsCard from '../../components/ChartsCard'
import ChartActivity from '../../components/ChartActivity'
import ChartAverageSessions from '../../components/ChartAverageSessions'
import ChartGoal from '../../components/ChartGoal'
import ChartPerformance from '../../components/ChartPerformance'

import icons from '../assets/icons' 

import '../styles/ProfilStyles.scss'

/**
 * Render Profil page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Profil() {
	document.title = 'Profil - SportSee'

	const { userId } = useParams()

	/* Fetch the data from API or mocked data */
	const user = UserDataFetch(
		`https://sportsee.abcoding.fr/user/${userId}`,
		userId,
		window.location.origin + '/SportSee/mocked-data/user-main-data.json'
	)
	const activity = UserDataFetch(
		`https://sportsee.abcoding.fr/user/${userId}/activity`,
		userId,
		window.location.origin + '/SportSee/mocked-data/user-activity.json'
	)
	const averageSessions = UserDataFetch(
		`https://sportsee.abcoding.fr/user/${userId}/average-sessions`,
		userId,
		window.location.origin +
			'/SportSee/mocked-data/user-average-sessions.json'
	)
	const performance = UserDataFetch(
		`https://sportsee.abcoding.fr/user/${userId}/performance`,
		userId,
		window.location.origin + '/SportSee/mocked-data/user-performance.json'
	)

	/**
	 * Function to return on dataObject with the data from the API if available, or the mocked data if not.
	 * @param {Object} dataObject - Object that will contain the data .
	 * @param {Object} apiData - Data from the API.
	 * @returns The dataObject is returned.
	 */
	const formatData = (dataObject, apiData) => {
		if (apiData.apiData) {
			return apiData.apiData
		} else if (apiData.mockedData) {
			return apiData.mockedData
		}
		return dataObject
	}

	/* Init the dataObject and format the data */
	const userData = formatData({}, user)
	const activityData = formatData({}, activity)
	const averageSessionsData = formatData({}, averageSessions)
	const performanceData = formatData({}, performance)

	/* If the data is loading, display a loading message */
	if (
		user.isLoading ||
		activity.isLoading ||
		averageSessions.isLoading ||
		performance.isLoading
	) {
		return (
			<section className="profil-wrapper">
				<h2 className="center">Chargement...</h2>
			</section>
		)
	}

	/* If all fetches return errors, display an error message */
	if (
		(user.errorAPI && user.errorMocked) ||
		(activity.errorAPI && activity.errorMocked) ||
		(averageSessions.errorAPI && averageSessions.errorMocked) ||
		(performance.errorAPI && performance.errorMocked)
	) {
		return (
			<section className="profil-wrapper">
				<h2 className="center">Une erreur est survenue !</h2>
			</section>
		)
	}

	return (
		<section className="profil-wrapper">
			{userData && (
				<div className="profil">
					<h2 className="profil-title">
						Bonjour{' '}
						<span className="profil-firstName">
							{userData.userInfos.firstName}
						</span>
					</h2>
					<p className="profil-subtitle">
						Félicitation ! Vous avez explosé vos objectifs hier 👏
					</p>
					<div className="dashboard">
						<div className="dashboard-charts-wrapper">
							<div className="activity-charts">
								{activityData && (
									<ChartActivity
										data={activityData.sessions}
									/>
								)}
							</div>
							<div className="small-card-wrapper">
								{averageSessionsData && (
									<ChartsCard
										className="average-sessions"
										content={
											<ChartAverageSessions
												data={
													averageSessionsData.sessions
												}
											/>
										}
									/>
								)}

								{performanceData && (
									<ChartsCard
										className="performance"
										content={
											<ChartPerformance
												data={performanceData}
											/>
										}
									/>
								)}
								{userData && (
									<ChartsCard
										className="score"
										content={<ChartGoal data={userData} />}
									/>
								)}
							</div>
						</div>

						<div className="dashboard-aside">
							<Card
								userKeyData={userData.keyData.calorieCount}
								unit="kCal"
								subtitle="Calories"
								className="calorie"
								logo={icons.calories}
							/>
							<Card
								userKeyData={userData.keyData.proteinCount}
								unit="g"
								subtitle="Proteines"
								className="protein"
								logo={icons.proteins}
							/>
							<Card
								userKeyData={userData.keyData.carbohydrateCount}
								unit="g"
								subtitle="Glucides"
								className="carbohydrate"
								logo={icons.glucides}
							/>
							<Card
								userKeyData={userData.keyData.lipidCount}
								unit="g"
								subtitle="Lipides"
								className="lipid"
								logo={icons.lipides}
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Profil