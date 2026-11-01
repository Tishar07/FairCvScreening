import NavbarComponent from "../Components/NavbarComponent"
import PointComponent from "../Components/DashboardComponent/PointComponent"
import DoughnutComponent from "../Components/DashboardComponent/DoughnutComponent"
import OverviewComponent from "../Components/DashboardComponent/OverviewComponent"
import LatestApplicantTableComponent from "../Components/DashboardComponent/LatestApplicantTableComponent"
import BarComponent from "../Components/DashboardComponent/BarComponent"

function DashboardPage(){
    return(
        <>
            <NavbarComponent/>
            <div data-bs-theme="dark" className="container-fluid mt-4 d-flex flex-column gap-3 ">

                <OverviewComponent/>

                <div className="container-fluid mt-4 ">
                    <div className="row g-4 align-items-center">
                        <div className="col-12 col-lg-6">
                        <div style={{ position: "relative", height: "380px", width: "100%" }}>
                            <PointComponent />
                        </div>
                        </div>

                        <div className="col-12 col-lg-6">
                        <div style={{ position: "relative", height: "380px", width: "100%" }}>
                            <DoughnutComponent />
                        </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-4">
                    <LatestApplicantTableComponent/>
                </div>

                <div className="container-fluid mt-4">
                    <BarComponent/>
                </div>

            </div>


        </>
    )
}

export default DashboardPage