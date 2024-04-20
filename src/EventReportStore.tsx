import { BehaviorSubject } from "rxjs";
import EventReport from "./EventReport";

class EventReportStore {
    valueSubject: BehaviorSubject<EventReport>;

    constructor() {
        const now = new Date();
        const json = localStorage.getItem("eventReport");
        if (json) {
            const loadedReport = JSON.parse(json);
            const initialValue: EventReport = {
                eventName: typeof loadedReport.eventName === "string" ? loadedReport.eventName : "",
                familyName: typeof loadedReport.familyName === "string" ? loadedReport.familyName : "",
                givenName: typeof loadedReport.givenName === "string" ? loadedReport.givenName : "",
                year: typeof loadedReport.year === "string" ? loadedReport.year : now.getFullYear().toString(),
                month: typeof loadedReport.month === "string" ? loadedReport.month : (now.getMonth() + 1).toString(),
                day: typeof loadedReport.day === "string" ? loadedReport.day : now.getDate().toString(),
                eventContent: typeof loadedReport.eventContent === "string" ? loadedReport.eventContent : "",
                impressions: typeof loadedReport.impressions === "string" ? loadedReport.impressions : "",
                additionalHeading: typeof loadedReport.additionalHeading === "string" ? loadedReport.additionalHeading : "",
                additionalText: typeof loadedReport.additionalText === "string" ? loadedReport.additionalText : ""
            };
            this.valueSubject = new BehaviorSubject<EventReport>(initialValue);
        } else {
            this.valueSubject = new BehaviorSubject<EventReport>({
                eventName: "",
                familyName: "",
                givenName: "",
                year: now.getFullYear().toString(),
                month: (now.getMonth() + 1).toString(),
                day: now.getDate().toString(),
                eventContent: "",
                impressions: "",
                additionalHeading: "",
                additionalText: ""
            });
        }
    }

    private setValue(key: keyof EventReport, value: string) {
        const currentValue = this.valueSubject.value;
        const updatedValue = { ...currentValue, [key]: value };
        this.valueSubject.next(updatedValue);
        debouncedSave(updatedValue);
    }

    setEventName(value: string) {
        this.setValue("eventName", value);
    }

    setFamilyName(value: string) {
        this.setValue("familyName", value);
    }

    setGivenName(value: string) {
        this.setValue("givenName", value);
    }

    setYear(value: string) {
        this.setValue("year", value);
    }

    setMonth(value: string) {
        this.setValue("month", value);
    }

    setDay(value: string) {
        this.setValue("day", value);
    }

    setEventContent(value: string) {
        this.setValue("eventContent", value);
    }

    setImpressions(value: string) {
        this.setValue("impressions", value);
    }

    setAdditionalHeading(value: string) {
        this.setValue("additionalHeading", value);
    }

    setAdditionalText(value: string) {
        this.setValue("additionalText", value);
    }
}

const debouncedSave = debounce((value: EventReport) => {
    localStorage.setItem("eventReport", JSON.stringify(value));
}, 1000);

function debounce<F extends (...args: any[]) => any>(operation: F, milliseconds: number) {
    let timeoutId: number | undefined = undefined;

    return (...args: Parameters<F>): void => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => operation(...args), milliseconds) as unknown as number;
    };
}

const eventReportStore = new EventReportStore();

export default eventReportStore;
