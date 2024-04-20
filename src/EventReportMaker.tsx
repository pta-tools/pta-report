import { useSearchParams } from "react-router-dom";
import EventReportForm from "./EventReportForm";
import EventReportViewer from "./EventReportViewer";

const showsViewerKey = "v";

function EventReportMaker() {
    const [searchParams, setSearchParams] = useSearchParams();
    const showsViewer = (searchParams.get(showsViewerKey) ?? "0") !== "0";

    function showReport() {
        setSearchParams({ [showsViewerKey]: "1" });
    }

    if (showsViewer) {
        return <EventReportViewer />;
    } else {
        return <EventReportForm showReport={showReport} />;
    }
}

export default EventReportMaker;